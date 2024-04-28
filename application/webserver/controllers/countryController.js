const { Op } = require("sequelize");
const { Country, City, CountryLanguage } = require("../models/Country");

// Controller function to get details (languages and cities) of a country by country name
exports.getCountryDetails = async (req, res) => {
  try {
    // Get country name from request parameters
    const countryName = req.params.countryName;

    if (!countryName) {
      return res
        .status(400)
        .json({ message: "Country name is missing in the request" });
    }

    // Find country details by name (case-insensitive search)
    const country = await Country.findOne({
      where: {
        Name: {
          [Op.like]: `%${countryName.toLowerCase()}%`,
        },
      },
      include: [{ model: City }, { model: CountryLanguage }],
    });

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    return res.json({ country });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
