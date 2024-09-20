const bcrypt = require("bcrypt");
const User = require("../models/user");

const adminAccount = async () => {
  try {
    const existingUser = await User.findOne();

    if (!existingUser) {
      const user = new User({
    fullName :"admin",
   verified:true,
    phoneNumber: "22222222",
   email: "admin@gmail.com",
        password: await bcrypt.hash("admin123", 10),
        

    role: "SUPERADMIN"
    
        
      });

      await user.save();

      console.log('Compte user "admin" créé avec succès !');
    }
  } catch (error) {
    console.error("Erreur lors de la création du compte user :", error);
  }
};

module.exports = adminAccount;
