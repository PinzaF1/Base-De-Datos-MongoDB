import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import usuariosRoutes from "./routes/UsuariosRoutes.js";
import institucionesRoutes from "./routes/InstitucionRoutes.js";
import tipoDePruebaRoutes from "./routes/tipoDePruebaRouter.js";
import resultadosRoutes from "./routes/resultadosRouter.js";
import gradosroutes from "./routes/GradoRouter.js";
import cargaUsuariosRoutes from "./routes/CargaUsuariosRouter.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URI;

app.use(express.json());

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/instituciones", institucionesRoutes);
app.use("/api/tipos-de-prueba", tipoDePruebaRoutes);
app.use("/api/resultados", resultadosRoutes);
app.use("/api/grados", gradosroutes);
app.use("/api/carga-usuarios", cargaUsuariosRoutes); 

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
