const { Schema, model } = require("mongoose");

const comunidadesSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});
const Comunidad = model("Comunidad", comunidadesSchema, "comunidades");
module.exports = Comunidad;
