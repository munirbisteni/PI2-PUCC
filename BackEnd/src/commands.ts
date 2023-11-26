import oracledb from "oracledb";
import { CustomResponse } from "./customResponse";
import { oraConnAttribs } from "./OracleConnAtribs";
import { ComandoSQL } from "./interfaces";
import * as convert from "./conversoes";

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export const listarDados = async(
  tableName: string,
  convertFunctionName: string,
  res: any
): Promise<void> => {
  let cr: CustomResponse = { status: "ERROR", message: "", payload: undefined };
  let connection;
  try {
    console.log("Entrando aqui! Conexão");
    connection = await oracledb.getConnection(oraConnAttribs);
    const resultadoConsulta = await connection.execute(`SELECT * FROM ${tableName}`);
    cr.status = "SUCCESS";
    cr.message = "Dados obtidos";
    const convertFunction = (convert as Record<string, convert.ConvertFunction<any>>)[convertFunctionName];
    cr.payload = (convertFunction(resultadoConsulta.rows));

  } catch (e) {
    if (e instanceof Error) {
      cr.message = e.message;
      console.log(e.message);
    } else {
      cr.message = "Erro ao conectar ao Oracle. Sem detalhes.";
    }
  } finally {
    if (connection !== undefined) {
      await connection.close();
    }
    console.log(cr);
    res.send(cr);
  }
};

export const inserirDados = async <T>(
    comandoSQL: ComandoSQL<string | undefined>, 
    res: any, 
    func: Function
  ) => {
    let cr: CustomResponse = { status: "ERROR", message: "", payload: undefined };
    let dados: (string | number)[] = [];
    for (const item of comandoSQL.dados) {
      const numeros = processarItem(item);
      dados.push(...numeros);
    }
    
    let connection;
    let [valida, mensagem] = await func();
    
    if(!valida) {
      cr.message = mensagem;
      res.send(cr);
    } else {
        try{
            connection = await oracledb.getConnection(oraConnAttribs);
            console.log("connected to DATABASE")
            console.log(dados)
            let resInsert = await connection.execute(comandoSQL.sql, dados);
            await connection.commit();
            
            const rowsInserted = resInsert.rowsAffected
            if(rowsInserted !== undefined &&  rowsInserted === 1) {
            cr.status = "SUCCESS"; 
            cr.message = "Inserção realizada";
            }
        }
        catch(e){
            if(e instanceof Error){
            cr.message = "verifique a integridade dos dados";
            console.error(e);
        }else{
            cr.message = "Conexão com o oracle falhou";
        }
        } finally {
            if(connection!== undefined){
            await connection.close();
            }
            res.send(cr);  
        }
    }
  }

  
export const excluirDados = async(
  comandoSQL: ComandoSQL<number>,
  res: any
) =>{
  let cr: CustomResponse = {
      status: "ERROR",
      message: "",
      payload: undefined,
    };

  console.log('Codigo recebido: ' + comandoSQL.dados);
  let dados: (string | number)[] = [];
  for (const item of comandoSQL.dados) {
    const numeros = processarItem(item);
    dados.push(...numeros);
  }
  let connection;
  try{
      connection = await oracledb.getConnection(oraConnAttribs);
      let resDelete = await connection.execute(comandoSQL.sql, dados);
      await connection.commit();
      
      const rowsDeleted = resDelete.rowsAffected
      if(rowsDeleted !== undefined &&  rowsDeleted === 1) {
        cr.status = "SUCCESS"; 
        cr.message = "Item Excluido";
      }else{
        cr.message = "Item não excluído. Contate o suporte";
      }

    }catch(e){
      if(e instanceof Error){
        cr.message = e.message;
        console.log(e.message);
      }else{
        cr.message = "Erro ao conectar ao oracle. Sem detalhes";
      }
    } finally {
      // fechando a conexao
      if(connection!==undefined)
        await connection.close();
    }
    res.send(cr)
}

function processarItem(item: string | number | undefined): (string | number)[] {
  if (typeof item === 'undefined') {
    return [];
  }
    const partes = item.toString().split(',');

  const numeros = partes.map(parte => {
    const numero = parte.trim();
    return isNaN(Number(numero)) ? parte.trim() : Number(numero);
  });
  return numeros;
}
