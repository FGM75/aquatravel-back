const { Schema, model } = require("mongoose");

const comentariosSchema = new Schema({
  contenido: {
    type: String,
    required: false,
  },
  usuarioId: {
    type: [Schema.Types.ObjectId],
    ref: "Usuarios",
    required: true,
  },
});
const Comentario = model("Comentario", comentariosSchema, "comentarios");
module.exports = Comentario;
