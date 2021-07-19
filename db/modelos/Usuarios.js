const { Schema, model, SchemaType } = require("mongoose");

const UsuarioShema = new Schema({
    usuario: {
        type: String,
        unique: true,
        required: true,
    },
    constrasenya: {
        type: String,
        minLength: 6,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    favoritos: {
        type: [Schema.Types.ObjectId],
        ref: "Punto",
    },
    comentarios: {
        type: [Schema.Type.ObjectId],
        ref: "Comentario"
    },
});
const Usuario = model("Usuario", UsuarioShema, "usuarios");
module.exports = Usuario;