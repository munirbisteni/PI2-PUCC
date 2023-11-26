import express from "express";
import * as commands from "../commands";
import * as tables from "../tables";
import { ComandoSQL } from "../interfaces";
import * as validadores from "../validadores";
import * as conversoes from "../conversoes";


const router = express.Router();
router.get("/listarEstados", async(req,res)=>{
    await commands.listarDados("ESTADO","rowsToEstados", res);
  });

router.put("/inserirEstado", async (req, res) => {
    const insert: tables.Estado = req.body as tables.Estado;
    const cmdInsert =` INSERT INTO ESTADO 
                      (NOMEESTADO, SIGLAESTADO) 
                      VALUES 
                      (:1, :2)`;
    const dados = [insert.nomeEstado, insert.siglaEstado];
    const comandoSQL: ComandoSQL<string | undefined> = { sql: cmdInsert, dados: [String(dados)], };
    await commands.inserirDados(comandoSQL, res, () => validadores.estadoValido(insert));
});

router.delete("/excluirEstado", async (req, res) => {
    console.log("requestExcluir")
    const comandoSQL: ComandoSQL<number> = { sql: `DELETE ESTADO WHERE idEstado = :1`, dados: [req.body.idEstado as number]};
    await commands.excluirDados(comandoSQL, res);
});

export default router;