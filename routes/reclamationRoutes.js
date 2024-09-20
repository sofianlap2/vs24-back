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
    message: `${user.fullName} a une nouvelle réclamation `,
  });
  req.io.emit('notification', {
    type: 'reclamation',
    referenceId: savedReclamation._id,
    message: `${user.fullName} a une nouvelle réclamation `,
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

router.get('/dashboard/statsRec/:year', Authorisation, async (req, res) => {
  try {
    // Obtenir l'email de l'utilisateur à partir du middleware Authorisation
    const userEmail = req.userEmail;

    // Rechercher l'utilisateur par email
    const user = await User.findOne({ email: userEmail });

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const year = parseInt(req.params.year, 10);
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    // Agrégation pour obtenir les statistiques par mois, filtrée par l'utilisateur connecté
    const statistics = await Reclamation.aggregate([
      {
        $match: {
          user: user._id, // Filtrer par l'ID de l'utilisateur connecté
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
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des statistiques' });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const reclamation = await Reclamation.findById(req.params.id).populate('user').populate('cathegorie');
    res.json(reclamation);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


router.put("/updateReclamation/:id", asyncErrorHandler(async (req, res) => {
  try {
    const updateReclamation = await Reclamation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateReclamation) {
      return res.status(400).json({ msg: 'Publicité non trouvée' });
    }
    res.json(updateReclamation);
  } catch (err) {
    res.status(500).send("Server Error");
  }
}));
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