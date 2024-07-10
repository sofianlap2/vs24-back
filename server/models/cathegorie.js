
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const CathegorieSchema = new  Schema({
 
  name:{
    type: String,
    require:true,
  }
    
     
});
const  Cathegorie= mongoose.model('Cathegorie', CathegorieSchema);
module.exports = Cathegorie;