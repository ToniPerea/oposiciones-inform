// Production environment
// Placeholder tokens are replaced by GitHub Actions before the build.
// Do NOT manually edit these tokens — set GitHub repository secrets instead.
export const environment = {
  production: true,
  emailjs: {
    publicKey: '__EMAILJS_PUBLIC_KEY__',
    serviceId: '__EMAILJS_SERVICE_ID__',
    confirmationTemplateId: '__EMAILJS_CONFIRMATION_TEMPLATE_ID__',
    notificationTemplateId: '__EMAILJS_NOTIFICATION_TEMPLATE_ID__',
  },
};
