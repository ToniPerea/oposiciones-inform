# Manual GitHub Pages Deployment Workflow Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a manual GitHub Actions workflow for deploying the Angular app to GitHub Pages with optional testing.

**Architecture:** Single workflow file using `workflow_dispatch` trigger with boolean input for optional testing. Uses Node.js 20, pnpm with caching, and peaceiris/actions-gh-pages@v4 for deployment to gh-pages branch.

**Tech Stack:** GitHub Actions, Node.js 20, pnpm, Angular 20, peaceiris/actions-gh-pages@v4

**Design Document:** `docs/plans/2026-02-14-manual-deploy-workflow-design.md`

---

## Task 1: Create GitHub Workflows Directory

**Files:**
- Create: `.github/workflows/` directory

**Step 1: Create the workflows directory**

Run:
```bash
mkdir -p .github/workflows
```

Expected: Directory created successfully

**Step 2: Verify directory exists**

Run:
```bash
ls -la .github/
```

Expected: Should see `workflows/` directory listed

---

## Task 2: Create Deploy Workflow File

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: Create the workflow file**

Create `.github/workflows/deploy.yml` with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  workflow_dispatch:
    inputs:
      run_tests:
        description: 'Run tests before deploy'
        required: false
        type: boolean
        default: false

# Restrict to main branch only
permissions:
  contents: write
  pages: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

      - name: Setup pnpm cache
        uses: actions/cache@v4
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run tests
        if: ${{ inputs.run_tests }}
        run: pnpm test -- --single-run --browsers=ChromeHeadless

      - name: Build Angular app
        run: pnpm ng build --base-href=/oposiciones-inform/

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/academia-oposiciones/browser
          force_orphan: true
          commit_message: 'Deploy from ${{ github.sha }}: ${{ github.event.head_commit.message }}'
```

**Step 2: Verify file was created**

Run:
```bash
cat .github/workflows/deploy.yml | head -20
```

Expected: Should see the workflow YAML content with `name: Deploy to GitHub Pages`

**Step 3: Validate YAML syntax**

Run:
```bash
pnpm add -D js-yaml
npx js-yaml .github/workflows/deploy.yml > /dev/null && echo "✓ Valid YAML" || echo "✗ Invalid YAML"
```

Expected: `✓ Valid YAML`

Note: If js-yaml is not available, skip this step - GitHub will validate on push.

---

## Task 3: Commit the Workflow

**Files:**
- Add: `.github/workflows/deploy.yml`

**Step 1: Stage the workflow file**

Run:
```bash
git add .github/workflows/deploy.yml
```

Expected: File staged successfully

**Step 2: Verify staged changes**

Run:
```bash
git status
```

Expected: Should show `.github/workflows/deploy.yml` in "Changes to be committed"

**Step 3: Commit with descriptive message**

Run:
```bash
git commit -m "$(cat <<'EOF'
feat: add manual GitHub Pages deployment workflow

Add workflow_dispatch triggered workflow for manual deployments to
GitHub Pages with optional test execution. Uses peaceiris/actions-gh-pages
for deployment to gh-pages branch.

Features:
- Manual trigger from GitHub UI
- Optional test execution via checkbox
- Node.js 20 + pnpm with caching
- Deploys to gh-pages branch
- Only runs on main branch

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

Expected: Commit created successfully with message starting "feat: add manual GitHub Pages deployment workflow"

**Step 4: Verify commit**

Run:
```bash
git log -1 --oneline
```

Expected: Should see the new commit with "feat: add manual GitHub Pages deployment workflow"

---

## Task 4: Push and Verify Workflow Registration

**Files:**
- Push: `.github/workflows/deploy.yml` to remote

**Step 1: Push to main branch**

Run:
```bash
git push origin main
```

Expected: Push successful, workflow file uploaded to GitHub

**Step 2: Wait for GitHub to register workflow**

Wait: 10-15 seconds for GitHub to process the new workflow file

**Step 3: Check if workflow appears in GitHub Actions**

Run:
```bash
gh workflow list
```

Expected: Should see "Deploy to GitHub Pages" in the list of workflows

Alternative (if gh CLI not available):
- Visit: https://github.com/ToniPerea/oposiciones-inform/actions
- Expected: "Deploy to GitHub Pages" workflow should appear in the left sidebar

---

## Task 5: Test Workflow Manually (Without Tests)

**Step 1: Trigger workflow from CLI without tests**

Run:
```bash
gh workflow run deploy.yml --ref main -f run_tests=false
```

Expected: Workflow run triggered successfully

Alternative (if gh CLI not available):
1. Visit: https://github.com/ToniPerea/oposiciones-inform/actions/workflows/deploy.yml
2. Click "Run workflow" button
3. Keep "Run tests before deploy" unchecked
4. Click green "Run workflow" button

**Step 2: Monitor workflow execution**

Run:
```bash
gh run watch
```

Expected:
- Workflow starts running
- Steps: Checkout → Setup Node → Setup pnpm → Cache → Install → Build → Deploy
- All steps should pass (green checkmarks)
- Should skip "Run tests" step

