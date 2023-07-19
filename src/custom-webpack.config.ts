import { EnvironmentPlugin } from 'webpack'

// Vai habilitar a possibilidade de usar o process.env
module.exports = {
    plugins: [
        new EnvironmentPlugin({
            API_KEY: '',
            AUTH_DOMAIN: '',
            PROJECT_ID: '',
            STORAGE_BUCKET: '',
            MESSAGING_SENDER_ID: '',
            APP_ID: '',
            MEASUREMENT_ID: ''
        })]
}