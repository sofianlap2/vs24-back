const express = require('express');
const router = express.Router();
const Publicite = require('../models/publicite');
const Authorisation = require('../security/authorisation');
const multer = require('multer');
const cron = require('node-cron');

const asyncErrorHandler = require('../security/asyncErrorHandler');

// Use GridFS storage engine for large files
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB limit
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|avi|mkv)$/)) {
      return cb(new Error('Le fichier doit être une vidéo.'));
    }
    cb(undefined, true);
  }
});
// Schedule a cron job to update the status of expired publicites
cron.schedule('0 0 * * *', async () => {
  // This cron job runs every day at midnight
  try {
    const currentDate = new Date();
    const result = await Publicite.updateMany(
      { dateFinPub: { $lt: currentDate }, status: { $ne: 'Terminé' } },
      { $set: { status: 'Terminé' } }
    );
    console.log('Updated status of expired publicites to Terminé', result);
  } catch (error) {
    console.error('Error updating status of expired publicites:', error);
  }
});

router.post('/addPublicite', Authorisation, upload.single('video'), asyncErrorHandler(async (req, res) => {
  
    const { dateDebPub, dateFinPub, espacePublic } = req.body;

    // Ensure dateDebPub and dateFinPub are valid dates
    if (!dateDebPub || !dateFinPub) {
      return res.status(400).json({ error: 'Les dates de début et de fin sont requises.' });
    }

    // Convert dates to Date objects
    const dateDebPubDate = new Date(dateDebPub);
    const dateFinPubDate = new Date(dateFinPub);
    const currentDate = new Date();

    // Validate that dateDebPub is in the future and dateFinPub is after dateDebPub
    if (dateDebPubDate >= currentDate) {
      return res.status(400).json({ error: 'La date de début de la publicité doit être supérieure à la date courant.' });
    }

    if (dateFinPubDate <= dateDebPubDate) {
      return res.status(400).json({ error: 'La date de fin doit être supérieure à la date de début.' });
    }

    // Ensure the file is present
    if (!req.file) {
      return res.status(400).json({ error: 'Un fichier vidéo est requis.' });
    }

    // Create the new Publicite instance
    const ad = new Publicite({
      video: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      dateDebPub,
      dateFinPub,
      espacePublic: espacePublic.split(','), // Assuming espacePublic is sent as a comma-separated list
      user: req.userId, // Corrected typo: should be req.userId
    });

    await ad.save();
    res.status(200).send({ message: 'Votre publicité est en attente d’approbation. Vous serez contacté dans les plus brefs délais.', ad });
 
}));
router.get('/publiciteManagementPub', Authorisation, async (req, res) => {
  try {
    const userPublicites = await Publicite.find({ user: req.userId }).exec();
    res.status(200).json(userPublicites);
  } catch (error) {
    console.error("Error fetching user Reclamations:", error);
    res.status(500).json({ error: "Failed to fetch user Reclamations" });
  }
});
router.get("/publicitesManagement", Authorisation, async (req, res) => {
  try {
    const publicite = await Publicite.find().populate('user').populate('espacePublic'); 
    res.json(publicite);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch publicites" });
  }
});
router.get("/getPub/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const publicite = await Publicite.findById(id)
      .populate({
        path: 'user',
        select: 'fullName phoneNumber phoneNumber2 email nomEntreprise' // Specify the fields you want to include
      })
      .populate({
        path: 'espacePublic',
        select: 'nomEspace typeEspace gouvernorat ville' // Specify the fields you want to include
      });

    if (!publicite) {
      return res.status(400).json({ msg: 'Publicité non trouvée' });
    }

    res.json(publicite);
  } catch (err) {
    console.error("Error fetching publicite:", err);
    res.status(500).send("Server Error");
  }
});




// Update the status of a specific publicite
router.put("/updatePub/:id", Authorisation, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedPub = await Publicite.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPub) {
      return res.status(400).json({ msg: 'Publicité non trouvée' });
    }
    res.json(updatedPub);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
router.post('/updateExpiredPublicites', Authorisation, async (req, res) => {
  try {
    const currentDate = new Date();
    const result = await Publicite.updateMany(
      { dateFinPub: { $lt: currentDate }, status: { $ne: 'Terminé' } },
      { $set: { status: 'Terminé' } }
    );
    res.status(200).json({ message: 'Updated status of expired publicites to Terminé', result });
  } catch (error) {
    console.error('Error updating status of expired publicites:', error);
    res.status(500).json({ error: 'Failed to update status of expired publicites' });
  }
});


module.exports = router;
