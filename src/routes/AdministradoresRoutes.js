import express from "express";
import { Administradores } from "../models/AdministradoresModel.js";
import { Instituciones } from "../models/InstitucionesModel.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { nombre, apellido, tipoDeDocumento, numeroIdentidad, email, password, institucionId } = req.body;

    const institucionExiste = await Instituciones.findById(institucionId);
    if (!institucionExiste) {
      return res.status(400).json({ mensaje: "La institución no existe" });
    }

    const nuevoAdmin = await Administradores.create({
      nombre,
      apellido,
      tipoDeDocumento,
      numeroIdentidad,
      email,
      password,
      institucionId
    });

    res.status(201).json({ mensaje: "Administrador creado correctamente", administrador: nuevoAdmin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const administradores = await Administradores.find().populate("institucionId", "nombre region direccion");
    res.json(administradores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const admin = await Administradores.findById(req.params.id).populate("institucionId", "nombre");
    if (!admin) return res.status(404).json({ mensaje: "Administrador no encontrado" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Administradores.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Administrador no encontrado" });
    res.json({ mensaje: "Administrador eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
