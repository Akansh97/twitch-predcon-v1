

const mongoose = require('mongoose')


const contestantSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId, 
    name: String
  });
  
  const predictionSchema = new mongoose.Schema({
    
        contestants: [contestantSchema],
        active : Boolean,
        title : {type:String, default:'Predict'},
        dateTime: { type: Date, default: Date.now }
    
  });
  
  const PredictionModel = mongoose.model('Predictions', predictionSchema);

module.exports = PredictionModel;

