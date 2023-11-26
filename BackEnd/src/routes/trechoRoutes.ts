import express from "express";
import * as commands from "../commands";
import * as tables from "../tables";
import { ComandoSQL } from "../interfaces";
import * as validadores from "../validadores";
import * as conversoes from "../conversoes";

const router = express.Router();
router.get("/listarTrechos", async(req,res)=>{
    await commands.listarDados("TRECHO","rowsToTrechos", res);
  });

router.put("/inserirTrecho", async (req, res) => {
    const insert: tables.Trecho = req.body as tables.Trecho;
    const cmdInsert =` INSERT INTO TRECHO 
                       (IDCIDADECHEGADA, IDCIDADESAIDA) 
                       VALUES 
                       (:1, :2)`;
    const dados = [insert.idCidadeChegada, insert.idCidadeSaida];
    const comandoSQL: ComandoSQL<string | undefined> = { sql: cmdInsert, dados: [String(dados)], };
    await commands.inserirDados(comandoSQL, res, () => validadores.trechoValido(insert));
});

router.delete("/excluirTrecho", async (req, res) => {
    const comandoSQL: ComandoSQL<number> = { sql: `DELETE TRECHO WHERE idTrecho = :1`, dados: [req.body.idTrecho as number]};
    await commands.excluirDados(comandoSQL, res);
  });
  
  
export default router;