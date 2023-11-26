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
  await (resp = fetch('http://localhost:3000/aeronaves/inserirAeronave', requestOptions).then(T => T.json()))
  return resp
}
let cadastrarAeronave = () =>{

  const idModelo = document.getElementById("idModelo").value;
  const anoFabricacao = document.getElementById("anoFabricacao").value;

  if(isVazio(idModelo) || isVazio(anoFabricacao)){
      showStatusMessage("Preencha todos os dados!", true);
      return;
  }
  
  fetchInserir({ idModelo: Number(idModelo), anoFabricacao: anoFabricacao}).then(customResponse => {
  if(customResponse.status === "SUCCESS"){
    showStatusMessage("Aeronave cadastrada ", false);
  }
  else{
    showStatusMessage("Erro ao cadastrar aeronave: " + customResponse.message, true);
  }
  })
  .catch((e)=>{
    showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
  }); 
}