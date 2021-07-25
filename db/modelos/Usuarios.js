const { Schema, model } = require("mongoose");

const UsuarioShema = new Schema({
  usuario: {
    type: String,
    unique: true,
    required: true,
  },
  contrasenya: {
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
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
});
const Usuario = model("Usuario", UsuarioShema, "usuarios");
module.exports = Usuario;
