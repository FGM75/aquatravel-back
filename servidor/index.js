require("dotenv").config();
const debug = require("debug")("api-aquatravel:servidor:principal");
const cors = require("cors");
const morganFreeman = require("morgan");
const { error404, errorGeneral } = require("./errores");
const rutasPuntos = require("./rutas/puntos");
const rutasSolicitudes = require("./rutas/solicitudes");
const rutasUsuarios = require("./rutas/usuarios");
const { app } = require("./init");

app.use(morganFreeman("dev"));
app.use(cors());

// app.use(express.json());
app.use("/puntos", rutasPuntos);
app.use("/solicitudes", rutasSolicitudes);
app.use("/usuarios", rutasUsuarios);
app.use(errorGeneral);
app.use(error404);
