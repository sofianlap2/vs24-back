const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const StatusEnum = {
  LIBRE: "LIBRE",
  LOUE: "LOUE",
  ENMAINTENANCE: "ENMAINTENANCE",}
const StationSchema = new  Schema({
  numero:{
    type: String
  },
  espacePublic:{
    type: mongoose.Types.ObjectId,
    require:true,
    ref:'EspacePublic'
  },
  modelStation:{
    type: String
  },
  dateFab:{
    type: Date
  },
  dateEntretient:{
     type: Date
  },
  dateFinLoc:{
    type: Date
  },
  status:{ 
    type: String,
    enum: Object.values(StatusEnum),
    
  },  
});
const  Station= mongoose.model('Station', StationSchema);
module.exports = Station;