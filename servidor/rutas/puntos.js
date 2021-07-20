require("dotenv").config();
const admin = require("firebase-admin");
const debug = require("debug")("api-aquatravel:servidor");
const multer = require("multer");
const path = require("path");
const express = require("express");
// const { loginUsuario, crearUsuario } = require("../../db/controladores/puntos");
const router = express.Router();
const serviceAccount = require("../../aquatravel-f70b5-firebase-adminsdk-pjln1-902ac51699.json"); // JSON descargado desde Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "aquatravel-f70b5.appspot.com", // Nombre de vuestro bucket
});

const bucket = admin.storage().bucket();
const upload = multer();

router.post("/nuevo-punto", upload.single("imagen"), async (req, res, next) => {
  const nombreArchivo = `${path.basename(
    req.file.originalname,
    path.extname(req.file.originalname)
  )}_${Date.now()}${path.extname(req.file.originalname)}`;
  const datos = bucket.file(nombreArchivo);
  const existe = await datos.exists();
  if (existe[0]) {
    // Capturamos y manejamos el error
    console.log("El archivo ya existe");
    return;
  }
  const ficheroFB = datos.createWriteStream({ resumable: false });
  ficheroFB.end(req.file.buffer);
  ficheroFB.on("error", (err) => {
    // Capturamos y manejamos el error
    console.log(err.message);
  });
  ficheroFB.on("finish", () => {
    // El archivo se ha subido correctamente
    // La url:      console.log(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${datos.name}?alt=media`);
    console.log("Archivo guardado en FireBase");
    console.log(
      `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${datos.name}?alt=media`
    );
  });
  res.send("Punto registrado");
});

module.exports = router;
