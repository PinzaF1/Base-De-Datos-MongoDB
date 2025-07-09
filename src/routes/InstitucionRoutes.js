import express from "express";
import { Instituciones } from "../models/InstitucionesModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const nueva = await Instituciones.create(req.body);
    res.status(201).json({ mensaje: "Institución registrada correctamente", institucion: nueva });
  } catch (error) {
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
    const institucion = await Instituciones.findById(req.params.id);
    if (!institucion) return res.status(404).json({ mensaje: "Institución no encontrada" });

    res.json(institucion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/region/:region", async (req, res) => {
  try {
    const region = req.params.region;
    const instituciones = await Instituciones.find({ region });

    if (!instituciones.length) {
      return res.status(404).json({ mensaje: "No se encontraron instituciones en esa región" });
    }

    res.json(instituciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const institucion = await Instituciones.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!institucion) return res.status(404).json({ mensaje: "Institución no encontrada" });

    res.json({ mensaje: "Institución actualizada correctamente", institucion });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const institucion = await Instituciones.findByIdAndDelete(req.params.id);
    if (!institucion) return res.status(404).json({ mensaje: "Institución no encontrada" });

    res.json({ mensaje: "Institución eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
