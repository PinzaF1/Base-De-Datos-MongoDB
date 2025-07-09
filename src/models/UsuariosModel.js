import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  tipoDeDocumento: { type: String, required: true },
  numeroIdentidadUsuario: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  institucionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "instituciones",
    required: true
  },
  gradoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "grados", 
    required: false
  }
}, { timestamps: true });

export const Usuarios = mongoose.model("usuarios", usuarioSchema);


