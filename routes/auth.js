const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
require("dotenv").config();
const db = require("../models");

const router = express.Router();
const secretKey = require("../middlewares/verifyToken").secretKey;
const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

router.post("/facebook", async (req, res) => {
  const { provider, providerId, email, accessToken } = req.body;

  try {
    const response = await axios.get(`https://graph.facebook.com/debug_token`, {
      params: {
        input_token: accessToken,
        access_token: `${FACEBOOK_APP_ID}|${FACEBOOK_APP_SECRET}`,
      },
    });

    const tokenData = response.data.data;

    if (!tokenData.is_valid) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    console.log("hariu irev:::", response.data);

    let user = await db.User.findOne({ where: { email } });

    if (!user) {
      user = await db.User.create({
        username: `fb_${providerId}`,
        email,
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token, user });
  } catch (err) {
    console.error(`${err.message}`);
    return res.status(500).json({
      message: "Facebook authentication failed due to a Token -  auth-server.",
    });
  }
});

router.post("/google", async (req, res) => {
  const { provider, providerId, email, otherUserInfo } = req.body;

  if (!provider || !providerId || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    let socialAuth = await db.SocialAuth.findOne({
      where: { provider, providerId },
      include: { model: db.User, as: "user" },
    });

    let user;

    console.log("socialAuth>>>>>>>>>>>>>>>>>", socialAuth);

    if (socialAuth) {
      user = socialAuth.user;
      console.log("user>>>>>>>>>>>>>>>>>>>>>>>", user);
    } else {
      user = await db.User.findOne({ where: { email } });

      if (!user) {
        user = await db.User.create({
          username: otherUserInfo?.username || email.split("@")[0],
          email,
        });
      }

      socialAuth = await db.SocialAuth.create({
        userId: user.id,
        provider,
        providerId,
        email,
      });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        provider: socialAuth.provider,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Error in social auth:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/signin", async (req, res) => {
  console.log("sign in duudagdav???????????????????????");
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
