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
  await (resp = fetch('http://localhost:3000/fabricantes/inserirFabricante', requestOptions).then(T => T.json()))
  return resp
}
let cadastrarFabricante = () =>{
  const nomeFabricante = document.getElementById("nomeFabricante").value;
  if(isVazio(nomeFabricante)){
    showStatusMessage("Preencha todos os dados!", true);
    return;
}
  fetchInserir({nomeFabricante: nomeFabricante}).then(customResponse => {
  if(customResponse.status === "SUCCESS"){
    showStatusMessage("Fabricante cadastrada ", false);
  }
  else{
    showStatusMessage("Erro ao cadastrar Fabricante: " + customResponse.message, true);
    console.log(customResponse.message);
  }
  })
  .catch((e)=>{
    showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
  }); 
} 