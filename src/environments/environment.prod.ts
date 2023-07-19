export const environment = {
  production: true,
  backendBaseUrl: 'https://ecommerce-back-0gyg.onrender.com',
  firebase: {
    apiKey: process.env['API_KEY'],
    authDomain: process.env['AUTH_DOMAIN'],
    projectId: process.env['PROJECT_ID'],
    storageBucket: process.env['STORAGE_BUCKET'],
    messagingSenderId: process.env['MESSAGING_SENDER_ID'],
    appId: process.env['APP_ID'],
    measurementId: process.env['MEASuREMENT_ID']
  }
};
