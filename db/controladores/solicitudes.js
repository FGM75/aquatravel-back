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
const crearSolicitud = async (punto) => {
  try {
    const solicitudCreada = await Solicitud.create({
      punto,
    });
    return solicitudCreada;
  } catch (err) {
    const nuevoError = new Error("No se ha podido crear la solicitud");
    console.log(err.message);
    throw err.codigo ? err : nuevoError;
  }
};
module.exports = {
  crearSolicitud,
  borrarSolicitud,
  listarSolicitudes,
};
