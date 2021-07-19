require("dotenv").config();
const express = require("express");
const { errorServidor } = require("./errores");

const app = express();
const puerto = process.env.PORT || 2000;

const server = app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});

server.on("error", (err) => errorServidor(err, puerto));

module.exports = app;