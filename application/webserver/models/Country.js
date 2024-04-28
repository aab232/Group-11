const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust this according to your setup

class City extends Model {}

City.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.CHAR(35),
      allowNull: false,
      defaultValue: "",
    },
    CountryCode: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      defaultValue: "",
    },
    District: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      defaultValue: "",
    },
    Population: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "City",
    tableName: "city",
    timestamps: false,
  }
);

class Country extends Model {}

Country.init(
  {
    Code: {
      type: DataTypes.CHAR(3),
      primaryKey: true,
      allowNull: false,
      defaultValue: "",
    },
    Name: {
      type: DataTypes.CHAR(52),
      allowNull: false,
      defaultValue: "",
    },
    // Other country properties
  },
  {
    sequelize,
    modelName: "Country",
    tableName: "country",
    timestamps: false,
  }
);

class CountryLanguage extends Model {}

CountryLanguage.init(
  {
    CountryCode: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
    },
    Language: {
      type: DataTypes.CHAR(30),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
    },
    IsOfficial: {
      type: DataTypes.ENUM("T", "F"),
      allowNull: false,
      defaultValue: "F",
    },
    Percentage: {
      type: DataTypes.DECIMAL(4, 1),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    modelName: "CountryLanguage",
    tableName: "countrylanguage",
    timestamps: false,
  }
);

// Define associations
City.belongsTo(Country, { foreignKey: "CountryCode", targetKey: "Code" });
Country.hasMany(City, { foreignKey: "CountryCode", sourceKey: "Code" });

Country.hasMany(CountryLanguage, {
  foreignKey: "CountryCode",
  sourceKey: "Code",
});
CountryLanguage.belongsTo(Country, {
  foreignKey: "CountryCode",
  targetKey: "Code",
});

module.exports = { City, Country, CountryLanguage };
