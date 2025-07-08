import express from "express";
import multer from "multer";
import csv from "csvtojson";
import fs from "fs";
import { Usuarios } from "../models/UsuariosModel.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/csv", upload.single("archivo"), async (req, res) => {
  try {
    const path = req.file.path;
    const registros = await csv().fromFile(path);

    const nuevos = [];
    for (const usuario of registros) {
      const yaExiste = await Usuarios.findOne({ numeroIdentidadUsuario: usuario.numeroIdentidadUsuario });
      if (!yaExiste) nuevos.push(usuario);
    }

    if (nuevos.length > 0) {
      await Usuarios.insertMany(nuevos);
    }

    fs.unlinkSync(path);

    res.status(201).json({
      mensaje: "Carga masiva completada",
      totalRecibidos: registros.length,
      insertados: nuevos.length,
      duplicados: registros.length - nuevos.length
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;