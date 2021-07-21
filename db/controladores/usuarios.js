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
    const usuarioRepetido = await Usuario.findOne({email});
    if (!usuarioRepetido) {
        throw errorGeneral("Existe tu email");
    }
    return usuarioRepetido;
};
module.export = {
    listarUsuarioEmail,
    listarUsuarioId,
    existeEmailUsuarioRepetido,
    existeUsuarioRepetido,
};