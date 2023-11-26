import { register } from "module";
import * as tables from "./tables";

export type ConvertFunction<T> = (oracleRows: unknown[] | undefined) => T;

export function rowsToAeronaves(oracleRows: unknown[] | undefined) : Array<tables.Aeronave> {
    let aeronaves: Array<tables.Aeronave> = [];
    let aeronave;
    console.log(oracleRows)
    if (oracleRows !== undefined){ 
      oracleRows.forEach((registro: any) => {
        aeronave = {
          idAeronave: registro.IDAERONAVE,
          idModelo: registro.IDMODELO,
          anoFabricacao: registro.ANOFABRICACAO,
        } as tables.Aeronave;
  
        // inserindo o novo Array convertido.
        aeronaves.push(aeronave);
      })
    }
    return aeronaves;
  }

export function rowsToModelos(oracleRows: unknown[]| undefined) : Array<tables.Modelo>{
    let modelos: Array<tables.Modelo> = [];
    let modelo;
    if (oracleRows !== undefined){
        oracleRows.forEach((registro: any) =>{
            modelo = {
                idModelo: registro.IDMODELO,
                nomeModelo: registro.NOMEMODELO,
                idFabricante: registro.IDFABRICANTE,
                colunas: registro.COLUNAS,
                fileiras: registro.FILEIRAS
            } as tables.Modelo;
            modelos.push(modelo);
        })
    }
    return modelos;
}

export function rowsToFabricante(oracleRows: unknown[]| undefined) : Array<tables.Fabricante>{
    let fabricantes: Array<tables.Fabricante> = [];
    let fabricante;
    if (oracleRows !== undefined){
        oracleRows.forEach((registro : any) =>{
            fabricante = {
                idFabricante: registro.IDFABRICANTE,
                nomeFabricante: registro.NOMEFABRICANTE
            } as tables.Fabricante;
            fabricantes.push(fabricante);
        })
    }
    return fabricantes;
}


export function rowsToCidades(oracleRows: unknown[]| undefined) : Array<tables.Cidade>{
    let cidades: Array<tables.Cidade> = [];
    let cidade;
    if (oracleRows !== undefined){
        oracleRows.forEach((registro: any) =>{
            cidade = {
                idCidade: registro.IDCIDADE,
                nomeCidade: registro.NOMECIDADE,
                idEstado: registro.IDESTADO
            } as tables.Cidade;
            cidades.push(cidade);
        })
    }
    return cidades;
}

export function rowsToEstados(oracleRows : unknown[] | undefined): Array<tables.Estado>{
    let estados: Array<tables.Estado> = [];
    let estado;
    if (oracleRows !== undefined){
        oracleRows.forEach((registro: any) =>{
            estado = {
                idEstado: registro.IDESTADO,
                nomeEstado: registro.NOMEESTADO,
                siglaEstado: registro.SIGLAESTADO,
            } as tables.Estado;
            estados.push(estado);
        })
    }
    return estados;
}

export function rowsToVoos(oracleRows : unknown[] | undefined) : Array<tables.Voo>{
    let voos: Array<tables.Voo> = [];
    let voo;
    if (oracleRows !== undefined){
        oracleRows.forEach((registro : any) =>{
            voo = {
                idAeronave: registro.IDAERONAVE,
                idVoo: registro.IDVOO,
                previsaoSaida: registro.PREVISAOSAIDA + " -3:00",
                previsaoChegada: registro.PREVISAOCHEGADA +" -3:00",
                idTrecho: registro.IDTRECHO,
                preco: registro.PRECO
            } as tables.Voo;
            voos.push(voo);
        })
    }
    return voos;
}

export function rowsToVoosUsuarios(oracleRows : unknown[] | undefined) : Array<tables.vooUsuario>{
    let voos: Array<tables.vooUsuario> = [];
    let voo;
    if (oracleRows !== undefined){
        oracleRows.forEach((registro : any) =>{
            voo = {
                idVoo: registro.IDVOO,
                previsaoSaida: registro.PREVISAOSAIDA,
                previsaoChegada: registro.PREVISAOCHEGADA,
                cidade_saida: registro.CIDADE_SAIDA,
                sigla_estado_saida: registro.SIGLA_ESTADO_SAIDA,
                cidade_chegada: registro.CIDADE_CHEGADA,
                sigla_estado_chegada: registro.SIGLA_ESTADO_CHEGADA
            } as tables.vooUsuario;
            voos.push(voo);
        })
    }
    return voos;
}
export function rowsToTrechos(oracleRows: unknown[] | undefined) : Array<tables.Trecho>{
    let trechos: Array<tables.Trecho> = [];
    let trecho;
    if (oracleRows !== undefined){
        oracleRows.forEach((registro: any) => {
            trecho = {
                idTrecho: registro.IDTRECHO,
                idCidadeSaida: registro.IDCIDADESAIDA,
                idCidadeChegada: registro.IDCIDADECHEGADA
            }as tables.Trecho;
            trechos.push(trecho);
        })
    }
    return trechos;
}

// export function rowsToGeneric<T>(oracleRows:Array<any>) : T[]{
//     return oracleRows.map(row=>{
//         const obj: Partial<T> = {};
//         Object.keys(row).forEach((key) =>{
//             obj[key as keyof T] = row[key]
//         });
//     return obj as T;
//     });
// }