const { Schema, model } = require("mongoose");

const comentariosSchema = new Schema({
  contenido: {
    type: String,
    required: false,
  },
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  timestamp: true,
});
const Comentario = model("Comentario", comentariosSchema, "comentarios");
module.exports = Comentario;
