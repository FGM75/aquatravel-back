const { Solicitudes } = require("../modelos/Solicitud");
const Solicitud = require("../modelos/Solicitud");
const { errorGeneral } = require("../../servidor/errores");

const listarSolicitudes = async (solicitud) => {
    const getSolicitudes = await Solicitud.find();
    if (!getSolicitudes) {
        throw errorGeneral("Error, esa solicitud no existe.");
    }
};
const borrarSolicitud = async (solicitud) => {
    const solicitudBorrada = await Solicitud.findByIdAndDelete();
    if (!solicitudBorrada) {
        throw errorGeneral("Error al borrar la solicitud");
    }
};
const crearSolicitud = async (id, usuario, provincia, comunidad, coordenadas, servicios, tipoPunto, valoraciones) => {
    const solicitudCreada = await Solicitud.create({
        id,
        usuario,
        provincia,
        comunidad,
        coordenadas,
        servicios,
        tipoPunto,
        valoraciones,
    });
    if (!solicitudCreada) {
        throw errorGeneral("Error al crear el nuevo punto");
    }
};
module.exports = {
    crearSolicitud,
    borrarSolicitud,
    listarSolicitudes,
};