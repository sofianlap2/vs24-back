const express = require("express");
const Newsletter = require("../models/newsletter");
const asyncErrorHandler = require("../security/asyncErrorHandler");

const router = express.Router();

router.post('/addNewsletter', asyncErrorHandler(async (req, res) => {
    const existingNewsletter = await Newsletter.findOne({
        emailNewsletter: req.body.emailNewsletter,
    });

    if (existingNewsletter) {
        return res.status(400).json({ message: 'Cet email est déjà abonné à la newsletter!' });
    }

    const newNewsletter = new Newsletter({
        emailNewsletter: req.body.emailNewsletter,
    });

    await newNewsletter.save();
    return res.status(200).json({ message: 'Inscription réussie à la newsletter!' });
}));

module.exports = router;
