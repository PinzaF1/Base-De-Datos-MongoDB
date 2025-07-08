import mongoose from "mongoose";

const tipoDePruebaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  fecha: {
    type: Date,
    required: true
  },
  area: {
    type: String,
    required: true,
    enum: ["Matemáticas", "Lectura Crítica", "Ciencias Naturales", "Inglés", "Sociales", "Otra"]
  },
  tipo: {
    type: String,
    required: true,
    enum: ["Inicial", "Modo Supervivencia"]
  },
  descripcion: {
    type: String,
    default: ""
  }
});

export const TipoDePrueba = mongoose.model("tipo_de_prueba", tipoDePruebaSchema);