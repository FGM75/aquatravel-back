require("dotenv").config();
const admin = require("firebase-admin");
const debug = require("debug")("api-aquatravel:servidor");
const multer = require("multer");
const path = require("path");
const express = require("express");

const router = express.Router();
const serviceAccount = require("../../aquatravel-f70b5-firebase-adminsdk-pjln1-902ac51699.json"); // JSON descargado desde Firebase
const { getDatosAPIOpenData } = require("../../api/APIOpenData");
const { listarPunto, crearPunto } = require("../../db/controladores/puntos");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "aquatravel-f70b5.appspot.com", // Nombre de vuestro bucket
  });
} else {
  admin.app(); // if already initialized, use that one
}

const bucket = admin.storage().bucket();
const upload = multer();

router.post("/nuevo-punto", upload.single("imagen"), async (req, res, next) => {
  // Obtenemos toda la info de req.body
  try {
    const {
      nombre,
      provincia,
      comunidad,
      tipoPunto,
      latitud,
      longitud,
      descripcion,
    } = req.body;
    const parameters = {
      nombre,
      provincia,
      comunidad,
      tipoPunto,
      latitud,
      longitud,
      descripcion,
    };
    parameters.urls = [];
    const nombreArchivo = `${path.basename(
      req.file.originalname,
      path.extname(req.file.originalname)
    )}_${Date.now()}${path.extname(req.file.originalname)}`;
    const datos = bucket.file(nombreArchivo);
    const existe = await datos.exists();
    if (existe[0]) {
      // Capturamos y manejamos el error
      const nuevoError = new Error("El archivo ya existe!");
      nuevoError.codigo = 400;
      return next(nuevoError);
    }
    const ficheroFB = datos.createWriteStream({ resumable: false });
    ficheroFB.end(req.file.buffer);
    ficheroFB.on("error", (err) => {
      // Capturamos y manejamos el error
      const nuevoError = new Error(err.message);
      nuevoError.codigo = 400;
      return next(nuevoError);
    });
    ficheroFB.on("finish", async () => {
      // El archivo se ha subido correctamente
      // La url:      console.log(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${datos.name}?alt=media`);
      console.log("Archivo guardado en FireBase");
      // console.log(
      //   `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${datos.name}?alt=media`
      // );
      parameters.urls.push(
        `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${datos.name}?alt=media`
      );
      const puntoCreado = await crearPunto(parameters);
      res.status(201).json(puntoCreado);
    });
  } catch (err) {
    next(err);
  }
});
router.use(express.json());
router.get("/listado", async (req, res, next) => {
  try {
    const featuresAPIOPENDATA = await getDatosAPIOpenData();
    const puntosBBDD = await listarPunto();
    const serviciosPuntos = featuresAPIOPENDATA.map(
      ({
        attributes: {
          Nombre,
          Comunidad_,
          Provincia,
          Descripci,
          Grado_ocup: GradoOcupacion,
          Bandera_az: BanderaAzul,
          Form_de_a: FormaAcceso,
          Zona_Surf: ZonaSurf,
          Nudismo,
          Duchas,
        },
      }) => ({
        Nombre,
        Comunidad_,
        Provincia,
        Descripci,
        Grado_ocup: GradoOcupacion,
        Bandera_az: BanderaAzul,
        Form_de_a: FormaAcceso,
        Zona_Surf: ZonaSurf,
        Nudismo,
        Duchas,
      })
    );
    const listadoPuntos = puntosBBDD.map((punto) => {
      const subResultado = serviciosPuntos.find(
        (servicio) =>
          servicio.Nombre.toLowerCase() === punto.nombre.toLowerCase() &&
          servicio.Provincia.toLowerCase() === punto.provincia.toLowerCase()
      );
      if (subResultado) {
        const {
          Grado_ocup: GradoOcupacion,
          Bandera_az: BanderaAzul,
          Zona_Surf: ZonaSurf,
          Nudismo,
          Duchas,
        } = subResultado;
        return {
          ...punto.toObject(),
          GradoOcupacion,
          BanderaAzul,
          ZonaSurf,
          Nudismo,
          Duchas,
        };
      } else {
        return punto;
      }
    });
    res.json(listadoPuntos);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
