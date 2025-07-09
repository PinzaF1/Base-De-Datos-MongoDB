import mongoose from "mongoose";

const administradorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  tipoDeDocumento: { type: String, required: true },
  numeroIdentidad: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  institucionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "instituciones",
    required: true
  }
}, { timestamps: true });

export const Administradores = mongoose.model("administradores", administradorSchema);
