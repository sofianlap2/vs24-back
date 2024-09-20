const Demande = require("../models/demande");
const express = require("express");
const Notification = require('../models/notification');  // Importer le modèle Notification

const router = express.Router();
const Authorisation = require("../security/authorisation");
const asyncErrorHandler = require("../security/asyncErrorHandler");
router.get("/:email/demandesManagement", Authorisation, async (req, res) => {

   
      try {
        const demande = await Demande.find().populate(
            {
                path: 'espacePublic',
                populate: {
                  path: 'user',
                  model: 'User'
                }}
        ); 
        res.json(demande);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch station" });
      }
    });

  router.get("/:id", async (req, res) => {
    try {
      const demande = await Demande.findById(req.params.id);
      res.json(demande);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  });
  router.delete("/:_id", (req, res) => {
    const { _id } = req.params;
  
    Demande.findOneAndDelete({ _id })
      .then((demande) => {
        if (!demande) {
          return res.sendStatus(404); // Demande not found
        }
        res.sendStatus(200); // Successful deletion
      })
      .catch((error) => {
        res.sendStatus(500); // Internal server error
      });
  });
  




  router.post('/demandeClient', asyncErrorHandler(
    async (req, res, next) => {
        let { nomEntreprise, fullName, email, phoneNumber, phoneNumber2, messageDemande, metier, typeDemande, gouvernorat, ville } = req.body;
    
        // Supprimer les espaces en début et fin de chaîne
        nomEntreprise = nomEntreprise.trim();
        fullName = fullName.trim();
        email = email.trim();
        phoneNumber = phoneNumber ? phoneNumber.trim() : '';
        phoneNumber2 = phoneNumber2 ? phoneNumber2.trim() : '';
        messageDemande = messageDemande ? messageDemande.trim() : '';
        metier = metier.trim();
    
        // Vérification des champs obligatoires
        if (!nomEntreprise || !fullName || !email || !metier) {
            return res.status(400).json({
                status: "FAILED",
                message: "Champs de saisie vides"
            });
        }
    
        // Expressions régulières pour les validations
        const nameRegex = /^[a-zA-Z\s]+(?: [a-zA-Z\s]+)*'?$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const messageRegex = /^[a-zA-Z\s,;.: ']*$/; // Permet un message vide
    
        // Validation des champs avec les expressions régulières
        if (!nameRegex.test(fullName)) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Le nom complet ne peut contenir que des lettres, des espaces et des apostrophes'
            });
        }
        if (!nameRegex.test(metier)) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Le métier ne peut contenir que des lettres, des espaces et des apostrophes'
            });
        }
        if (messageDemande && !messageRegex.test(messageDemande)) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Le message ne peut contenir que des lettres, des espaces et des apostrophes'
            });
        }
        if (!nameRegex.test(nomEntreprise)) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Le nom de l\'entreprise ne peut contenir que des lettres, des espaces et des apostrophes'
            });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'L\'adresse email n\'est pas valide'
            });
        }
    
        // Vérifier les duplications insensibles à la casse
        const existingDemande = await Demande.findOne({ email }).collation({ locale: 'fr', strength: 2 });
        if (existingDemande) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'L\'email est déjà utilisé'
            });
        }
        const existingNomEntreprise = await Demande.findOne({ nomEntreprise }).collation({ locale: 'fr', strength: 2 });
        if (existingNomEntreprise) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Le nom de l\'entreprise est déjà utilisé'
            });
        }

        // Créer une nouvelle demande
        const newDemande = new Demande({
            nomEntreprise, fullName, email, phoneNumber, phoneNumber2, messageDemande, metier, typeDemande, gouvernorat, ville
        });

        // Enregistrer la demande dans la base de données
        const result = await newDemande.save();

        // Créer une notification
        await Notification.create({
            type: 'demande',
            referenceId: newDemande._id,
            message: `Nouvelle demande client reçue`,
        });

        return res.status(200).json({
            status: 'SUCCESS',
            message: 'La demande a été créée avec succès',
            data: result
        });
    }
));

// Route pour la demande publicitaire
router.post('/demandePub', asyncErrorHandler(async (req, res) => {
    let { nomEntreprise, fullName, email, phoneNumber,phoneNumber2, messageDemande, gouvernorat, ville, typeEspace, typeDemande, station, espacePublic } = req.body;
    
    // Supprimer les espaces en début et fin de chaîne
    nomEntreprise = nomEntreprise.trim();
    fullName = fullName.trim();
    email = email.trim();
    phoneNumber = phoneNumber ? phoneNumber.trim() : '';
    phoneNumber2 = phoneNumber2 ? phoneNumber2.trim() : '';

    messageDemande = messageDemande ? messageDemande.trim() : '';

    // Vérification des champs obligatoires
    if (!nomEntreprise || !fullName || !email) {
        return res.status(400).json({
            status: "FAILED",
            message: "Champs de saisie vides"
        });
    }

    // Expressions régulières pour les validations
    const nameRegex = /^[a-zA-Z\s]+(?: [a-zA-Z\s]+)*'?$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const messageRegex = /^[a-zA-Z\s,;.:']*$/; // Permet un message vide

    // Validation des champs avec les expressions régulières
    if (!nameRegex.test(fullName)) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'Le nom complet ne peut contenir que des lettres, des espaces et des apostrophes'
        });
    }
    if (messageDemande && !messageRegex.test(messageDemande)) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'Le message ne peut contenir que des lettres, des espaces et des apostrophes'
        });
    }
    if (!nameRegex.test(nomEntreprise)) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'Le nom de l\'entreprise ne peut contenir que des lettres, des espaces et des apostrophes'
        });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'L\'adresse email n\'est pas valide'
        });
    }

    // Vérifier si l'email existe déjà
    const existingDemande = await Demande.findOne({ email });
    if (existingDemande) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'L\'email est déjà utilisé'
        });
    }

    // Créer une nouvelle demande publicitaire
    const newDemande = new Demande({
        nomEntreprise, fullName, email, phoneNumber,phoneNumber2, messageDemande, gouvernorat, ville, typeEspace, typeDemande, station, espacePublic
    });

    // Enregistrer la demande dans la base de données
    const result = await newDemande.save();

    // Créer une notification
    await Notification.create({
        type: 'demande',
        referenceId: newDemande._id,
        message: `Nouvelle demande publicitaire reçue de ${newDemande.fullName} (${newDemande.email})`,
    });

    return res.status(200).json({
        status: 'SUCCESS',
        message: 'La demande a été créée avec succès',
        data: result
    });

}));

router.get('/getDemandStatistics/:year', async (req, res) => {
    const year = parseInt(req.params.year, 10);
  
    try {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
  
      const statistics = await Demande.aggregate([
        {
          $match: {
            dateDemande: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: '$dateDemande' },
              typeDemande: '$typeDemande',
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            month: '$_id.month',
            typeDemande: '$_id.typeDemande',
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
      console.error('Error fetching demand statistics:', error);
      res.status(500).send('Server error');
    }
  });

module.exports = router;