import mongoose from "mongoose";

const resultadoSchema = new mongoose.Schema({
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",       
    required: true
  },
  idTipoPrueba: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tipo_de_prueba", 
    required: true
  },
  puntaje: {
    type: Number,
    required: true,
    min: 0,
    max: 500               
  },
  fechaRegistro: {
    type: Date,
    default: Date.now      
  }
});

export const Resultados = mongoose.model("resultados", resultadoSchema);
