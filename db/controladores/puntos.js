const Punto = require("../modelos/Punto");

const listarPuntosActivos = async () => {
  try {
    const puntos = await Punto.find({
      status: {
        $eq: "Active",
      },
    });
    if (puntos.length === 0) {
      const nuevoError = new Error(
        "No hay ningún punto activo en la base de datos."
      );
      nuevoError.codigo = 404;
      throw nuevoError;
    }
    return puntos;
  } catch (err) {
    const nuevoError = new Error(
      "No se ha podido obtener el listado de puntos"
    );
    throw err.codigo ? err : nuevoError;
  }
};
const listarPuntosInactivos = async () => {
  try {
    const puntos = await Punto.find({
      status: {
        $eq: "Pending",
      },
    });
    if (puntos.length === 0) {
      const nuevoError = new Error(
        "No hay ningún punto pendiente en la base de datos."
      );
      nuevoError.codigo = 404;
      throw nuevoError;
    }
    return puntos;
  } catch (err) {
    const nuevoError = new Error(
      "No se ha podido obtener el listado de puntos"
    );
    throw err.codigo ? err : nuevoError;
  }
};
const idPunto = async (idTipoPunto) => {
  const tipo = await Punto.findById(idTipoPunto);
  return tipo;
};
const crearPunto = async (punto) => {
  try {
    const nuevoPuntoBD = await Punto.create(punto);
    return nuevoPuntoBD;
  } catch (err) {
    const nuevoError = new Error("No se ha podido crear el punto");
    console.log(err.message);
    throw err.codigo ? err : nuevoError;
  }
};
const borrarPunto = async (idTipoPunto) => {
  const borrarTipo = await Punto.findByIdAndDelete(idTipoPunto);
  return borrarTipo;
};

module.exports = {
  listarPuntosActivos,
  idPunto,
  crearPunto,
  borrarPunto,
  listarPuntosInactivos,
};
