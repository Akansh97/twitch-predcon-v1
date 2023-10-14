

const mongoose = require('mongoose')


const contestantSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId, 
    name: String
  });
  
  const predictionSchema = new mongoose.Schema({
    
        contestants: [contestantSchema],
        active : Boolean,
        title : {type:String, default:'Predict'},
        multiSelect : {type:Boolean, default:false},
        limit : { type: Number, default : 1},
        expire : {
          type : Date, 
          default: function() {
              const oneDayFromNow = new Date();
              oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);
              return oneDayFromNow;
            }
        },
        dateTime: { type: Date, default: Date.now }
    
  });
  
  const PredictionModel = mongoose.model('Predictions', predictionSchema);

module.exports = PredictionModel;

