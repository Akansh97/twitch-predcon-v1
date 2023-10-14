require('dotenv').config( {path : './.env'} );
const crypto = require('crypto')

const PredictionModel = require('./model/PredictionModel')
const UserModel = require('./model/UserModel')

const express = require('express')
const fetch = require("node-fetch");
const cors = require('cors')
const app = express();

app.use(cors())

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const mongoose = require('mongoose');

const db_username = process.env.db_username
const db_password = process.env.db_password
const db_cluster = process.env.db_cluster

const cxnString =  `mongodb+srv://${db_username}:${db_password}@${db_cluster}.mongodb.net/?retryWrites=true&w=majority`


const db = () => {
    mongoose.connect( cxnString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, console.log("DB CONNECTED"))
    
}

db();

// -----------------------------------------------------------

const markExpiredContestsInactive = async () => {
    
    const currentTime = new Date();
    try {
      const expiredContests = await PredictionModel.find({
        expire: { $lt: currentTime },
        active: true, 
      });
      
      for (const contest of expiredContests) {
        contest.active = false; 
        await contest.save();
        console.log(`contest ${contest._id} is now inactive.`);
      }
    } catch (error) {
      console.error('Error marking contest inactive:', error);
    }
  };
  
  setInterval(markExpiredContestsInactive, 60000); // Run every minute


// ------------------------------------------------------------

const key = Buffer.from(process.env.enc_key, 'hex')
const iv = Buffer.from(process.env.enc_iv, 'hex')

// Encryption function
function encrypt(text) {
    // const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    encrypted = encrypted.toString('hex')
    return encrypted
}
  
