const { Comentario } = require("../modelos/Comentario");

const listarComentariosByID = async () => {
    const comentarios = await Comentario.findById();
    return comentarios;
};

const eliminarComentario = async (idComentario) => {
    const eliminarComent = await Comentario.findByIdAndDelete(idComentario)
    return eliminarComent;
};

const modificarComentario = async (idComentario) => {
    try {
        const modificado = await Comentario.findByIdAndUpdate(
            { contenido: modificado },
            idComentario);
        retrun modificado;
    } catch (err) {
        const nuevoError = new Error("No se ha podido editar el comentario");
        console.log(err.message);
        throw err.codigo ? err : nuevoError;
    }
};

const buscarComentario = async () => {
    const comentarioBuscado = Comentario.findOne();
    return comentarioBuscado;
};