const { Schema, model } = require("mongoose");

const comentariosSchema = new Schema({
  contenido: {
    type: String,
    require: false,
  },
  usuarioId: {
    type: [Schema.Types.ObjectId],
    ref: "Usuarios",
    requiere: true,
  },
});
const Comentario = model("Comentario", comentariosSchema, "comentarios");
module.exports = Comentario;
