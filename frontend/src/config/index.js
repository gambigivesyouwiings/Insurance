// Environment configuration for production deployment
const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://your-backend-api.herokuapp.com',
  
  // EmailJS Configuration
  EMAILJS: {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id',
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id',
    USER_ID: import.meta.env.VITE_EMAILJS_USER_ID || 'your_user_id'
  },
  
  // WhatsApp Configuration
  WHATSAPP_PHONE: import.meta.env.VITE_WHATSAPP_PHONE || '12019207621',
  
  // Site Configuration
  SITE_URL: import.meta.env.VITE_SITE_URL || 'https://faithful-insurance.netlify.app',
  
  // Development flags
  IS_DEVELOPMENT: import.meta.env.MODE === 'development',
  IS_PRODUCTION: import.meta.env.MODE === 'production'
}

export default config