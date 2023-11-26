
function requestListaDeCidadesVoo() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/voos/listarVoosUsuarios', requestOptions)
    .then(T => T.json())
  }


  let carergarDados = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const cidadeSaida = urlParams.get("cidade_saida").split('(')[0].trim()
      const cidadeChegada = urlParams.get("cidade_chegada").split('(')[0].trim()
      const isVoltaTrue = urlParams.get("date_volta") == "" ? false : true;
      const section = document.getElementById("info");
      carregarTitulo(urlParams);
  
      const dadosSelecionados = await requestListaVoos(cidadeSaida, cidadeChegada, new Date(urlParams.get("date_ida")));
      console.log(dadosSelecionados)
      if(dadosSelecionados.length > 0)
        carregarListaVoos(dadosSelecionados, false);

      else{
        let title = document.createElement("h1");
        title.innerHTML = `Ops, estamos sem viagens de ${cidadeSaida} para ${cidadeChegada}!`
        section.append(title);  
      }
      
      if (isVoltaTrue){
        const dadosSelecionados2 = await requestListaVoos(cidadeChegada, cidadeSaida, new Date(urlParams.get("date_ida")));
        if(dadosSelecionados2.length > 0)
          carregarListaVoos(dadosSelecionados2, isVoltaTrue);
        else{
          let title = document.createElement("h1");
          title.innerHTML = `Ops, estamos sem viagens de ${cidadeChegada} para ${cidadeSaida}!`
          section.append(title);
        }
      }
    } 
    catch (error) {
      console.error("Erro ao carregar dados: " + error);
    }
  }

let carregarTitulo = (urlParams) => {
  const section = document.getElementById("info");
  const cidadeSaida = urlParams.get("cidade_saida")
  const cidadeChegada = urlParams.get("cidade_chegada")
  const dateIda = urlParams.get("date_ida").split('-');;
  const title = document.createElement("h1");

  title.innerHTML= `${cidadeSaida} &rarr; ${cidadeChegada}`
  section.append(title);

  const subtitle = document.createElement("h2");
  subtitle.innerHTML= `Datas a partir de ${dateIda[2]}/${dateIda[1]}/${dateIda[0]}`
  section.append(subtitle);
}

let carregarListaVoos = (dados, isVoltaTrue) => {
  const section = document.getElementById("rows");
  let title = document.createElement("h1");

  title.innerHTML = `Selecione o melhor voo de ${dados[0].cidade_saida} para ${dados[0].cidade_chegada}!`
  section.append(title);
  for(let i = 0; i < dados.length; i++){
    let dado = dados[i];
    const div = document.createElement("div");
    const [dataS,horaS] = formatarDataHora(dado.previsaoSaida); 
    const [dataC, horaC] = formatarDataHora(dado.previsaoChegada);
    let classTogle;
    if(isVoltaTrue){
      classTogle = "toggleItemVolta"
    }
    else{
      classTogle = "toggleItem"
    }

    div.innerHTML =`
      <h3>saída: ${dataS} as ${horaS} --------- chegada: ${dataC} as ${horaC}</h3> 
      <input type="checkbox" onclick="toggleItem(this)" class="${classTogle}" value="${dado.idVoo}"></input>
    `;
    section.appendChild(div)
  }
}

let formatarDataHora =(req) =>{
  req = req.split('T');
  data = req[0].split('-');
  horario = req[1].split(':')
  let resData = data[2] + "/" + data[1]+"/" + data[0];
  let resHora = horario[0] + ":" + horario[1];
  console.log(resData + " " +resHora)
  return [resData, resHora];
}

function toggleItem(element) {
  const elementClass = element.classList[0]; // Pega a primeira classe do elemento chamante

  if (element.checked) {
    const elements = document.querySelectorAll(`.${elementClass}`);

    elements.forEach(item => {
      if (item !== element) {
        item.disabled = true;
      }
    });
  } else {
    const elements = document.querySelectorAll(`.${elementClass}`);
    elements.forEach(item => {
      item.disabled = false;
    });
  }
}


let requestListaVoos = async (cidadeSaida, cidadeChegada, dataMinima) => {
  try {
    const customResponse = await requestListaDeCidadesVoo();

    if (customResponse.status === "SUCCESS") {
      const payload = customResponse.payload;

      if (payload.length > 0) {
        const dadosSelecionados = payload.filter(dado => {
          return dado.cidade_saida === cidadeSaida &&
                 dado.cidade_chegada === cidadeChegada &&
                 new Date(dado.previsaoSaida.split('T')[0]).getTime() > dataMinima.getTime();
        });
        console.log(dadosSelecionados)
        return dadosSelecionados;
      } else {
        throw new Error("ERRO INESPERADO, CONTATE O ADMINISTRATIVO");
      }
    } else {
      throw new Error("Erro crítico!");
    }
  }catch (error) {
    console.error("Erro: " + error);
    throw error;
  }
}

let irParaSelecionarAssento = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const idVooIda = document.querySelectorAll('input[class="toggleItem"]:checked')[0].value;
  const isVoltaTrue = urlParams.get("date_volta") == "" ? false : true;
  let locationHref = `/cliente/escolherAssento/index.html?idCidadeSaida=${idVooIda}`
  if(isVoltaTrue){
    const idVooVolta = document.querySelectorAll('input[class="toggleItemVolta"]:checked')[0].value;
    locationHref += `&idCidadeVolta=${idVooVolta}`
  }

  location.href= locationHref
}
