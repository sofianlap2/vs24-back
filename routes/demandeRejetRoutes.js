const DemandeRejet = require("../models/demandeRejet");
const Demande = require("../models/demande");
const express = require("express");
const router = express.Router();
const Authorisation = require("../security/authorisation");

router.post('/demandeRejet', async (req, res) => {
    const {
        nomEntreprise, fullName, email, phoneNumber, messageDemande,
        gouvernorat, ville, typeEspace, typeDemande, espacePublic, metier
    } = req.body;

    try {
        // Create new DemandeRejet
        const newRejet = new DemandeRejet({
            nomEntreprise: nomEntreprise ? nomEntreprise.trim() : '',
            fullName: fullName ? fullName.trim() : '',
            email: email ? email.trim() : '',
            phoneNumber: phoneNumber ? phoneNumber.trim() : '',
            messageDemande: messageDemande ? messageDemande.trim() : '',
            gouvernorat,
            ville,
            typeEspace,
            typeDemande,
            espacePublic,
            metier: metier ? metier.trim() : ''
        });

        await newRejet.save();

        // Delete the demande from demandes collection
        await Demande.findOneAndDelete({ email });

        res.json({
            status: 'SUCCESS',
            message: 'Demande rejected and saved successfully',
        });
    } catch (error) {
        res.json({
            status: 'ERROR',
            message: 'Error in rejecting demande'
        });
    }
});

router.get("/:email/demandesRejetManagement", Authorisation, async (req, res) => {

   
    try {
      const demandeRejet = await DemandeRejet.find().populate('espacePublic'); 
      res.json(demandeRejet);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch station" });
    }
  });
  router.delete("/:_id", (req, res) => {
    const { _id } = req.params;

    DemandeRejet.findOneAndDelete({ _id })
        .then((demandeRejet) => {
            if (!demandeRejet) {
                return res.sendStatus(404); // Demande not found
            }
            res.sendStatus(200); // Successful deletion
        })
        .catch((error) => {
            res.sendStatus(500); // Internal server error
        });
});


module.exports = router;
