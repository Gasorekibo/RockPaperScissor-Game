const router = require("express").Router();
const User = require("../models/Users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER ROUTING

router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.hash_key
      ).toString(),
    });

    const saveUser = await newUser.save();
    const { password, ...otherData } = saveUser._doc;
    res.status(200).json(otherData);
    console.log("User Saved Successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// LOGIN ROUTING

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const inputedPassword = req.body.password;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json("Invalid Credentials");
    }

    // Compare the password user types and the stored one in the database
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.hash_key);
    const stored_DB_password = bytes.toString(CryptoJS.enc.Utf8);

    if (inputedPassword !== stored_DB_password) {
      return res.status(400).json("Wrong password");
    }

    // Password is correct, send the user data (excluding the password)
    // Generating access token
    const access_token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.jwt_key,
      { expiresIn: "2d" }
    );
    const { password, ...data } = user._doc;
    res.status(200).json({ ...data, access_token });
  } catch (error) {
    return res.status(500).json("Error: " + error.message);
  }
});

module.exports = router;
