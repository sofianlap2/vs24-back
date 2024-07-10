const express = require("express");
const bcrypt = require("bcrypt");
const adminAccount = require("../security/adminAccount");
const crypto = require("crypto");
const sendEmail = require("../config/sendEmail ");
const router = express.Router();
const mongoose = require ('mongoose');
const asyncErrorHandler = require("../security/asyncErrorHandler");

const User = require("../models/user");
const Token = require("../models/token");
const Authorisation = require("../security/authorisation");
const { error } = require("console");
require('dotenv').config();
const appUrlFront= process.env.CLIENT_URL;
// Signup
router.post('/signup', async (req, res) => {
  try {
    let { fullName, email, phoneNumber, password, confirmPassword } = req.body;
    fullName = fullName.trim();
    email = email.trim();
    phoneNumber = phoneNumber.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();
    
    if (fullName === "" || email === "" || password === "" || confirmPassword === "") {
      return res.json({ status: "FAILED", message: "Empty input fields" });
    } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*'?$/.test(fullName)) {
      return res.json({ status: 'ERROR', message: 'Full name must contain only letters' });
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      return res.json({ status: 'ERROR', message: 'Invalid Email Address' });
    } else if (password.length < 8) {
      return res.json({ status: 'ERROR', message: 'The password is too short.' });
    } else if (password !== confirmPassword) {
      return res.json({ status: 'ERROR', message: 'Passwords do not match' });
    } else {
      // Checking if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ status: 'ERROR', message: 'Email is already in use' });
      }

      // Password handling
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltRounds);
      
      // Create new user
      const newUser = new User({
        fullName,
        email,
        phoneNumber,
        password: hashPassword
      });
      
      const user = await newUser.save();

      // Generate verification token
      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const verificationUrl = `${appUrlFront}/users/${user.id}/verify/${token.token}`;
      const emailContent = `
      <p>Thank you for signing up with our service!</p>
      <p>To complete the registration process, please click the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>If you did not sign up for this service, you can safely ignore this email.</p>
    `;
    await sendEmail(user.email, "Verify Email", emailContent);

      return res.status(201).json({ message: "An Email sent to your account please verify" });
    }
  } catch (err) {
    return res.json({ status: "ERROR", message: "An error occurred while processing your request" });
  }
});

router.get("/:id/verify/:token/", async (req, res) => {
  try {
    const userId = req.params.id; // Store for readability
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: "Invalid link" });
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).send({ message: "Invalid link" });
    }

    const token = await Token.findOne({ userId: user._id, token: req.params.token });
    if (!token) {
      return res.status(400).send({ message: "Invalid link" });
    }

    await User.updateOne({ _id: user._id }, { $set: { verified: true } }); // Update only 'verified' field
    await Token.deleteOne({ userId: user._id, token: req.params.token }); // Delete matching token

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return res.status(500).send({ message: "Internal Server Error (Database)" });
    } else {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
});

router.get("/:email", Authorisation, (req, res) => {
  const { email } = req.params;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.sendStatus(404);
      }
      res.json(user);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});
router.get("/:email", Authorisation, (req, res) => {
  const { email } = req.params;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.sendStatus(404);
      }
      res.json(user);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

router.put("/:email", Authorisation, async (req, res) => {
  const { email } = req.params;
  const { newEmail, fullName, phoneNumber,image } = req.body;

  if (req.userEmail === email) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.sendStatus(404);
      }

      if (image && image.data) {
        user.image = {
          data: image.data,
          contentType: image.contentType,
        };
      }

      user.email = newEmail;
      user.fullName = fullName;
      user.phoneNumber = phoneNumber;



      await user.save();

      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
});

