const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const commonConfig = {
  user: "postgres",
  host: "localhost",
  password: process.env.DB_PASSWORD,
  port: "5432",
};

module.exports = commonConfig;
