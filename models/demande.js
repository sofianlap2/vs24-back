// models/Demande.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DemandeEnum = {
  CLIENT: "CLIENT",
  PUBLICITAIRE: "PUBLICITAIRE",
};

const DemandeSchema = new Schema({
  nomEntreprise: {
    type: String,
    unique: true,
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
    unique: true,
  },
  fullName: {
    type: String,
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  phoneNumber2: {
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
  },
  dateDemande:{
    type: Date,
    require:true,
    default: Date.now,
  },
});

// Create unique case-insensitive indexes on relevant fields
DemandeSchema.index({ email: 1 }, { unique: true, collation: { locale: 'fr', strength: 2 } });
DemandeSchema.index({ nomEntreprise: 1 }, { unique: true, collation: { locale: 'fr', strength: 2 } });
DemandeSchema.index({ fullName: 1 }, { unique: true, collation: { locale: 'fr', strength: 2 } });
DemandeSchema.index({ phoneNumber: 1 }, { unique: true, collation: { locale: 'fr', strength: 2 } });

const Demande = mongoose.model('Demande', DemandeSchema);
module.exports = Demande;
