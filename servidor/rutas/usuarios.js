require("dotenv").config();
const debug = require("debug")("api-aquatravel:servidor");
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  crearUsuario,
  loginUsuario,
  confirmarUsuario,
  getUsuario,
} = require("../../db/controladores/usuarios");
const { enviarCorreo } = require("../../nodemailer/email");

const router = express.Router();
router.use(express.json());
router.post("/register", async (req, res, next) => {
  const { usuario, contrasenya, email } = req.body;
  const tokenVerificacion = jwt.sign({ email }, process.env.SECRET_JWT);
  if (!usuario || !contrasenya || !email) {
    const nuevoError = new Error("Faltan credenciales");
    nuevoError.codigo = 400;
    return next(nuevoError);
  }
  const idUsuario = await crearUsuario(
    usuario,
    contrasenya,
    email,
    tokenVerificacion
  );
  if (idUsuario) {
    const token = jwt.sign({ id: idUsuario }, process.env.SECRET_JWT, {
      expiresIn: "2m",
    });
    enviarCorreo(usuario, email, tokenVerificacion);
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
router.get("/confirmar/:confirmationCode", async (req, res, next) => {
  const confirmationCode = req.params;
  try {
    const idUsuario = await confirmarUsuario(confirmationCode);
    if (!idUsuario) {
      const nuevoError = new Error("Usuario no encontrado");
      nuevoError.codigo = 403;
      return next(nuevoError);
    }
    res.redirect(`${process.env.URL_CONFIRMED_USER}${idUsuario}`);
  } catch (err) {
    next(err);
  }
});
router.get("/usuario/:idUsuario", async (req, res, next) => {
  try {
    const { idUsuario } = req.params;
    const usuario = await getUsuario(idUsuario);
    if (!usuario) {
      const nuevoError = new Error("Usuario no encontrado");
      nuevoError.codigo = 403;
      return next(nuevoError);
    }
    res.json(usuario._id);
  } catch (err) {
    return next(err);
  }
});
module.exports = router;
