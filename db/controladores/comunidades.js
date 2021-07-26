const Comunidad = require("../modelos/Comunidad");

const listarComunidades = async () => {
  try {
    const comunidades = await Comunidad.find();
    if (comunidades.length === 0) {
      const nuevoError = new Error(
        "No hay ningúna comunidad en la base de datos."
      );
      nuevoError.codigo = 404;
      throw nuevoError;
    }
    return comunidades;
  } catch (err) {
    const nuevoError = new Error(
      "No se ha podido obtener el listado de comunidades"
    );
    throw err.codigo ? err : nuevoError;
  }
};
const getNombreComunidad = async (id) => {
  try {
    const comunidad = await Comunidad.findOne({ id });
    if (!comunidad) {
      const nuevoError = new Error("Comunidad no encontrada.");
      nuevoError.codigo = 404;
      throw nuevoError;
    }
    return comunidad.nombre;
  } catch (err) {
    const nuevoError = new Error("No se ha podido obtener la comunidad");
    throw err.codigo ? err : nuevoError;
  }
};
module.exports = {
  listarComunidades,
  getNombreComunidad,
};
