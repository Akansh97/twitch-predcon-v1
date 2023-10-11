# twitch-predcon-v1
--------------------TWITCH PREDICTION CONTEST APP - PREDCON-------------------------

1. Backend Configuration
  -> Create a .env file inside backend folder.
  -> Configure Environment variables, refer .env.example file.

2. Frontend Configuration
  -> Configure config.json inside frontend folder.

Install npm packages by running 'npm install' in both backend and frontend folders.

Running the app in local :
  For DEV:
  ->> backend : npm run startdev
  ->> frontend : npm start
  
  for PROD:
  npm start
  ->> backend : npm start
  ->> frontend : npm start

Requirements : 
1. Twitch Client Id from  https://dev.twitch.tv/console/apps/ (Create app if not already created).
2. Mongo DB as backend DB.

Setting a user as admin:
 -> For setting a user as admin, 'admin' field needs to be set as 'true' in User's Mongo DB document.

Twitch user data (login is handled by Twitch only through its API)
   1. 'Twitch Id' is encrypted and stored in DB on first login.
   2. Twitch Data saved in DB : 1. Twitch Id (encrypted) 2. Twitch User Name

------------------------------------------------------------------------------------
