# Twitch Predcon v1

A simple Prediction Contest application in which Admin user can post prediction contests with submition deadline time and option selection limits (single option or multi select).
Once Admin user submits contest result, scores get updated for all users who participated in that contest.
Twitch API used for user login (Encrypted).

## Tech Stack
- Backend - Express JS, Mongo DB
- Frontend - React JS

------------------------------------------------------------------------------------
# Twitch Prediction Contest App - PREDCON 

## 1.  Backend Configuration
  - > Create a .env file inside backend folder.
  - > Configure Environment variables, refer .env.example file.

## 2. Frontend Configuration
  - > Configure config.json inside frontend folder.

 Install npm packages by running 'npm install' in both backend and frontend folders.

## Running the app:
  - DEV:
     - > backend : npm run startdev
     - > frontend : npm start
  
  - PROD:
     - > backend : npm start
     - > frontend : npm start

## Requirements: 
- > Twitch Client Id from  https://dev.twitch.tv/console/apps/ 
- > Mongo DB as backend DB.

### Setting a user as admin:
 - > For setting a user as admin, 'admin' field needs to be set as 'true' in User's Mongo DB document.

### Twitch user data 
- > 'Twitch Id' is encrypted and stored in DB on first login.
- > Twitch Data saved in DB : 1. Twitch Id (encrypted) 2. Twitch User Name
- > Login is handled by Twitch through its API.
------------------------------------------------------------------------------------

App Screenshots 
- > Home Page
![image](https://github.com/Akansh97/twitch-predcon-v1/assets/47331547/b04ca3ca-2446-4926-8d90-7bea53cf6e3b)
- > Home Page (Logged In)
![image](https://github.com/Akansh97/twitch-predcon-v1/assets/47331547/a696e968-2709-4a70-aa40-8227802b1acb)
- > Active Contests Page
![image](https://github.com/Akansh97/twitch-predcon-v1/assets/47331547/612d6db2-3eed-4c97-9b44-73dcb69dbd41)
- > Leaderboard Page
![image](https://github.com/Akansh97/twitch-predcon-v1/assets/47331547/38cfb9b4-7239-4aa7-9a16-19b8184794cd)
- > Add New Contest - ADMIN
![image](https://github.com/Akansh97/twitch-predcon-v1/assets/47331547/da8d4026-2bf4-436f-83c3-e34ca52cbfb2)
- > Submit Contest Result - ADMIN
![image](https://github.com/Akansh97/twitch-predcon-v1/assets/47331547/7138a090-f1b7-43d4-931a-7ecc134cdb60)






