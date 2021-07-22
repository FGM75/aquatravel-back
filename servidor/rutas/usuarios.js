require("dotenv").config();
const debug = require("debug")("api-aquatravel:servidor");
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  crearUsuario,
  loginUsuario,
} = require("../../db/controladores/usuarios");

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
    res.status(201).json({ token });
  } else {
    const nuevoError = new Error("Credenciales incorrectas");
    nuevoError.codigo = 403;
    next(nuevoError);
  }
});
router.post("/login", async (req, res, next) => {
  const { usuario, contrasenya } = req.body;
  try {
    const idUsuario = await loginUsuario(usuario, contrasenya);
    const token = jwt.sign({ idUsuario }, process.env.SECRET_JWT, {
      expiresIn: "2d",
    });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
