import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String },
  apellido: { type: String },
  tipoDeDocumento: { type: String, required: true },
  numeroIdentidadUsuario: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  institucion: { type: String, required: true },
  numeroIdentidadAdministrador: { type: String, required: true }
});

export const Usuarios = mongoose.model("usuarios", usuarioSchema);
