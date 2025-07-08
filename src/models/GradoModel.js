import mongoose from "mongoose";

const gradoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true   // elimina espacios antes y después
  },
  nivel: {
    type: String,
    required: true,
    enum: ["Básica Secundaria", "Media Académica"]
  },
  estado: {
    type: String,
    default: "Activo",
    enum: ["Activo", "Inactivo"]
  },
  estudiantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",
    required: false
  }],
  institucion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "instituciones",
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

export const Grados = mongoose.model("grados", gradoSchema);
