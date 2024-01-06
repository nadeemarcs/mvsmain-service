const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(4040),
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  //mongoUri: "mongodb://root:root123@localhost:27017/ATSDBTEST",
  mongoUri: "mongodb://localhost:27017/ATSDBTEST",

  // server : mongodb+srv://admin:<password>@cluster0.5zs0pnq.mongodb.net/?retryWrites=true&w=majority

  // mongoUri: "mongodb://34.131.93.79:27017/ATSDB",
  mongoDebug: true
  // jwtSecret: envVars.JWT_SECRET,
};

module.exports = config;


