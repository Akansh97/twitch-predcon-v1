const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        
        twitchId: String,
        
        name : String,

        bets : [
            {
                predId : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Predictions',
                },
                option: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Predictions.contestants'
                }]
            }
        ],

        wins : {
            preds : [
                {
                    predId : {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Predictions',
                    }
                }
            ],

            score : {type: Number, default : 0}
        },

        admin : {
            type : Boolean,
            default : false
        }
    }
)

const UserModel = new mongoose.model('usersPred', userSchema)

module.exports = UserModel