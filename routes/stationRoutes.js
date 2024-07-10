// Import necessary modules
const express = require('express');
const router = express.Router();
const Station = require('../models/station');
const EspacePublic = require("../models/espacePublic");

const Authorisation = require("../security/authorisation");

router.post('/:email/addStation', Authorisation, async (req, res) => {
  try {
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
    res.status(201).json(savedStation);
  } catch (error) {
    res.status(500).json({ error: "Failed to add Station" });
  }
});

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

module.exports = router;
