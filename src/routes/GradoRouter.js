import express from "express";
import { Grados } from "../models/GradoModel.js";

const router = express.Router();

// Crear grado
router.post("/", async (req, res) => {
  try {
    const grado = await Grados.create(req.body);
    res.status(201).json({ mensaje: "Grado creado", grado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los grados con estudiantes e institución
router.get("/", async (req, res) => {
  try {
    const grados = await Grados.find()
      .populate({
        path: "estudiantes",
        select: "nombre apellido tipoDeDocumento numeroIdentidadUsuario"
      })
      .populate({
        path: "institucion",
        select: "Nombre Institucion"
      });
    res.json(grados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener grado por ID
router.get("/:id", async (req, res) => {
  try {
    const grado = await Grados.findById(req.params.id)
      .populate({
        path: "estudiantes",
        select: "nombre apellido tipoDeDocumento numeroIdentidadUsuario"
      })
      .populate({
        path: "institucion",
        select: "Nombre Institucion"
      });

    if (!grado) return res.status(404).json({ mensaje: "Grado no encontrado" });
    res.json(grado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