Alternative (if gh CLI not available):
- Visit: https://github.com/ToniPerea/oposiciones-inform/actions
- Click on the running workflow
- Watch steps complete

**Step 3: Verify workflow completed successfully**

Run:
```bash
gh run list --workflow=deploy.yml --limit=1
```

Expected: Most recent run should show "completed" status with green checkmark

---

## Task 6: Verify Deployment Success

**Step 1: Check gh-pages branch was updated**

Run:
```bash
git fetch origin gh-pages
git log origin/gh-pages -1 --oneline
```

Expected: Should see recent commit message like "Deploy from abc1234: feat: add manual GitHub Pages deployment workflow"

**Step 2: Wait for GitHub Pages to deploy**

Wait: 1-2 minutes for GitHub Pages to process the update

**Step 3: Verify site is accessible**

Run:
```bash
curl -I https://toniperea.github.io/oposiciones-inform/ | head -5
```

Expected:
- HTTP status: `200 OK`
- Content-Type: `text/html`

**Step 4: Visual verification (manual)**

Manual step: Open https://toniperea.github.io/oposiciones-inform/ in browser

Expected:
- Site loads successfully
- No 404 errors
- Navigation works correctly
- Styles are applied

---

## Task 7: Test Workflow with Tests Enabled (Optional)

**Step 1: Trigger workflow with tests enabled**

Run:
```bash
gh workflow run deploy.yml --ref main -f run_tests=true
```

Expected: Workflow run triggered with test flag enabled

Alternative (if gh CLI not available):
1. Visit: https://github.com/ToniPerea/oposiciones-inform/actions/workflows/deploy.yml
2. Click "Run workflow" button
3. Check "Run tests before deploy" checkbox
4. Click green "Run workflow" button

**Step 2: Monitor workflow with tests**

Run:
```bash
gh run watch
```

Expected:
- Workflow includes "Run tests" step
- Tests run in ChromeHeadless
- If tests pass: Continues to build and deploy
- If tests fail: Workflow stops, no deployment

**Step 3: Verify test output**

Run:
```bash
gh run view --log | grep -A 10 "Run tests"
```

Expected: Should see Karma test execution logs with test results

Alternative (if gh CLI not available):
- Visit the workflow run page
- Expand "Run tests" step
- Should see Karma test execution output

---

## Success Criteria Checklist

Run through this checklist after completing all tasks:

- [ ] `.github/workflows/deploy.yml` exists and is committed
- [ ] Workflow appears in GitHub Actions tab
- [ ] Workflow can be triggered manually from GitHub UI
- [ ] Workflow runs only on main branch
- [ ] "Run tests before deploy" checkbox appears in UI
- [ ] Workflow with tests disabled: Skips test step, deploys successfully
- [ ] Workflow with tests enabled: Runs tests, then deploys
- [ ] Deployment updates `gh-pages` branch with correct commit message
- [ ] Site is accessible at https://toniperea.github.io/oposiciones-inform/
- [ ] Site works correctly (navigation, styles, SPA routing)
- [ ] Deployment completes within 5 minutes
- [ ] No manual repository settings changes were needed

---

## Rollback Plan (If Needed)

If the workflow causes issues:

**Step 1: Disable the workflow**

Run:
```bash
gh workflow disable deploy.yml
```

Or manually: Settings → Actions → Disable workflow

**Step 2: Remove workflow file**

Run:
```bash
git rm .github/workflows/deploy.yml
git commit -m "revert: remove GitHub Actions deployment workflow"
git push origin main
```

**Step 3: Use manual deployment**

Fall back to:
```bash
pnpm ng deploy --base-href=/oposiciones-inform/
```

---

## Notes for Implementation

- **pnpm version:** Workflow uses pnpm v9 (latest stable). Adjust if project requires specific version.
- **Node.js version:** Locked to Node 20 LTS for stability. Update when Node 22 becomes LTS.
- **Cache strategy:** Uses pnpm store path for faster installs (typical speedup: 30-60 seconds).
- **Force orphan:** `force_orphan: true` ensures clean gh-pages branch (no git history bloat).
- **Branch protection:** Workflow only runs on main via `if: github.ref == 'refs/heads/main'`.
- **Testing timeout:** Karma tests have default 2-minute timeout. Adjust if needed in `karma.conf.js`.
- **Build output path:** Assumes Angular 20 default structure (`dist/academia-oposiciones/browser/`). Verify in `angular.json` if issues occur.

---

## Future Enhancements

After successful implementation, consider adding:

1. **Slack notifications:** Add slack-notify action for deployment updates
2. **Deployment summary:** Use `$GITHUB_STEP_SUMMARY` to add deployment URL to workflow summary
3. **Environment variables:** Add staging/production environments with different URLs
4. **Rollback workflow:** Separate workflow to revert to previous gh-pages commit
5. **PR preview deployments:** Deploy PR previews to separate URLs (requires additional setup)

These can be added incrementally based on team needs.
