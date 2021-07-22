const bcrypt = require("bcrypt");
const { errorGeneral } = require("../../servidor/errores");
const Usuario = require("../modelos/Usuarios");
const { Usuarios } = require("../modelos/Usuarios");

const existeUsuarioRepetido = async (usuario) => {
  const usuarioRepetido = await Usuario.findOne({ usuario });
  if (!usuarioRepetido) {
    throw errorGeneral("Error al crear tu usuario, o ya existe.");
  }
};
const existeEmailUsuarioRepetido = async (email) => {
  const usuarioRepetido = await Usuario.findOne({ email });
  if (!usuarioRepetido) {
    throw errorGeneral("Error al crear tu usuario, o el email ya existe.");
  }
};
const listarUsuarioId = async (usuario) => {
  const usuarioRepetido = await Usuario.findById(usuario);
  if (!usuarioRepetido) {
    throw errorGeneral("Existe tu nombre usuario");
  }
  return usuarioRepetido;
};
const listarUsuarioEmail = async (email) => {
  const usuarioRepetido = await Usuario.findOne({ email });
  if (!usuarioRepetido) {
    throw errorGeneral("Existe tu email");
  }
  return usuarioRepetido;
};
const crearUsuario = async (usuario, contrasenya, email) => {
  try {
    const contrasenyaEncriptada = await bcrypt.hash(contrasenya, 10);
    const nuevoUsuario = await Usuario.create({
      usuario,
      contrasenya: contrasenyaEncriptada,
      email,
    });
    return nuevoUsuario._id;
  } catch (err) {
    const nuevoError = new Error("No se ha podido crear el usuario");
    console.log(err.message);
    throw err.codigo ? err : nuevoError;
  }
};
const modificarUsuario = async (usuario) => {
  try {
    const usuarioModificado = await Usuario.updateOne(
      { _id: usuarioModificado },
      usuario
    );
    return usuarioModificado;
  } catch (err) {
    const nuevoError = new Error("No se ha podido editar el tipo");
    console.log(err.message);
    throw err.codigo ? err : nuevoError;
  }
};
const borrarUsuario = async (usuario) => {
  const usuarioBorrado = await Usuario.findByIdAndDelete(usuario);
  if (!usuarioBorrado) {
    throw errorGeneral("El usuario no se ha podido borrar");
  }

};

module.exports = {
  listarUsuarioEmail,
  listarUsuarioId,
  existeEmailUsuarioRepetido,
  existeUsuarioRepetido,
  crearUsuario,
  modificarUsuario,
  borrarUsuario,
};
