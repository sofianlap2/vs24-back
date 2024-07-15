const mongoose = require ('mongoose');
const User = require("../models/user");

const Schema = mongoose.Schema;
const TypeEnum = {
    MALL: "MALL",
    HOTEL: "HOTEL",
    SALLESPORT: "SALLESPORT",
    HOPITAL: "HOPITAL",
    AUTRE: "AUTRE"
  };
const EspacePublicSchema = new  Schema({
  nomEspace:{type:
    String
  },
  gouvernorat:{
    type:String
  },
  ville:{
    type:String,
  },
  typeEspace:{
    type: String,
    enum: Object.values(TypeEnum),
  },
  user:{
    type: mongoose.Types.ObjectId,
    ref:'User'
  }
    
     
});
EspacePublicSchema.index({ nomEspace: 1 }, { unique: true, collation: { locale: 'fr', strength: 2 } });

const  EspacePublic= mongoose.model('EspacePublic', EspacePublicSchema);
module.exports = EspacePublic;