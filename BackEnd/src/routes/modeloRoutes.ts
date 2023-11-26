import express from "express";
import * as commands from "../commands";
import * as tables from "../tables";
import { ComandoSQL } from "../interfaces";
import * as validadores from "../validadores";
import * as conversoes from "../conversoes";

const router = express.Router();


router.get("/listarModelos", async(req,res)=>{
    await commands.listarDados("MODELO","rowsToModelos",res);
  });

router.put("/inserirModelo", async (req, res) => {
    const insert: tables.Modelo = req.body as tables.Modelo;
    const cmdInsert =`INSERT INTO MODELO 
                      (NOMEMODELO, IDFABRICANTE, FILEIRAS, COLUNAS) 
                      VALUES 
                      (:1, :2, :3, :4)`;
    const dados = [insert.nomeModelo, insert.idFabricante, insert.fileiras, insert.colunas];
    const comandoSQL: ComandoSQL<string | undefined> = { sql: cmdInsert, dados: [String(dados)], };
    await commands.inserirDados(comandoSQL, res, () => validadores.modeloValido(insert));
});

router.delete("/excluirModelo", async (req, res) => {
    const comandoSQL: ComandoSQL<number> = { sql: `DELETE Modelo WHERE idModelo = :1`, dados: [req.body.idModelo as number]};
    await commands.excluirDados(comandoSQL, res);
  });       

export default router;