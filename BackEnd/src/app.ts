import express from "express";
import cors from "cors";

import aeronaveRoutes from "./routes/aeronaveRoutes";
import modeloRoutes from "./routes/modeloRoutes";
import trechoRoutes from "./routes/trechoRoutes";
import vooRoutes from "./routes/vooRoutes"; 
import fabricanteRoutes from "./routes/fabricanteRoutes";
import estadoRoutes from "./routes/estadoRoutes"; 
import cidadeRoutes from "./routes/cidadeRoutes"; 
const app  = express();
const port =      3000;

app.use(express.json());
app.use(cors());

app.use("/aeronaves", aeronaveRoutes);
app.use("/modelos", modeloRoutes);
app.use("/trechos", trechoRoutes);
app.use("/voos", vooRoutes);
app.use("/fabricantes", fabricanteRoutes); 
app.use("/estados", estadoRoutes); 
app.use("/cidades", cidadeRoutes); 

app.listen(port, ()=>{
    console.log("HTTP SERVER STARTED ON localhost:" + port );
});

