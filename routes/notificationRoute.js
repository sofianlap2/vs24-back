const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');  // Assure-toi que Notification est le bon modèle
const Authorisation = require("../security/authorisation");
const asyncErrorHandler = require('../security/asyncErrorHandler');

// Fetch notifications count and emit to Socket.IO clients
router.get('/notificationsCount', Authorisation, asyncErrorHandler(async (req, res) => {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({
        status: 'SUCCESS',
        data: notifications
    });

    // Emit the notifications to the specific user
    req.io.to(req.userEmail).emit('notification', notifications);  // Vérifiez cet envoi
}));

router.post('/:notificationId/read', asyncErrorHandler(async (req, res) => {
  const { notificationId } = req.params;
  // Trouver la notification et mettre à jour le champ isRead
  await Notification.findByIdAndUpdate(notificationId, { read: true });
  res.status(200).json({
    status: 'SUCCESS',
    message: 'Notification marquée comme lue'
  });

  // Emit the read notification to the specific user
  const userEmail = req.userEmail;  // Assuming you have this in your middleware
  req.io.to(userEmail).emit('notificationRead', { notificationId });
}));
router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const notification = await Notification.findOneAndDelete({ _id });

    if (!notification) {
      return res.status(400).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;