const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const CassierSchema = new  Schema({
    locker_number:{type:
    Number
  },
  station_ref:{
    type: mongoose.Types.ObjectId,
    require:true,
    ref:'Station'
  }
    
     
});
const  Cassier= mongoose.model('CAssier', CassierSchema);
module.exports = Cassier;