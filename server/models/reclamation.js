// models/Reclamation.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReclamationSchema = new Schema({
  dateRec:{
    type: Date,
    require:true,
    default: Date.now,
  },
  user:{
    type: mongoose.Types.ObjectId,
    ref:'User'
  },
  cathegorie:{
    type: mongoose.Types.ObjectId,
    ref:'Cathegorie',
    require:true,
  },
  description:{
    type: String,
    require:true,
  }
});

const Reclamation = mongoose.model('Reclamation', ReclamationSchema);
module.exports = Reclamation;