router.delete("/:email", Authorisation, (req, res) => {
  const { email } = req.params;

  User.findOneAndDelete({ email })
    .then((user) => {
      if (!user) {
        return res.sendStatus(404);
      }
      adminAccount();

      res.sendStatus(200);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});
router.put("/:email/changePassword", asyncErrorHandler( async (req, res) => {
  const { email } = req.params;
  const { currentPassword, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User non trouvé" });
  }

  // Vérifier si le mot de passe actuel correspond à celui stocké
  const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Mot de passe incorrect" });
  }

  if (currentPassword === newPassword) {
    return res.status(400).json({ message: "Mot de passe identique" });
  }

  // Mettre à jour le mot de passe avec le nouveau mot de passe
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ message: "Mot de passe modifié avec succès" });
}));



router.put("/:email/firstUpdate", Authorisation, async (req, res) => {
  const { email } = req.params;
  const { newEmail, fullName, password, image,phoneNumber } = req.body;

  if (req.userEmail === email) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.sendStatus(404);
      }

      if (image && image.data) {
        user.image = {
          data: image.data,
          contentType: image.contentType,
        };
      }

      user.email = newEmail;
      user.fullName = fullName;
      user.phoneNumber = phoneNumber;
      user.password = await bcrypt.hash(password, 10);

      await user.save();

      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
});

router.get("/:email/usersManagement", Authorisation, async (req, res) => {

  try {
    const users = await User.find(); 

    res.json(users);
  } catch (err) {
    res.json(err);
  }
});
router.get('/:email/clientRole', Authorisation, async (req, res) => {
  try {
    // Find users with role 'client' (lowercase for consistency)
    const users = await User.find({ role: { $regex: /^client$/i } });

    // Send response with users
    res.json(users);
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: "Failed to fetch users with client role" });
  }
});

