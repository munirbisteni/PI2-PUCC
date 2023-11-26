import express from "express";
import * as commands from "../commands";
import * as tables from "../tables";
import { ComandoSQL } from "../interfaces";
import * as validadores from "../validadores";
import * as conversoes from "../conversoes";
const router = express.Router();


router.get("/listarCidades", async(req,res)=>{
    await commands.listarDados("CIDADE", "rowsToCidades", res);
});

router.put("/inserirCidade", async (req, res) => {
    const insert: tables.Cidade = req.body as tables.Cidade;
    const cmdInsert =` INSERT INTO CIDADE 
                      (NOMECIDADE, IDESTADO) 
                      VALUES 
                      (:1, :2)`;
    const dados = [insert.nomeCidade, insert.idEstado];
    const comandoSQL: ComandoSQL<string | undefined> = { sql: cmdInsert, dados: [String(dados)], };
    await commands.inserirDados(comandoSQL, res, () => validadores.cidadeValida(insert));
});
  
router.delete("/excluirCidade", async (req, res) => {
    const comandoSQL: ComandoSQL<number> = { sql:`DELETE CIDADE WHERE idCidade = :1`, dados: [req.body.idCidade as number]};
    await commands.excluirDados(comandoSQL, res);
});

export default router;