// Import necessary modules
const express = require('express');
const router = express.Router();
const Station = require('../models/station');
const EspacePublic = require("../models/espacePublic");

const Authorisation = require("../security/authorisation");
const asyncErrorHandler = require('../security/asyncErrorHandler');

router.post('/:email/addStation', Authorisation, asyncErrorHandler(async (req, res) => {
  // Validate input
  const { numero, espacePublic, modelStation, dateFab, dateEntretient, dateFinLoc, status } = req.body;
  if (!numero || !espacePublic) {
    return res.status(400).json({ error: 'Missing required fields in request body' });
  }

  // Check if a station with the same numero and espacePublic exists
  const existingStation = await Station.findOne({ numero, espacePublic });
  if (existingStation) {
    return res.status(400).json({ error: 'Station with the same numero and espacePublic already exists' });
  }

  // Date validation
  const now = new Date();
  const fabricationDate = new Date(dateFab);
  const entretienDate = new Date(dateEntretient);
  const finLocDate = new Date(dateFinLoc);

  if (fabricationDate >= now) {
    return res.status(400).json({ error: 'La date de fabrication  doit être supérieure à la date courant' });
  }
  if (fabricationDate >= finLocDate) {
    return res.status(400).json({ error: 'La date de fabrication  doit être inférieur à la date fin de location' });
  }

  if (fabricationDate > entretienDate) {
    return res.status(400).json({ error: 'La date de fabrication  doit être inférieur à la date de maintenance ' });
  }

  // Create a new instance of Station
  const newStation = new Station({
    numero,
    espacePublic,
    modelStation,
    dateFab,
    dateEntretient,
    dateFinLoc,
    status
  });

  // Save the new instance to the database
  const savedStation = await newStation.save();

  // Send a success response
  res.status(200).json(savedStation);
}));



router.get("/stationManagement", Authorisation, async (req, res) => {
  try {
    const stations = await Station.find().populate('espacePublic');
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stations" });
  }
});
router.get("/:email/dashboardStation",Authorisation, async (req, res) => {
  try {
      const countByGouvernorat = await Station.aggregate([
          {
              $lookup: {
                  from: 'espacepublics', // Ensure this matches the actual collection name
                  localField: 'espacePublic',
                  foreignField: '_id',
                  as: 'espacePublicDetails'
              }
          },
          {
              $unwind: '$espacePublicDetails'
          },
          {
              $group: {
                  _id: '$espacePublicDetails.gouvernorat',
                  count: { $sum: 1 }
              }
          }
      ]);

      res.json(countByGouvernorat);
  } catch (err) {
      res.status(500).json({ error: "Failed to fetch EspacePublic" });
  }
});
router.get('/StationsClient', Authorisation, async (req, res) => {
  try {
    // Get user ID from request
    const userId = req.userId;

    // Find stations that are connected to espacePublic which is connected to the user
    const userStations = await Station.aggregate([
      {
        $lookup: {
          from: 'espacepublics', // name of the espacePublic collection
          localField: 'espacePublic',
          foreignField: '_id',
          as: 'espacePublic'
        }
      },
      {
        $unwind: '$espacePublic'
      },
      {
        $lookup: {
          from: 'users', // name of the user collection
          localField: 'espacePublic.user',
          foreignField: '_id',
          as: 'espacePublic.user'
        }
      },
      {
        $unwind: '$espacePublic.user'
      },
      {
        $match: {
          'espacePublic.user._id': userId
        }
      }
    ]).exec();

    // Send a success response with the user's stations
    res.status(200).json(userStations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user stations" });
  }
});



module.exports = router;
