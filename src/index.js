import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import usuariosRoutes from "./routes/UsuariosRoutes.js";
import institucionesRoutes from "./routes/InstitucionRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

app.use(express.json());

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/instituciones", institucionesRoutes);

app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

mongoose.connect(URI)
  .then(() => {
    console.log("Conectado a MongoDB Atlas");
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error("Error conectando a MongoDB:", err.message);
    process.exit(1);
  });