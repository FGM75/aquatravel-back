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
  coordenadas: {
    type: [Number],
    validate: [
      (coordenadas) => coordenadas.length === 2,
      "Deben introducirse dos coordenadas",
    ],
    required: true,
  },
  servicios: {
    type: [Schema.Types.ObjectId],
    ref: "Servicio",
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
