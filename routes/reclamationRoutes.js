// Import necessary modules
const express = require('express');
const router = express.Router();
const Reclamation = require('../models/reclamation');
const User = require("../models/user");
const Cathegorie = require("../models/cathegorie");
const Authorisation = require("../security/authorisation");
const asyncErrorHandler = require('../security/asyncErrorHandler');
const Notification = require('../models/notification');  // Importer le modèle Notification

router.post('/:email/addReclamation', Authorisation, asyncErrorHandler(async (req, res) => {
  if (!req.body.cathegorie) {
    return res.status(400).json({ error: 'Champs obligatoires manquants dans le corps de la demande' });
  }

  const user = await User.findById(req.userId); // Fetch user details
  const cathegorie = await Cathegorie.findById(req.body.cathegorie); // Fetch cathegorie details

  const newReclamation = new Reclamation({
    user: req.userId, // Use the user ID from the request object
    cathegorie: req.body.cathegorie,
    description: req.body.description,
  });

  const savedReclamation = await newReclamation.save();
  await Notification.create({
    type: 'reclamation',
    referenceId: savedReclamation._id,
    message: `${user.fullName} a une nouvelle réclamation dans la catégorie ${cathegorie.name}`,
  });
  res.status(200).json(savedReclamation);
}));

router.get("/reclamationManagement", Authorisation, async (req, res) => {
  try {
    const reclamation = await Reclamation.find().populate('user').populate('cathegorie'); 
    res.json(reclamation);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Reclamation" });
  }
});

router.get('/ReclamationsClient', Authorisation, async (req, res) => {
  try {
    const userReclamations = await Reclamation.find({ user: req.userId }).populate('cathegorie').exec();
    res.status(200).json(userReclamations);
  } catch (error) {
    console.error("Error fetching user Reclamations:", error);
    res.status(500).json({ error: "Failed to fetch user Reclamations" });
  }
});
router.get('/dashboard/statsRec/:year', async (req, res) => {
  const year = parseInt(req.params.year, 10);

  try {
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    const statistics = await Reclamation.aggregate([
      {
        $match: {
          dateRec: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { month: { $month: '$dateRec' } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: '$_id.month',
          count: 1,
          _id: 0,
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ]);

    res.json(statistics);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des statistiques' });
  }
});


// router.get("/:email/dashboardReclamation",Authorisation, async (req, res) => {
//   try {
//       const countByGouvernorat = await Reclamation.aggregate([
//           {
//               $lookup: {
//                   from: 'espacepublics', // Ensure this matches the actual collection name
//                   localField: 'espacePublic',
//                   foreignField: '_id',
//                   as: 'espacePublicDetails'
//               }
//           },
//           {
//               $unwind: '$espacePublicDetails'
//           },
//           {
//               $group: {
//                   _id: '$espacePublicDetails.gouvernorat',
//                   count: { $sum: 1 }
//               }
//           }
//       ]);

//       res.json(countByGouvernorat);
//   } catch (err) {
//       console.error('Failed to fetch EspacePublic:', err);
//       res.status(500).json({ error: "Failed to fetch EspacePublic" });
//   }
// });

module.exports = router;