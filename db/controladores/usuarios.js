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
const crearUsuario = async (usuario, contrasenya, email, tokenVerificacion) => {
  try {
    const contrasenyaEncriptada = await bcrypt.hash(contrasenya, 10);
    const nuevoUsuario = await Usuario.create({
      usuario,
      contrasenya: contrasenyaEncriptada,
      email,
      confirmationCode: tokenVerificacion,
    });

    return nuevoUsuario._id;
  } catch (err) {
    const nuevoError = new Error("No se ha podido crear el usuario");
    console.log(err.message);
    throw err.codigo ? err : nuevoError;
  }
};
const loginUsuario = async (usuario, contrasenya) => {
  try {
    const usuarioEncontrado = await Usuario.findOne({
      usuario,
    });
    if (!usuarioEncontrado) {
      const nuevoError = new Error("Credenciales incorrectas");
      nuevoError.codigo = 403;
      throw nuevoError;
    }
    const contrasenyaCoincide = await bcrypt.compare(
      contrasenya,
      usuarioEncontrado.contrasenya
    );
    if (!contrasenyaCoincide) {
      const nuevoError = new Error("Credenciales incorrectas");
      nuevoError.codigo = 403;
      throw nuevoError;
    }
    if (usuarioEncontrado.status !== "Active") {
      const nuevoError = new Error(
        "Cuenta pendiente. Porfavor verifica tu email!"
      );
      nuevoError.codigo = 401;
      throw nuevoError;
    }
    return usuarioEncontrado._id;
  } catch (err) {
    const nuevoError = new Error(
      "No se han podido comprobar las credenciales del usuario"
    );
    throw err.codigo ? err : nuevoError;
  }
};
const confirmarUsuario = async ({ confirmationCode }) => {
  try {
    const confirmado = await Usuario.updateOne(
      {
        confirmationCode,
      },
      { status: "Active" }
    );
    if (confirmado.ok !== 1) {
      const nuevoError = new Error("Usuario no encontrado");
      nuevoError.codigo = 403;
      throw nuevoError;
    }
    const usuarioConfirmado = await Usuario.findOne({ confirmationCode });
    return usuarioConfirmado._id;
  } catch (err) {
    const nuevoError = new Error("No se ha podido confirmar el usuario");
    throw err.codigo ? err : nuevoError;
  }
};
const getUsuario = async (id) => {
  console.log(id);
  const usuario = await Usuario.findById(id);
  return usuario;
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
  loginUsuario,
  modificarUsuario,
  borrarUsuario,
  confirmarUsuario,
  getUsuario,
};
