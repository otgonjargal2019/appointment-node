const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const db = require("../models");

const router = express.Router();
const secretKey = require("../middleware/verifyToken").secretKey;
const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

router.post("/auth/google", async (req, res) => {
  console.log("auth google duudagdav");

  const { idToken } = req.body;

  try {
    // Verify the ID token using Google Auth Library
    const ticket = await client.verifyIdToken({
      idToken,
      audience: "YOUR_GOOGLE_CLIENT_ID", // Specify the CLIENT_ID of the app that accesses the backend
    });

    const payload = ticket.getPayload();
    const userId = payload["sub"]; // Google user ID

    // Check if the user exists in your database
    let user = await db.User.findOne({ where: { googleId: userId } });

    // If the user does not exist, create a new user
    if (!user) {
      user = await db.User.create({
        googleId: userId,
        email: payload["email"],
        name: payload["name"],
      });
    }

    // Create a JWT token for the user
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    // Respond with user information and the token
    res.json({
      token,
      username: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Error verifying Google ID token:", error);
    res.status(400).json({ message: "Invalid Google ID token" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Sign-in successful", token, username: user.username });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "Sign-in failed", error: error.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await db.User.create({
      username,
      email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error during user creation:", error);
    res
      .status(500)
      .json({ message: "User creation failed", error: error.message });
  }
});

module.exports = router;
