function showStatusMessage(msg, error){
  var pStatus = document.getElementById("status");
  if (error === true){
  pStatus.className = "statusError";
  }else{
  pStatus.className = "statusSuccess";
  }
  pStatus.textContent = msg;
}

function isVazio(param){
  let p = String(param);
    if(p.length == 0){
      return true;
    }
    return false;
}

async function fetchInserir(body) {
  const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
  };
  console.log(requestOptions)
  let resp 
  await (resp = fetch('http://localhost:3000/trechos/inserirTrecho', requestOptions).then(T => T.json()))
  return resp
}
let cadastrarTrecho = () =>{
  const idCidadeSaida = Number(document.getElementById("idCidadeSaida").value);
  const idCidadeChegada = Number(document.getElementById("idCidadeChegada").value);
  if(isVazio(idCidadeSaida) || isVazio(idCidadeChegada)){
    showStatusMessage("Preencha todos os dados!", true);
    return;
}
  fetchInserir({idCidadeSaida: idCidadeSaida, idCidadeChegada: idCidadeChegada}).then(customResponse => {
  if(customResponse.status === "SUCCESS"){
    showStatusMessage("Trecho cadastrado... ", false);
  }
  else{
    showStatusMessage("Erro ao cadastrar Trecho...: " + customResponse.message, true);
  }
  })
  .catch((e)=>{
    showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
  }); 
}