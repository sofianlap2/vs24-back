
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const CathegorieSchema = new  Schema({
 
nomCat:{
    type: String,
    require:true,
  }
    
     
});
const  Cathegorie= mongoose.model('Cathegorie', CathegorieSchema);
module.exports = Cathegorie;