import mongoose from "mongoose";

const gradoSchema = new mongoose.Schema({
  estudiante: {
    type: String,
    required: true,
    trim: true
  },
  grado: {
    type: String,
    required: true,
    enum: ["6°", "7°", "8°", "9°", "10°", "11°"]
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
