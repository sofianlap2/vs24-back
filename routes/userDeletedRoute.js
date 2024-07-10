const UserDeleted = require("../models/userDeleted");
const express = require("express");
const router = express.Router();
const Authorisation = require("../security/authorisation");
const User = require("../models/user");

router.post('/addUserDeleted', async (req, res) => {
  try {
    const { email } = req.params;
    const deletedUser = new UserDeleted(req.body);
    await deletedUser.save();
    await User.findOneAndDelete({ email });

    res.status(200).send(deletedUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(400).send(error);
  }
});
router.post('/userRetaurer', async (req, res) => {
  try {
    const { email } = req.params;
    const deletedUser = new User(req.body);
    await deletedUser.save();
    await UserDeleted.findOneAndDelete({ email });

    res.status(200).send(deletedUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(400).send(error);
  }
});

router.get("/:email/userDeletedManagement", Authorisation, async (req, res) => {
  try {
    const userDeleted = await UserDeleted.find();
    res.json(userDeleted);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;

  try {
    const userDeleted = await UserDeleted.findOneAndDelete({ _id });

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
