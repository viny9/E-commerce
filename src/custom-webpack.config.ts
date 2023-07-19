import { EnvironmentPlugin } from 'webpack'
import { firebase } from '../env'

// Vai habilitar a possibilidade de usar o process.env
module.exports = {
    plugins: [
        new EnvironmentPlugin({
            API_KEY: firebase.apiKey,
            AUTH_DOMAIN: firebase.authDomain,
            PROJECT_ID: firebase.projectId,
            STORAGE_BUCKET: firebase.storageBucket,
            MESSAGING_SENDER_ID: firebase.messagingSenderId,
            APP_ID: firebase.appId,
            MEASuREMENT_ID: firebase.measurementId
        })]
}