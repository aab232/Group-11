const express = require("express");
const router = express.Router();
const countryController = require("../controllers/countryController");

// Route to get country details by country NAME
router.get("/country/:countryName", countryController.getCountryDetails);

module.exports = router;
