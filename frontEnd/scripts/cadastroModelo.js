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
  await (resp = fetch('http://localhost:3000/modelos/inserirModelo', requestOptions).then(T => T.json()))
  return resp
}
let cadastrarModelo = () =>{
  const idFabricante = Number(document.getElementById("idFabricante").value);
  const nomeModelo = document.getElementById("nomeModelo").value;
  const fileiras = document.getElementById("fileiras").value; 
  const colunas = document.getElementById("colunas").value;

   if(isVazio(idFabricante) || isVazio(nomeModelo) || isVazio(fileiras) || isVazio(colunas)){
      showStatusMessage("Preencha todos os dados!", true);
      return;
  }

  fetchInserir({idFabricante: idFabricante, nomeModelo: nomeModelo,colunas: Number(colunas),fileiras: Number(fileiras)}).then(customResponse => {
  if(customResponse.status === "SUCCESS"){
    showStatusMessage("Modelo cadastrado... ", false);
  }
  else{
    showStatusMessage("Erro ao cadastrar Modelo...: " + customResponse.message, true);
  }
  })
  .catch((e)=>{
    showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
  }); 
}