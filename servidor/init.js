require("dotenv").config();
const express = require("express");
const debug = require("debug")("api-aquatravel:servidor:init");
const chalk = require("chalk");

const app = express();

const puerto = process.env.PORT || 5000;

const iniciaServidor = () => {
  const servidor = app.listen(puerto, () => {
    debug(chalk.yellow(`Servidor iniciado en el puerto ${puerto}`));
  });

  servidor.on("error", (err) => {
    debug(
      chalk.red.bold(`Error al iniciar el servidor en el puerto ${puerto}`)
    );
    if (err.code === "EADDRINUSE") {
      debug(chalk.red.bold(`El puerto ${puerto} está ocupado`));
    }
  });
};

module.exports = {
  app,
  iniciaServidor,
};
