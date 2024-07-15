const mongoose = require ('mongoose');
const EspacePublic =require('./espacePublic')
const Schema = mongoose.Schema;
const PubliciteSchema = new  Schema({
  video: {
    data: Buffer, // Use Buffer type for video data
    contentType: String, // Specify the content type (e.g., 'video/mp4')
  },
  dateDebPub:{
    type: Date,
    required: true,
  },
  dateFinPub: {
    type: Date,
    required: true,
   
  },
  status: {
    type: String,
    enum: ['En attente', 'Accepté', 'Refusé', 'Terminé'],
    default: 'En attente',
  },
  espacePublic:[{
    type: mongoose.Types.ObjectId,
    require:true,
    ref:'EspacePublic'
  }],
  user:{
    type: mongoose.Types.ObjectId,
    require:true,
    ref:'User'
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});
  const  Publicite= mongoose.model('Publicite', PubliciteSchema);
module.exports = Publicite;