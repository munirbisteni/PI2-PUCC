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
  let resp 
  await (resp = fetch('http://localhost:3000/estados/inserirEstado', requestOptions).then(T => T.json()))
  return resp
}

let cadastrarEstado = () =>{
  const nomeEstado = document.getElementById("nomeEstado").value;
  const siglaEstado = document.getElementById("siglaEstado").value;
  
  if(isVazio(nomeEstado) || isVazio(siglaEstado)){
      showStatusMessage("Preencha todos os dados!", true);
      return;
  }

  fetchInserir({ nomeEstado: nomeEstado, siglaEstado: siglaEstado}).then(customResponse => {
  if(customResponse.status === "SUCCESS"){
    showStatusMessage("Estado cadastrado... ", false);
  }
  else{
    showStatusMessage("Erro ao cadastrar Estado...: " + customResponse.message, true);

  }
  })
  .catch((e)=>{
    showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
  }); 
}