# Manual GitHub Pages Deployment Workflow

**Date:** 2026-02-14
**Status:** Approved
**Approach:** Native GitHub Actions with gh-pages branch (Approach 2)

## Overview

Create a manual GitHub Actions workflow that allows deploying the Angular application to GitHub Pages via the GitHub UI. The workflow will build the app, optionally run tests, and deploy to the `gh-pages` branch.

## Requirements

- Manual trigger from GitHub Actions tab (no automatic deployments)
- Always deploys from `main` branch only
- Optional testing via checkbox input (unchecked by default)
- Uses existing `gh-pages` branch deployment model
- No repository settings changes required

## Design

### 1. Workflow Trigger & Inputs

**Trigger:** `workflow_dispatch` (manual trigger from GitHub UI)

**Inputs:**
- `run_tests` (boolean, default: false)
  - Label: "Run tests before deploy"
  - Description: "Run unit tests with Karma before building and deploying"
  - When enabled: Runs `pnpm test -- --single-run --browsers=ChromeHeadless`
  - When disabled: Skips directly to build step

**Branch restriction:** Workflow only runs on `main` branch

**File location:** `.github/workflows/deploy.yml`

### 2. Build Process

**Environment:**
- Node.js 20 LTS (via `actions/setup-node@v4`)
- pnpm via `pnpm/action-setup@v4`
- Dependency caching enabled (cache key: `pnpm-lock.yaml` hash)

**Build steps:**
1. Checkout code (`actions/checkout@v4`)
2. Setup Node.js and pnpm
3. Install dependencies: `pnpm install --frozen-lockfile`
4. (Optional) Run tests: `pnpm test -- --single-run --browsers=ChromeHeadless`
5. Build app: `pnpm ng build --base-href=/oposiciones-inform/`

**Build output:** `dist/academia-oposiciones/browser/` (Angular 20 default structure)

**Artifacts:**
- Complete static site with all assets
- Includes `404.html` for SPA routing
- Production-optimized (minified, hashed)

### 3. Deployment

**Action:** `peaceiris/actions-gh-pages@v4`

**Configuration:**
- **Source directory:** `dist/academia-oposiciones/browser/`
- **Target branch:** `gh-pages`
- **Authentication:** `GITHUB_TOKEN` (auto-provided)
- **Commit message:** `Deploy from {SHA}: {commit message}`
- **Force push:** Enabled (standard practice for build artifacts)

**Deployment flow:**
1. Action prepares clean copy of build files
2. Pushes to `gh-pages` branch (creates if doesn't exist)
3. GitHub Pages auto-detects update
4. Site live at https://ToniPerea.github.io/oposiciones-inform/ in 1-2 minutes

### 4. Permissions & Security

**Workflow permissions:**
```yaml
permissions:
  contents: write  # Push to gh-pages branch
  pages: read      # Check Pages configuration
```

**Security:**
- Uses GitHub's built-in `GITHUB_TOKEN` (scoped, auto-expires)
- No manual secrets or PAT tokens needed
- Token scoped only to this repository
- `gh-pages` branch isolated from main codebase

**GitHub Pages settings:**
- Already configured to deploy from `gh-pages` branch
- No changes required
- Repository visibility: Public (required for free GitHub Pages)

## Implementation Files

1. `.github/workflows/deploy.yml` - Main deployment workflow

## Future Enhancements (Not Included)

- Slack/email notifications on success/failure
- Deployment preview URLs in workflow summary
- Automatic rollback on failed deployments
- Unpublish/maintenance page workflow

## Alternatives Considered

**Approach 1: angular-cli-ghpages**
- Pros: Reuses existing setup, familiar commands
- Cons: Slower, external dependency, less control
- Rejected: Less standard, requires all node_modules for deployment

**Approach 3: GitHub Pages Official Action**
- Pros: Official solution, modern artifact-based deployment
- Cons: Requires permission changes, more complex setup, overkill
- Rejected: Too complex for single-site deployment

## Rollout Plan

1. Create `.github/workflows/` directory
2. Add `deploy.yml` workflow file
3. Commit and push to `main` branch
4. Test workflow from GitHub Actions tab
5. Verify deployment at https://ToniPerea.github.io/oposiciones-inform/

## Success Criteria

- ✅ Workflow appears in GitHub Actions tab
- ✅ Can trigger manually from GitHub UI
- ✅ Optional test checkbox works correctly
- ✅ Builds Angular app successfully
- ✅ Deploys to `gh-pages` branch
- ✅ Site accessible at production URL within 2 minutes
- ✅ No manual repository settings changes required
