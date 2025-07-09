import mongoose from "mongoose";

const gradoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
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
  institucionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "instituciones",
    required: true
  }
}, { timestamps: true });

export const Grados = mongoose.model("grados", gradoSchema);

