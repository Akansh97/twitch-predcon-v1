# twitch-predcon-v1
------------------------------------------------------------------------------------
# Twitch Prediction Contest App - PREDCON 

# 1.  Backend Configuration
  - > Create a .env file inside backend folder.
  - > Configure Environment variables, refer .env.example file.

# 2. Frontend Configuration
  - > Configure config.json inside frontend folder.

 Install npm packages by running 'npm install' in both backend and frontend folders.

# Running the app:
  - DEV:
     - > backend : npm run startdev
     - > frontend : npm start
  
  - PROD:
     - > backend : npm start
     - > frontend : npm start

# Requirements: 
1. Twitch Client Id from  https://dev.twitch.tv/console/apps/ (Create app if not already created).
2. Mongo DB as backend DB.

## Setting a user as admin:
 - > For setting a user as admin, 'admin' field needs to be set as 'true' in User's Mongo DB document.

## Twitch user data 
- 'Twitch Id' is encrypted and stored in DB on first login.
- Twitch Data saved in DB : 1. Twitch Id (encrypted) 2. Twitch User Name
- Login is handled by Twitch through its API.
------------------------------------------------------------------------------------
