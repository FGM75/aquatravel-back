const { Punto } = require("../modelos/Punto");

const listarPunto = async () => {
    const tipos = await Punto.find();
    return tipos;
};
const idPunto = async (idTipoPunto) => {
    const tipo = await Punto.findById(idTipoPunto);
    return tipo;
};
const crearPunto = async (tipo) => {
    const nuevoTipo = await Punto.create([{
        nombre: "",
        provincia: "",
        comunidad: "",
        coordenadas: [],
        servicios: "",
        tipoPunto: "",
        valoraciones: "",
    }]);
    return nuevoTipo;
};
const borrarPunto = async (idTipoPunto) => {
    const borrarTipo = await Punto.findByIdAndDelete(idTipoPunto);
    return borrarTipo;
};

module.exports = {
    listarPunto,
    idPunto,
    crearPunto,
};