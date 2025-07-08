import express from "express";
import { Usuarios } from "../models/UsuariosModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const existe = await Usuarios.findOne({ numeroIdentidadUsuario: req.body.numeroIdentidadUsuario });
    if (existe) return res.status(400).json({ mensaje: "El usuario ya existe" });

    const nuevoUsuario = await Usuarios.create(req.body);
    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: nuevoUsuario
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuarios.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const usuario = await Usuarios.findOne({ numeroIdentidadUsuario: req.params.id });
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const usuario = await Usuarios.findOneAndUpdate(
      { numeroIdentidadUsuario: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.status(200).json({
      mensaje: "Usuario actualizado correctamente",
      usuario
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const usuario = await Usuarios.findOneAndDelete({ numeroIdentidadUsuario: req.params.id });
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
