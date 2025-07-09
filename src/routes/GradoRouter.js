import express from "express";
import { Grados } from "../models/GradoModel.js";
import { Usuarios } from "../models/UsuariosModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const grado = await Grados.create(req.body);
    res.status(201).json({ mensaje: "Grado creado", grado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const grados = await Grados.find()
      .populate("institucionId", "nombre direccion region");

    const gradosConEstudiantes = await Promise.all(grados.map(async (grado) => {
      const estudiantes = await Usuarios.find(
        { gradoId: grado._id },
        "nombre apellido tipoDeDocumento numeroIdentidadUsuario email"
      );
      return {
        ...grado.toObject(),
        estudiantes
      };
    }));

    res.json(gradosConEstudiantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const grado = await Grados.findById(req.params.id)
      .populate("institucionId", "nombre direccion region");

    if (!grado) return res.status(404).json({ mensaje: "Grado no encontrado" });

    const estudiantes = await Usuarios.find(
      { gradoId: grado._id },
      "nombre apellido tipoDeDocumento numeroIdentidadUsuario email"
    );

    res.json({ ...grado.toObject(), estudiantes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
