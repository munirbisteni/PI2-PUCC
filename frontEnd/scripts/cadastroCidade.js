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
  await (resp = fetch('http://localhost:3000/cidades/inserirCidade', requestOptions).then(T => T.json()))
  return resp
}
let cadastrarCidade = () =>{
  const idEstado = Number(document.getElementById("idEstado").value);
  const nomeCidade = document.getElementById("nomeCidade").value;
  
  if(isVazio(idEstado) || isVazio(nomeCidade)){
      showStatusMessage("Preencha todos os dados!", true);
      return;
  }

  fetchInserir({nomeCidade: nomeCidade, idEstado: idEstado}).then(customResponse => {
  if(customResponse.status === "SUCCESS"){
    showStatusMessage("Cidade cadastrada... ", false);
  }
  else{
    showStatusMessage("Erro ao cadastrar Cidade...: " + customResponse.message, true);
  }
  })
  .catch((e)=>{
    showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
  }); 
}