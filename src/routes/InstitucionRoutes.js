import express from "express";
import { Instituciones } from "../models/InstitucionesModel.js";
import { Usuarios } from "../models/UsuariosModel.js"; 

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const existe = await Usuarios.findOne({ numeroIdentidadUsuario: req.body.NumeroIdentidadUsuario });
    if (existe) return res.status(400).json({ mensaje: "El usuario ya existe" });

    const usuario = await Usuarios.create(req.body);
    res.status(201).json({ mensaje: "Usuario registrado correctamente", usuario });
  } catch (error) {
    console.error("🔴 ERROR:", error.message);
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const instituciones = await Instituciones.find();
    res.json(instituciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const institucion = await Instituciones.findOne({ NumeroIdentidadAdministrador: req.params.id });
    if (!institucion) {
      return res.status(404).json({ mensaje: "Institución no encontrada" });
    }
    res.json(institucion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/region/:region", async (req, res) => {
  try {
    const regionBuscada = req.params.region;
    const instituciones = await Instituciones.find({ Region: regionBuscada });

    if (!instituciones || instituciones.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron instituciones en esa región" });
    }

    res.json(instituciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const institucion = await Instituciones.findOneAndUpdate(
      { NumeroIdentidadAdministrador: req.params.id },
      req.body,
      { new: true }
    );
    if (!institucion) {
      return res.status(404).json({ mensaje: "Institución no encontrada" });
    }
    res.json({
      mensaje: "Institución actualizada correctamente",
      institucion
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const institucion = await Instituciones.findOneAndDelete({ NumeroIdentidadAdministrador: req.params.id });
    if (!institucion) {
      return res.status(404).json({ mensaje: "Institución no encontrada" });
    }
    res.json({ mensaje: "Institución eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
