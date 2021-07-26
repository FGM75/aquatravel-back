const { Schema, model } = require("mongoose");

const solicitudSchema = new Schema({
  idUsuario: {
    type: Schema.Types.ObjectId,
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
  urls: [String],
});
const Solicitud = model("Solicitud", solicitudSchema, "solicitudes");
module.exports = Solicitud;
