const Provincia = require("../modelos/Provincia");

const listarProvincias = async (id) => {
  try {
    const provincias = await Provincia.find({ idComunidad: id });
    if (provincias.length === 0) {
      const nuevoError = new Error(
        "No hay ningúna provincia en la base de datos."
      );
      nuevoError.codigo = 404;
      throw nuevoError;
    }
    return provincias;
  } catch (err) {
    const nuevoError = new Error(
      "No se ha podido obtener el listado de provincias"
    );
    throw err.codigo ? err : nuevoError;
  }
};
module.exports = {
  listarProvincias,
};
