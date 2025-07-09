import express from "express";
import { TipoDePrueba } from "../models/TipoDePruebaModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const nueva = await TipoDePrueba.create(req.body);
    res.status(201).json({ mensaje: "Tipo de prueba registrada correctamente", prueba: nueva });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const pruebas = await TipoDePrueba.find();
    res.json(pruebas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const prueba = await TipoDePrueba.findById(req.params.id);
    if (!prueba) return res.status(404).json({ mensaje: "Tipo de prueba no encontrada" });
    res.json(prueba);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const actualizada = await TipoDePrueba.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ mensaje: "No encontrada" });
    res.json({ mensaje: "Actualizada correctamente", prueba: actualizada });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const eliminada = await TipoDePrueba.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ mensaje: "no encontrada" });
    res.json({ mensaje: "Tipo de prueba eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } });

  export default router;