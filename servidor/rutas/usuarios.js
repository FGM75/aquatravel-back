require("dotenv").config();
const morganFreeman = require("morgan");
const cors = require("cors");
const debug = require("debug")("api-aquatravel:servidor");
const express = require("express");
const jwt = require("jsonwebtoken");
const { crearUsuario } = require("../../db/controladores/usuarios");

const router = express.Router();
router.use(express.json());
router.post("/register", async (req, res, next) => {
  const { usuario, contrasenya, email } = req.body;
  if (!usuario || !contrasenya || !email) {
    const nuevoError = new Error("Faltan credenciales");
    nuevoError.codigo = 400;
    return next(nuevoError);
  }
  const idUsuario = await crearUsuario(usuario, contrasenya, email);
  if (idUsuario) {
    const token = jwt.sign({ id: idUsuario }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });
    res.json({ token });
  } else {
    const nuevoError = new Error("Credenciales incorrectas");
    nuevoError.codigo = 403;
    next(nuevoError);
  }
});

module.exports = router;
