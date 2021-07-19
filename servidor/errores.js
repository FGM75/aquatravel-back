const errorServidor = (err, puerto) => {
  console.log("No se ha podido iniciar el servidor");
  if (err.code === "EADDRINUSE") {
    console.log(`El puerto ${puerto} está ocupado`);
  }
};

const error404 = (req, res, next) => {
  res.status(404).json({ error: true, mensaje: "Ruta no encontrada" });
};

const errorGeneral = (err, req, res, next) => {
  const codigo = err.codigo || 500;
  const mensaje = err.codigo ? err.message : "Error general";
  res.status(codigo).json({ error: true, mensaje });
};

module.exports = {
  errorServidor,
  error404,
  errorGeneral,
};
