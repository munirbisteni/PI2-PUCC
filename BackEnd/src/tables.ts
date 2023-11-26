
type Letra = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

export type Aeronave = {
    idAeronave?: number, 
    anoFabricacao?: number,
    idModelo?: number,
  };

  export type Modelo = {
    idModelo?: number,
    nomeModelo?: string,
    idFabricante?: number,
    fileiras?: number,
    colunas?: number
  }

  //values (TO_TIMESTAMP(:ts_val, 'YYYY-MM-DD HH24:MI:SS'));
  export type Voo = {
    idAeronave?: number,
    previsaoSaida?:  string,
    previsaoChegada?:  string,
    idTrecho?: number,
    preco?: number
  }
  export type vooUsuario = {
    idVoo?: number,
    previsaoSaida?: string,
    previsaoChegada?: string,
    cidade_saida?: string,
    cidade_chegada?: string,
    sigla_estado_saida?: string,
    sigla_estado_chegada?: string,
  }
  export type Fabricante = {
    idFabricante?: number,
    nomeFabricante?: string
  }

  
  export type Cidade = {
    idCidade?: number,
    nomeCidade?: string,
    idEstado?: number
  }

  
  export type Estado = {
    idEstado?: number,
    nomeEstado?: string,
    siglaEstado?: string
  }

  
  export type Trecho = {
    idTrecho?: number,
    idCidadeSaida?: number,
    idCidadeChegada?: number
  }

  // export type Assentos = {
  //   idAssento?: number,
  //   letra?: Letra,
  //   numero?: number,
  //   ocupado?: boolean,
  //   idVoo?: number
  // }

  // export type Passagem = {
  //   idPassagem?: number,
  //   prenome?: string,
  //   sobrenome?: string,
  //   idAssento?: number
  // }