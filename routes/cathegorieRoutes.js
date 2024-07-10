const Cathegorie = require("../models/cathegorie");
const express = require("express");
const router = express.Router();
const Authorisation = require("../security/authorisation");

router.post("/:email/addCathegorie",Authorisation, async (req, res) => {
    const {
        name
    } = req.body;
    
        
    try {let cathegorie = await Cathegorie.findOne({ name });
    
        if (cathegorie) {
          return res.status(409).json({ message: "Cathégorie already exists" });
        }
        const newCathegorie = new Cathegorie({
            name: name.trim(),
            
        });

        await newCathegorie.save();

        

        res.json({
            status: 'SUCCESS',
            message: 'Cahegorie saved successfully',
        });
    } catch (error) {
        res.json({
            status: 'ERROR',
            message: 'Error adding cathegorie'
        });
    }
});
router.get("/:email/cathegorieManagement", Authorisation, async (req, res) => {

   
    try {
      const cathegorie = await Cathegorie.find(); 
      res.json(cathegorie);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch cathegorie" });
    }
  });
  router.delete("/:_id", (req, res) => {
    const { _id } = req.params;

    Cathegorie.findOneAndDelete({ _id })
        .then((cathegorie) => {
            if (!cathegorie) {
                return res.sendStatus(404); // Demande not found
            }
            res.sendStatus(200); // Successful deletion
        })
        .catch((error) => {
            res.sendStatus(500); // Internal server error
        });
});

module.exports = router;
