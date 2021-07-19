const { Schema, model } = require("mongoose");

const favoritoSchema = new Schema({
    id: {
        type: String,
        requiere: true,
    },
    creadoId: {
        type: [Schema.Types.ObjectId],
        ref:"Usuarios"
    }},
    {
        timestamps: true,
    }
);
const Favorito = model("Favorito", favoritoSchema, "favoritos" );
module.exports = Favorito;