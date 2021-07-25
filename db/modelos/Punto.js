const { Schema, model } = require("mongoose");

const PuntoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  provincia: {
    type: String,
    required: true,
  },
  comunidad: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  latitud: {
    type: String,
    required: true,
  },
  longitud: {
    type: String,
    required: true,
  },
  tipoPunto: {
    type: String,
    required: true,
  },
  valoraciones: {
    type: [Schema.Types.ObjectId],
    ref: "Valoracion",
  },
  comentarios: {
    type: [Schema.Types.ObjectId],
    ref: "Comentario",
  },
  urls: [String],
});

const Punto = model("Punto", PuntoSchema, "puntos");

module.exports = Punto;
