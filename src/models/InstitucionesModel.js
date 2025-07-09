import mongoose from "mongoose";

const institucionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  region: { type: String, required: true }
}, { timestamps: true });

export const Instituciones = mongoose.model("instituciones", institucionSchema);