// Decryption function
function decrypt(encryptedData) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(Buffer.from(encryptedData, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
  
// ------------------------------------------------------------

//twitch login
app.get('/api/getTwitchUser/:authToken', (req, res) => {
    console.log(req.query)
    console.log(req.params)
    const twitch_get_user = "https://api.twitch.tv/helix/users"
    try {
        fetch(twitch_get_user ,  {
            method: 'get',
            withCredentials: true,
            headers : {
                ContentType: 'application/x-www-form-urlencoded',
                Authorization : `Bearer ${req.params.authToken}`,
                "Client-Id": `${process.env.twClientId}`
            }
            }
        ).then(resp => resp.json())
        .then(resp => {
            
            const twid = resp.data[0].id
            const encryptedData = encrypt(twid, key);
            const twitchId = encryptedData
            
            const {id, ...encData} = resp.data[0]
            encData["id"] = twitchId

            const formattedRes = {
                data : [ {...encData} ]
            }

            // console.log({"fr":formattedRes.data})
            return res.send(formattedRes)
        })

    } catch (error) {
        return res.send(error)
    }

})

//add prediction - admin
app.post('/api/addPrediction', async (req, res) => {
    const rawdata = req.body.data.names
    const active = req.body.data.active
    const title = req.body.data.title
    const expire = req.body.data.expire
    const multiSelect = req.body.data.multiSelect
    const limit = req.body.data.limit

    const data = rawdata.map((e) => {return {name:e}})
    
    try {
      const newData = new PredictionModel ({ 
        contestants : [
            ...data, 
        ], active, title, expire, multiSelect, limit
        })
    
      const result = await PredictionModel.create(newData); // Create a new document in the database
      console.log(result)
      res.status(201).json({result: result});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Server Started - Express")
})

//get leaderboard scores
app.get('/api/getLeaderboard', async(req, res) => {
    try {
        const result = await UserModel.find(
                {}, 
                'twitchId name wins.score'
            ).sort('-wins.score')
        res.status(200).json({result: result})
    } catch (error) {
        res.status(501).json({error: error})
    }
})

//get all predictions
app.get('/api/getPredictions', async(req,res) => {
    try {
        const result = await PredictionModel.find().sort('expire')
        res.status(200).json({result: result})
    } catch (error) {
        res.status(501).json({error: error})
    }
})

//add bet for an user
app.patch('/api/addBet', async(req, res) => {
    try {
        const {predId, option, twitchId} = req.body
        // const predId = '65206393f25fc5e79dcfa076'
        // const option = ['65206393f25fc5e79dcfa077', '65206393f25fc5e79dcfa078']
        // const twitchId = 'df022409f6e6d57549018216b07270f5'
        const result = await UserModel.updateOne( 
            {
                'twitchId' : twitchId,
                'bets.predId' : {
                    $ne :  predId
                }
            },
    
            {
                $push : {
                    'bets' : { predId : predId, option : [...option] }
                }
            }
        )
        result.modifiedCount > 0 
            ? res.status(200).json({ message: "Prediction Submitted !", result: result })
            : res.status(200).json({ message: "Prediction already submitted !", result: result })
        
    } catch (error) {
        res.status(501).json({error})
    }

    
})

// get all bets of an user
app.get('/api/getUserBets', async(req, res) => {
    try {
        const twitchId = req.body.twitchId
        // const twitchId = 'df022409f6e6d57549018216b07270f5'
        const result = await UserModel.find(
            {'twitchId' : twitchId}, 
            'bets'
            )
        res.status(200).json({result : result})
    } catch (error) {
        res.status(200).json({error : error})
    }

})  

// get admin status
app.get('/api/getAdminDetails/:twid', async(req, res) => {
    try {
        console.log('admin',req.params)
        const twitchId = req.params.twid
        const result = await UserModel.find(
            {'twitchId' : twitchId}, 
            'admin'
            )
        res.status(200).json({result : result})
    } catch (error) {
        res.status(501).json({error : error})
    }

})  

//update scores of all users for correct bets
app.patch('/api/updateScore', async(req,res) => {

    try {
        const {predId, ansId } = req.body

        const allUsers = await UserModel.find( {}, 'twitchId')

        userIds = allUsers.map( e => e.twitchId)
        console.log(userIds)
        let results = []
        let betsLet = []
        
        for(let i = 0 ; i < userIds.length; i++) {
            const twitchId = userIds[i]

            const bets = await UserModel.find(
                {
                    'twitchId' : twitchId
                }, 
                
                'bets'
            )
            betsLet = bets[0].bets
            
            betsLet = betsLet.filter(e => e.predId.toString() === predId)

            const options = betsLet[0] ? betsLet[0].option : betsLet[0]
            
            options ? 
                console.log({match : ansId.reduce((count, option) => (options.includes(option) ? count + 1 : count), 0)})
                : console.log('no match')
            const result = await UserModel.updateMany(
                {
                    'twitchId' : twitchId,
                    "bets" : { 
                        $elemMatch :{
                            'predId' : predId,
                            'option' :  { $in: [...ansId] }
                        }
                    },
                    'wins.preds': { $not: { $elemMatch: { predId: predId } } }
                },
                {
                    $inc : {
                            'wins.score' : options ? ansId.reduce((count, option) => (options.includes(option) ? count + 1 : count), 0)
                                                    : 0 
                        },
                    $push : {
                        'wins.preds': {predId : predId}
                    }
                }
            )

            results.push(result)
            
        }

        // res.status(200).json({ result: results, message: 'Prediction Result Submitted !' })

        const result2 = await PredictionModel.updateOne(
            {
                _id : predId
            },
            {
            $set : { active: false} 
            }
        )

        res.status(200).json({ result: results, result2: result2, message: 'Prediction Result Submitted !' })
    } catch (error) {
        res.status(501).json({ error : error, meesage : 'Internal Server Error' })
    }

    
})

//add New User
app.post('/api/addUser', async(req, res) => {

    const data = req.body

    const createUser = async() => {
        try {
            const result = await UserModel.create(data)

            res.status(200).json({message:"user created",result})
            
        } catch (error) {

            res.status(501).json({ error: error.message });
        }
    }

    const decryptedData = decrypt(data.twitchId);
    
    const enc = encrypt(decryptedData)

    const query = { twitchId : enc.toString() }

    try {
        const findQuery = UserModel.find(query)
        const result = await findQuery.exec()
        
        if(!result || result.length === 0)
            return createUser()
        else res.status(200).json({message: "user found!", result})

    } catch (error) {
        res.status(501).json({error: error})
    }

})

app.get('/', (req,res) => res.send('EXPRESS SERVER'))