const { Schema, model } = require("mongoose");

const solicitudSchema = new Schema({
  id: {
    type: [Schema.Types.ObjectId],
    ref: "Usuario",
    required: true,
  },
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
});
const Solicitud = model("Solicitud", solicitudSchema, "solicitudes");
module.exports = Solicitud;
