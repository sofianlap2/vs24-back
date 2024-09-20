const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DemandeEnum = {
  CLIENT: "CLIENT",
  PUBLICITAIRE: "PUBLICITAIRE",
};



const DemandeRejetSchema = new Schema({
  nomEntreprise: {
    type: String,
  },
  metier: {
    type: String,
  },
  typeDemande: {
    type: String,
    enum: Object.values(DemandeEnum),
  },
  email: {
    type: String,
  },
  fullName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  gouvernorat: {
    type: String
  },
  ville: {
    type: String,
  },
  typeEspace: {
    type: String,
  },
  espacePublic: [{
    type: mongoose.Types.ObjectId,
    ref: 'EspacePublic'
  }],
  
  messageDemande: {
    type: String
  }
});


const DemandeRejet = mongoose.model('DemandeRejet', DemandeRejetSchema);
module.exports = DemandeRejet;
