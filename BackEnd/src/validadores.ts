
import * as tables from "./tables";

export async function aeronaveValida(aero: tables.Aeronave) {

  let valida = false;
  let mensagem = "";
  if(aero.idModelo === undefined){
    mensagem = "Modelo não informado.";
  } 

  if(aero.anoFabricacao === undefined){
    mensagem = "Ano de fabricação não informado";
  }

  if((aero.anoFabricacao == undefined) || (Number(aero.anoFabricacao)< 1990 ||Number(aero.anoFabricacao) > 2026)){
    mensagem = "Ano de fabricação deve ser entre 1990 e 2026";
  }

  // se passou em toda a validação.
  if(mensagem === ""){
    valida = true;
  }

  return [valida, mensagem] as const;
}

export async function modeloValido(mod: tables.Modelo){
  
  let valida = false;
  let mensagem = "";
  
  if(mod.idFabricante === undefined){
    mensagem = "Fabricante não informado";
  }
  if(mod.colunas == undefined || mod.fileiras == undefined ){
    mensagem = "Fileiras e colunas devem ser preenchidas"
  }


  if(mensagem === ""){
    valida = true;
  }
  return [valida, mensagem] as const;
}

export async function fabricanteValida(fab: tables.Fabricante){
  let valida = false;
  let mensagem = "";

  if (fab.nomeFabricante === undefined){
    mensagem = "Fabricante não informado";
  }

  if(mensagem === ""){
    valida = true;
  }
  return [valida, mensagem] as const;
}

export async function cidadeValida(cid: tables.Cidade){
  let valida = false;
  let mensagem = "";

  if(cid.idEstado === undefined){
    mensagem = "Estado não informado";
  }

  if(cid.nomeCidade === undefined){
    mensagem = "Cidade precisa ter nome";
  }
  
  if(mensagem === ""){
    valida = true;
  }
  return [valida, mensagem] as const;
}

export async function estadoValido(est: tables.Estado){
  let valida = false;
  let mensagem = "";

  if(est.nomeEstado === undefined){
    mensagem = "Estado não informado";
  }
  
  if(est.siglaEstado === undefined){
    mensagem = "Sigla do estado não informada";
  }
  if(est.siglaEstado?.length !== 2){
    mensagem = "A sigla deve ter 2 caracteres";
  }

  if(mensagem === ""){
    valida = true;
  }
  return [valida, mensagem] as const;
}

export async function trechoValido(trc: tables.Trecho){
  let valida = false;
  let mensagem = "";

  if(trc.idCidadeChegada === undefined){
    mensagem = "Cidade de Chegada não informada!";
  }
  
  if(trc.idCidadeSaida === undefined){
    mensagem = "Cidade de saida não informada!";
  }

  if(mensagem === ""){
    valida = true;
  }
  return [valida, mensagem] as const;
}

export async function vooValido(v: tables.Voo){
  let valida = false;
  let mensagem = "";

  if (v.idAeronave === undefined){
    mensagem = "Aviao nao informado";
  }

  if (v.idTrecho === undefined){
    mensagem = "Trecho não informado";
  }

  if(v.previsaoChegada === undefined || v.previsaoSaida === undefined){
    mensagem = "Previsao invalida";
  }

  if(mensagem === ""){
    valida = true;
  }
  
  return [valida, mensagem] as const; 
}

