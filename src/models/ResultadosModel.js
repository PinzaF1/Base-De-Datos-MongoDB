import mongoose from "mongoose";

const resultadoSchema = new mongoose.Schema({
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",       // Referencia al modelo de usuarios
    required: true
  },
  idTipoPrueba: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tipo_de_prueba", // Referencia al modelo tipo_de_prueba
    required: true
  },
  puntaje: {
    type: Number,
    required: true,
    min: 0,
    max: 500               //  es este caso fue un ejemplo de 0 a 500
  },
  fechaRegistro: {
    type: Date,
    default: Date.now      // se registra automáticamente al crearse
  }
});

export const Resultados = mongoose.model("resultados", resultadoSchema);
