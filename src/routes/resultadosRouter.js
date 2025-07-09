import express from "express";
import { Resultados } from "../models/ResultadosModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const resultado = await Resultados.create(req.body);
    res.status(201).json({ mensaje: "Resultado registrado correctamente", resultado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const resultados = await Resultados.find()
      .populate("idUsuario", "nombre apellido institucion email")
      .populate("idTipoPrueba", "nombre tipo area fecha");
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/usuario/:id", async (req, res) => {
  try {
    const resultados = await Resultados.find({ idUsuario: req.params.id })
      .populate("idTipoPrueba", "nombre tipo area fecha");
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/tipo/:id", async (req, res) => {
  try {
    const resultados = await Resultados.find({ idTipoPrueba: req.params.id })
      .populate("idUsuario", "nombre apellido institucion email");
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Resultados.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ mensaje: "Resultado no encontrado" });
    res.json({ mensaje: "Resultado actualizado", resultado: actualizado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Resultados.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "Resultado no encontrado" });
    res.json({ mensaje: "Resultado eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
