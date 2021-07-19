require("./servidor");
const conectaMongo = require("./db");
const { iniciaServidor } = require("./servidor/init");

conectaMongo(iniciaServidor);
