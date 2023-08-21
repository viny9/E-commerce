// import { firebase } from '../../env';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const firebase = {
  apiKey: "AIzaSyA7cjQnpE8s94cppkpA6roIhpj13OZC5X4",
  authDomain: "e-commerce-c23e8.firebaseapp.com",
  projectId: "e-commerce-c23e8",
  storageBucket: "e-commerce-c23e8.appspot.com",
  messagingSenderId: "1098956459394",
  appId: "1:1098956459394:web:6e5edce29500725978d39b",
  measurementId: "G-G91N69M983"
}

export const environment = {
  production: false,
  backendBaseUrl: 'http://localhost:3000',
  firebase: firebase
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
