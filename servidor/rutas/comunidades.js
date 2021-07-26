const express = require("express");

const { listarComunidades } = require("../../db/controladores/comunidades");

const router = express.Router();
router.get("/listado", async (req, res, next) => {
  try {
    const comunidades = await listarComunidades();
    res.json(comunidades);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
