# Twitch Predcon v1

Twitch Predcon v1 is a straightforward Prediction Contest application. It allows Admin users to create prediction contests with specific submission deadlines and options for users to select (single or multiple options). After Admin users submit the contest results, scores are updated for all participating users. The application uses Twitch API for user login, ensuring secure encryption.

## Tech Stack
- Backend: Express JS, MongoDB
- Frontend: React JS

## Configuration

### Backend Configuration
1. Create a `.env` file inside the backend folder.
2. Configure the environment variables as specified in the `.env.example` file.

### Frontend Configuration
1. Modify the `config.json` file located in the frontend folder.
2. Install the required npm packages by running 'npm install' in both the backend and frontend folders.

## Running the App
- **Development (DEV):**
  - Start the backend server: `npm run startdev`
  - Launch the frontend: `npm start`

- **Production (PROD):**
  - Start the backend server: `npm start`
  - Launch the frontend: `npm start`

## Requirements
- Obtain a Twitch Client ID from the [Twitch Developer Dashboard](https://dev.twitch.tv/console/apps/).
- Set up a MongoDB instance as the backend database.

### Admin User Setup
- To designate a user as an admin, simply set the 'admin' field to 'true' in the user's MongoDB document.

### Twitch User Data
- On a user's first login, their 'Twitch ID' is securely encrypted and stored in the database.
- The user's Twitch data includes the encrypted Twitch ID and Twitch username.
- The login process is exclusively handled by Twitch through its API.

## App Screenshots

- **Home Page**
![Home Page](https://github.com/Akansh97/twitch-predcon-v1/assets/47331547/b04ca3ca-2446-4926-8d90-7bea53cf6e3b)

- **Home Page (Logged In)**
![Home Page (Logged In)](https://github.com/Akansh97/twitch-predcon-v1/assets/47331547/a696e968-2709-4a70-aa40-8227802b1acb)

- **Active Contests Page**
![Active Contests Page](https://github.com/Akansh97/twitch-predcon-v1/assets/47331547/612d6db2-3eed-4c97-9b44-73dcb69dbd41)

- **Leaderboard Page**
![Leaderboard Page](https://github.com/Akansh97/twitch-predcon-v1/assets/47331547/38cfb9b4-7239-4aa7-9a16-19b8184794cd)

- **Add New Contest - ADMIN**
![Add New Contest - ADMIN](https://github.com/Akansh97/twitch-predcon-v1/assets/47331547/da8d4026-2bf4-436f-83c3-e34ca52cbfb2)

- **Submit Contest Result - ADMIN**
![Submit Contest Result - ADMIN](https://github.com/Akansh97/twitch-predcon-v1/assets/47331547/7138a090-f1b7-43d4-931a-7ecc134cdb60)
