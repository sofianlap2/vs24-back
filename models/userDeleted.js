const mongoose = require ('mongoose');
const EspacePublic =require('./espacePublic')
const Schema = mongoose.Schema;
const RoleEnum = {
  SUPERADMIN: "SUPERADMIN",
  CLIENT: "CLIENT",
  PUBLICITAIRE: "PUBLICITAIRE",
  USERR:"USER",
  ADMINPUB: "ADMINPUB",
  ADMINCLIENT:"ADMINCLIENT",
  ADMINDEMANDE:"ADMINDEMANDE"

};
const UserDeletedSchema = new  Schema({
  
    
    email: {
        type: String,
        unique: true,
      },
      fullName: {
        type: String,

      }
      ,
      phoneNumber: {
        type: String,
    unique: true
    },
    phoneNumber2: {
      type: String,
 
  }
      ,
      password: {
        type: String,
      },
      confirmPassword: {
        type: String,
      },
      image: {
        data: {
          type: String,
        },
        contentType: {
          type: String,
        },
      },
      verified:{
        type: Boolean,
      }
      ,
      role:{ 
        type: String,
        enum: Object.values(RoleEnum),
        default: RoleEnum.USERR
      },  
      nomEntreprise:{
        type: String,
      }
      
     
});
const  UserDeleted= mongoose.model('UserDeleted', UserDeletedSchema);
module.exports = UserDeleted;