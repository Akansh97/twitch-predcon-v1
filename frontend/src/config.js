// Backend API Server
const prod_server = ""
const dev_server = "http://localhost:4000"

// 0 for DEV
// 1 for PROD
const env = 0

// => Set Backend API Server
const api_server = env === 1 ? prod_server : dev_server

// Frontend Server
const prod_frontend = ``
const dev_frontend = `http://localhost:3000/`

// Twitch API Client ID
const tw_client_id = ''
// Twitch Auth Token URL
const tw_auth = 'https://id.twitch.tv/oauth2/authorize?response_type=token'

// Twitch Login Redirect URL
const redirect_dev = `${tw_auth}&client_id=${tw_client_id}&redirect_uri=${dev_frontend}`
const redirect_prod = `${tw_auth}&client_id=${tw_client_id}&redirect_uri=${prod_frontend}`

// => Set Twitch Login Redirect URL
const twitchRedirectURI = env === 1 ? redirect_prod : redirect_dev


const serverConfig = {
    api_server,
    twitchRedirectURI
}

export default serverConfig