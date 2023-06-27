export const environment = {
  production: true,
  backendBaseUrl: 'https://ecommerce-back-0gyg.onrender.com',
  firebase: {
    apiKey: process.env['apiKey'],
    authDomain: process.env['authDomain'],
    projectId: process.env['projectId'],
    storageBucket: process.env['storageBucket'],
    messagingSenderId: process.env['messagingSenderId'],
    appId: process.env['appId'],
    measurementId: process.env['measurementId']
  }
};
