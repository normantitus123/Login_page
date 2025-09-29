const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const commonConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

module.exports = commonConfig;
