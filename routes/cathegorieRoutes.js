const Cathegorie = require("../models/cathegorie");
const express = require("express");
const router = express.Router();
const Authorisation = require("../security/authorisation");
const asyncErrorHandler = require("../security/asyncErrorHandler");

router.post("/:email/addCathegorie",Authorisation, async (req, res) => {
    const {
        nomCat
    } = req.body;
    
        
    try {let cathegorie = await Cathegorie.findOne({ nomCat });
    
        if (cathegorie) {
          return res.status(409).json({ message: "Cathégorie already exists" });
        }
        const newCathegorie = new Cathegorie({
            nomCat: nomCat.trim(),
            
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
router.get("/:id", async (req, res) => {
    try {
      const categorie = await Cathegorie.findById(req.params.id);
      res.json(categorie);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  });
  router.put("/updateCategorie/:id", asyncErrorHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { nomCat } = req.body;
  
  
        // Additional validation as necessary
  
        const updateCategorie = await Cathegorie.findByIdAndUpdate(
            id,
            { nomCat },
            { new: true }
        );
        
        if (!updateCategorie) {
            return res.status(404).json({ error: "Categorie non trouvée." });
        }
  
        res.status(200).json(updateCategorie);
    } catch (err) {
        console.error("Erreur serveur lors de la mise à jour de la Categorie:", err);
        res.status(500).json({ error: "Erreur serveur, veuillez réessayer plus tard." });
    }
  }));
module.exports = router;