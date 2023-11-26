import express from "express";
import * as commands from "../commands";
import * as tables from "../tables";
import { ComandoSQL } from "../interfaces";
import * as validadores from "../validadores";
const router = express.Router();



router.get("/listarAeronaves", async(req,res)=>{
  await commands.listarDados("AERONAVE","rowsToAeronaves", res);
});

router.put("/inserirAeronave", async (req, res) => {
    const insert: tables.Aeronave = req.body as tables.Aeronave;
    const cmdInsert =`INSERT INTO AERONAVE 
                      (anoFabricacao, idModelo) 
                      VALUES 
                      (:1, :2 )`;
    const dados = [insert.anoFabricacao, insert.idModelo];
    const comandoSQL: ComandoSQL<string | undefined> = { sql: cmdInsert, dados: [String(dados)]};
    await commands.inserirDados(comandoSQL, res, () => validadores.aeronaveValida(insert));
});


router.delete("/excluirAeronave", async (req, res) => {
    const comandoSQL: ComandoSQL<number> = { sql: `DELETE AERONAVE WHERE idAeronave = :1`, dados: [req.body.idAeronave as number]};
    await commands.excluirDados(comandoSQL, res);
  });       

export default router;
