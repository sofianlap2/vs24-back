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
const UserSchema = new  Schema({
  
    
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
        default: false
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
UserSchema.index({ email: 1 }, { unique: true, collation: { locale: 'fr', strength: 2 } });

const  User= mongoose.model('User', UserSchema);
module.exports = User;