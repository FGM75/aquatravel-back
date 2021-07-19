const { Schema, model } = require("mongoose");

const serviciosSchema = new Schema({
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
const Servicio = model("Servicio", serviciosSchema, "servicios");
module.exports = Servicio;
