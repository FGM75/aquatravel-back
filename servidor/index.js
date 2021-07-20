require("dotenv").config();
const debug = require("debug")("api-aquatravel:servidor:principal");
const cors = require("cors");
const morganFreeman = require("morgan");
const { error404, errorGeneral } = require("./errores");
const rutasPuntos = require("./rutas/puntos");
const { app } = require("./init");

app.use(morganFreeman("dev"));
app.use(cors());

// app.use(express.json());
app.use("/puntos", rutasPuntos);

app.use(errorGeneral);
app.use(error404);
