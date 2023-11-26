import express from "express";
import * as commands from "../commands";
import * as tables from "../tables";
import { ComandoSQL } from "../interfaces";
import * as validadores from "../validadores";
import * as conversoes from "../conversoes";

const router = express.Router();


router.get("/listarFabricantes", async(req,res)=>{
    await commands.listarDados("FABRICANTE","rowsToFabricante", res);
});
  

router.put("/inserirFabricante", async (req, res) => {
    const insert: tables.Fabricante = req.body as tables.Fabricante;
    const cmdInsert =` INSERT INTO FABRICANTE 
                       (NOMEFABRICANTE) 
                       VALUES 
                       (:1)`;
    const dados = [insert.nomeFabricante];
    const comandoSQL: ComandoSQL<string | undefined> = { sql: cmdInsert, dados: [String(dados)], };
    await commands.inserirDados(comandoSQL, res, () => validadores.fabricanteValida(insert));
});
  
router.delete("/excluirFabricante", async (req, res) => {
    const comandoSQL: ComandoSQL<number> = { sql:`DELETE FABRICANTE WHERE idFabricante = :1`, dados: [req.body.idFabricante as number]};
    await commands.excluirDados(comandoSQL, res);
  });       
  
export default router;