const express = require("express");
const db = require("../models");
const verifyToken = require("../middleware/verifyToken").verifyToken;

const router = express.Router();

router.get("/types", verifyToken, async (req, res) => {
  try {
    const organizationTypes = await db.OrganizationType.findAll();

    return res.status(200).json(organizationTypes);
  } catch (error) {
    console.error("Error fetching organization types:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
