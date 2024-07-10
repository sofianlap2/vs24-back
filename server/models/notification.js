// models/Notification.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['demande', 'reclamation'],
  },
  referenceId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'type',  // Dynamically refers to the type of model (Demande or Reclamation)
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;
