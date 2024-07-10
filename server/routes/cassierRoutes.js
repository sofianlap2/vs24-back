const express = require('express');
const router = express.Router();
const Cassier = require("../models/cassier")

const Authorisation = require("../security/authorisation");
router.get("/cassierManagement", Authorisation, async (req, res) => {
  try {
    const cassiers = await Cassier.find()
      .populate({
        path: 'station_ref',
        populate: {
          path: 'espacePublic',
          model: 'EspacePublic'
        }
      });
    res.json(cassiers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cassiers" });
  }
});



  module.exports = router;