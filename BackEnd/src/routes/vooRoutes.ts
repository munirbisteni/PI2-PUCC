import express from "express";
import * as commands from "../commands";
import * as tables from "../tables";
import { ComandoSQL } from "../interfaces";
import * as validadores from "../validadores";

const router = express.Router();

router.get("/listarVoos", async(req,res)=>{
    await commands.listarDados("VOO", "rowsToVoos", res);
  });
  

router.get("/listarVoosUsuarios", async(req,res)=>{
    await commands.listarDados("view_voo_usuario", "rowsToVoosUsuarios", res);
});

router.put("/inserirVoo", async (req, res) => {
    const insert: tables.Voo = req.body as tables.Voo;
    const cmdInsert =` INSERT INTO VOO 
                       (IDAERONAVE, IDTRECHO, PREVISAOCHEGADA, PREVISAOSAIDA, PRECO) 
                       VALUES 
                       (:1, :2, TO_TIMESTAMP_TZ(:3, 'YYYY-MM-DD HH24:MI:SS TZD'), TO_TIMESTAMP_TZ(:4, 'YYYY-MM-DD HH24:MI:SS TZD'), :5)`;
    
    const dados = [insert.idAeronave, insert.idTrecho, insert.previsaoChegada+' -03:00' , insert.previsaoSaida+' -03:00', Number(insert.preco)];
    console.log(dados);
    const comandoSQL: ComandoSQL<string | undefined> = { sql: cmdInsert, dados: [String(dados)], };
    await commands.inserirDados(comandoSQL, res, () => validadores.vooValido(insert));
  });

  router.delete("/excluirVoo", async (req, res) => {
    const comandoSQL: ComandoSQL<number> = { sql: `DELETE VOO WHERE idVoo = :1`, dados: [req.body.idVoo as number]};
    await commands.excluirDados(comandoSQL, res);
   });
         
   
export default router;