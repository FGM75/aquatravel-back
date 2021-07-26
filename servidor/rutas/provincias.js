const express = require("express");

const { listarProvincias } = require("../../db/controladores/provincias");

const router = express.Router();
router.get("/listado/:idComunidad", async (req, res, next) => {
  const { idComunidad } = req.params;
  try {
    const provincias = await listarProvincias(idComunidad);
    res.json(provincias);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
