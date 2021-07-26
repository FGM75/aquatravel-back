const { Schema, model } = require("mongoose");

const provinciasSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  idComunidad: {
    type: String,
    required: true,
  },
});
const Provincia = model("Provincia", provinciasSchema, "provincias");
module.exports = Provincia;
