import mongoose from "mongoose";

const institucionSchema = new mongoose.Schema({
  Nombre: { type: String, required: true },
  Apellido: { type: String, required: true },
  TipoDeDocumento: { type: String, required: true }, 
  NumeroIdentidadUsuario: { type: String, required: true, unique: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Direccion: { type: String, required: true },
  Institucion: { type: String, required: true }
});

export const Instituciones = mongoose.model("instituciones", institucionSchema);