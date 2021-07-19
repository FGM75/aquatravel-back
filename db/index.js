require("dotenv").config();
const debug = require("debug")("api-gatos:db:conexion");
const chalk = require("chalk");
const mongoose = require("mongoose");

const conectaMongo = (callback) => {
  mongoose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        debug(chalk.red.bold("No se ha podido iniciar la base de datos"));
        debug(chalk.red.bold(err.message));
        return;
      }
      debug(chalk.magentaBright("Base de datos iniciada"));
      callback();
    }
  );
};

module.exports = conectaMongo;
