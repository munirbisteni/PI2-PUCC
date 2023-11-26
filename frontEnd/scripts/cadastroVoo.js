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
    await (resp = fetch('http://localhost:3000/voos/inserirVoo', requestOptions).then(T => T.json()))
    return resp
}

function converterHorario(convert){
    let res = "";
    res = convert.slice(0,10)
    res += " ";
    res += convert.slice(11,17)
    return res;
}
  let cadastrarVoo = () =>{
    const idTrecho = Number(document.getElementById("idTrecho").value);
    const idAeronave = Number(document.getElementById("idAeronave").value);
    const previsaoChegada = converterHorario(document.getElementById("previsaoChegada").value);
    const previsaoSaida = converterHorario(document.getElementById("previsaoSaida").value);
    const preco = converterHorario(document.getElementById("preco").value);

    if(isVazio(idAeronave)|| isVazio(idTrecho) || isVazio(previsaoChegada) || isVazio(previsaoSaida) || isVazio(preco)){
      showStatusMessage("Preencha todos os dados!", true);
      return;
    }

    fetchInserir({idTrecho: idTrecho, idAeronave:idAeronave, previsaoChegada:previsaoChegada, previsaoSaida: previsaoSaida, preco:preco}).then(customResponse => {
    if(customResponse.status === "SUCCESS"){
      showStatusMessage("voo cadastrado... ", false);
    }
    else{
      showStatusMessage("Erro ao cadastrar voo...: " + customResponse.message, true);
      console.log(customResponse.message);
    }
    })
    .catch((e)=>{
      showStatusMessage("Erro técnico ao cadastrar... Contate o suporte.", true);
      console.log("Falha grave ao cadastrar." + e)
    }); 
  }

  document.addEventListener('DOMContentLoaded', function() {
    const validarData = document.getElementById('previsaoSaida');
    const dateVolta = document.getElementById('previsaoChegada');

    function definirDataAtual() {        
      const dataAtual = new Date();
      const ano = dataAtual.getFullYear();
      const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
      const dia = String(dataAtual.getDate()).padStart(2, '0');
      const hora = String(dataAtual.getHours()).padStart(2, '0');
      const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
      const dataHoraAtual = `${ano}-${mes}-${dia}T${hora}:${minutos}`;
      validarData.setAttribute('min', dataHoraAtual);
    }
    definirDataAtual();

    validarData.addEventListener('input', function() {
        dateVolta.min = validarData.value;
        if (dateVolta.value != "" &&  dateVolta.value < validarData.value) {
            dateVolta.value = validarData.value;
        }
    });

});