const generateRandomPassword = () => {
  const length = 10;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

router.post("/:email/addClient",asyncErrorHandler( async (req, res) => {
  const { email, fullName,  phoneNumber,phoneNumber2, image,nomEntreprise } = req.body;

  
    let user = await User.findOne({ email }).collation({ locale: 'fr', strength: 2 });

    if (user) {
      return res.status(400).json({ message: "Email est déja utilisé" });
    }

    const rawPassword = generateRandomPassword(); // Generate random password
    const hashedPassword = await bcrypt.hash(rawPassword, 10); // Hash the generated password

    user = new User({
      email,
      fullName,
      
      phoneNumber,
      phoneNumber2,
      nomEntreprise,
      password: hashedPassword, // Set the hashed password
      role: 'CLIENT'
    });

    if (image && image.data) {
      user.image = {
        data: image.data,
        contentType: image.contentType,
      };
    }

    await user.save();
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const verificationUrl = `${appUrlFront}/users/${user.id}/verify/${token.token}`;
    const emailContent = `
      <p> Bonjour  ${fullName},</p>
      <p> Merci de vous être inscrit!</p>
      <p>  Les détails de votre compte sont les suivants:</p>
      <p>  Adresse électronique: ${email}</p>
      <p> Mot de passe:   ${rawPassword}</p>
      <p>Veuillez vérifier votre adresse e-mail en cliquant sur le lien suivant:</p>
      <a href="${verificationUrl}">Vérifier l'e-mail</a>
      <p>Cordialement</p>
      `;

    await sendEmail(user.email, "Verify Email", emailContent);
    console.log("User added successfully");
    console.log("Generated password:", rawPassword); // Log the raw (unhashed) password
    res.status(200).json({ message: "Client est ajouté avec succssé" });
  
}));

router.post("/:email/addPublicitaire",asyncErrorHandler( async (req, res) => {
  const { email, fullName,  phoneNumber,phoneNumber2, image,nomEntreprise } = req.body;

  
    let user = await User.findOne({ email }).collation({ locale: 'fr', strength: 2 });

    if (user) {
      return res.status(409).json({ message: "Email est déja utilisé" });
    }

    const rawPassword = generateRandomPassword(); // Generate random password
    const hashedPassword = await bcrypt.hash(rawPassword, 10); // Hash the generated password

    user = new User({
      email,
      fullName,
      nomEntreprise,
      phoneNumber2,
      phoneNumber,
      password: hashedPassword, // Set the hashed password
      role: 'PUBLICITAIRE'
    });

    if (image && image.data) {
      user.image = {
        data: image.data,
        contentType: image.contentType,
      };
    }

    await user.save();
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const verificationUrl = `${appUrlFront}/users/${user.id}/verify/${token.token}`;
    const emailContent = `
      <p> Bonjour  ${fullName},</p>
      <p> Merci de vous être inscrit!</p>
      <p>  Les détails de votre compte sont les suivants:</p>
      <p>  Adresse électronique: ${email}</p>
      <p> Mot de passe:   ${rawPassword}</p>
      <p>Veuillez vérifier votre adresse e-mail en cliquant sur le lien suivant:</p>
      <a href="${verificationUrl}">Vérifier l'e-mail</a>
      <p>Cordialement</p>
      `;

    await sendEmail(user.email, "Verify Email", emailContent);
    console.log("User added successfully");
    console.log("Generated password:", rawPassword); // Log the raw (unhashed) password
    res.status(200).json({ message: "Publicitaire est ajouté avec succé" });
 
}));
router.get('/:email/filterUserWithRole', Authorisation, async (req, res) => {
  try {
    const { role } = req.query;
    let filter = {};

    if (role) {
      filter.role = role;
    }

    

    const users = await User.find(filter);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch espacePublic" });
  }
});
router.post("/:email/addAdmin", Authorisation, async (req, res) => {
  const { email, fullName, phoneNumber,phoneNumber2, role, image } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const rawPassword = generateRandomPassword(); // Generate random password
    const hashedPassword = await bcrypt.hash(rawPassword, 10); // Hash the generated password

    user = new User({
      email,
      fullName,
      phoneNumber,
      phoneNumber2,
      password: hashedPassword, // Set the hashed password
      role: role  // Set the role, defaulting to 'ADMIN' if not provided
    });

    if (image && image.data) {
      user.image = {
        data: image.data,
        contentType: image.contentType,
      };
    }

    await user.save();
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const verificationUrl = `${appUrlFront}/users/${user.id}/verify/${token.token}`;
    const emailContent = `
      <p> Hi ${fullName},</p>
      <p> Thank you for signing up!</p>
      <p> Your account details are as follows:</p>
      <p> Email: ${email}</p>
      <p> Password: ${rawPassword}</p>
      <p>You must change the email to ${fullName}@voltwiseSolutions.com and between the firstName and lastName must do a point</p>
      <p>Please verify your email by clicking the following link:</p>
      <a href="${verificationUrl}"> Verify Email </a>
      <p>Regards</p>
      <p>Your App Team</p>`;

    await sendEmail(user.email, "Verify Email", emailContent);
    console.log("User added successfully");
    console.log("Generated password:", rawPassword); // Log the raw (unhashed) password
    res.status(200).json({ message: "User added successfully", password: rawPassword });
  } catch (error) {
    res.status(500).json({ message: "Failed to add User" });
  }
});
router.get("/:email/userRole",Authorisation, async (req, res) => { // added 'async' here
  const { email } = req.body;

  try {
    const user = await User.find({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "email ot found" });
    }
    res.json({ role: req.userRole }); // Return the user's role
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get("/:email/userVerified",Authorisation, async (req, res) => { // added 'async' here
  const { email } = req.body;

  try {
    const user = await User.find({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "email ot found" });
    }
    res.json({ verified: req.userVerified }); 
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post("/getRole", async (req, res) => {
  const { email } = req.body; // Access email from request body

  try {
    const user = await User.findOne({ email }).select("fullName email nomEntreprise phoneNumber phoneNumber2 role");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Assuming userRole is stored in the user object
    res.json({ role: user.role }); // Return the user's role
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.put("/updateUser/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, // Use req.params.id for the espacePublic ID
      req.body,     // The updated data will be in req.body
      { new: true } // Return the updated document
    );
    
    if (!updatedUser) {
      return res.status(400).json({ msg: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
router.get("/getUser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const userDeleted = await User.findOneAndDelete({ _id });

    if (!userDeleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});







module.exports = router;
