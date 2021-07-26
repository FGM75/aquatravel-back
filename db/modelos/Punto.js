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
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
});

const Punto = model("Punto", PuntoSchema, "puntos");

module.exports = Punto;
