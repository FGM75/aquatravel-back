const { Schema, model } = require("mongoose");

const valoracionesSchema = new Schema({
  puntuacion: {
    type: Number,
    required: false,
  },
  bandera: Boolean,
  accesibilidad: {
    type: String,
    required: true,
  },
  hosteleria: Boolean,
  lavabos: Boolean,
  duchas: Boolean,
  socorrista: Boolean,
  surf: Boolean,
  voley: Boolean,
});
const Valoracion = model("Valoracion", valoracionesSchema, "valoraciones");
module.exports = Valoracion;
