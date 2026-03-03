// Production environment
// Placeholder tokens are replaced by GitHub Actions before the build.
// Do NOT manually edit these tokens — set GitHub repository secrets instead.
export const environment = {
  production: true,
  emailjs: {
    publicKey: 'EMAILJS_PUBLIC_KEY',
    serviceId: 'EMAILJS_SERVICE_ID',
    confirmationTemplateId: 'EMAILJS_CONFIRMATION_TEMPLATE_ID',
    notificationTemplateId: 'EMAILJS_NOTIFICATION_TEMPLATE_ID',
  },
};
