
function requestListaDeCidadesVoo() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch('http://localhost:3000/voos/listarVoosUsuarios', requestOptions)
  .then(T => T.json())
}
let construirForm =(dados) =>{
  const origemBody = document.getElementById("origem");
  let dado = "";
  const insercao = [];
  for(let i = 0; i <dados.length; i++){
      dado = dados[i];
      console.log(insercao + insercao.length)
      let repetida = false;

      for(let j = 0; j < insercao.length ; j++)
          if(dado.cidade_saida == insercao[j])
            if(i != j){repetida = true; break;}
          
      
      
      const option = document.createElement("option");
      if(!repetida){
          insercao.push(dado.cidade_saida);
          option.innerHTML = `<option class="optionOrigem" value="${dado.cidade_saida}">${dado.cidade_saida} (${dado.sigla_estado_saida})</option>`
          origemBody.appendChild(option);
      }   
  }
}
let isVolta = () => {
  let checkBox = document.getElementById("volta");
  let dateVolta = document.getElementById("dateVolta");
  
  if (checkBox.checked){
      dateVolta.className = "checked"; 
  } else {
      dateVolta.className = "onCheck"; 
      dateVolta.value = "";
  }
};
let monstarDestino = (dados) => {
  const destinoBody = document.getElementById("destino");
  const origemBody = document.getElementById("origem");
  const insercao = [];
  while (destinoBody.firstChild) {
      destinoBody.removeChild(destinoBody.firstChild);
  }
  for(let i = 0; i <dados.length; i++){
      dado = dados[i];
      console.log(dado);
      let repetida = false;
      
      for(let j = 0; j < insercao.length ; j++)
          if(dado.cidade_chegada == insercao[j])
            if(i != j){repetida = true; break;}
          
      
      
      
      dado = dados[i];

      const valor =(origemBody.value.split('('))[0].trim();
      console.log(valor)
      if(valor == dado.cidade_saida && !repetida){
          insercao.push(dado.cidade_chegada)
          const option = document.createElement("option");
          option.innerHTML = `<option class="optionOrigem" value="${dado.cidade_chegada}">${dado.cidade_chegada}  (${dado.sigla_estado_chegada})</option>`    
          destinoBody.appendChild(option);
      }
  }   
}
let exibirDestino = () =>{
  console.log('Montando form')
  requestListaDeCidadesVoo().then(customResponse => {
      // obteve resposta, vamos simplesmente exibir como mensagem:
      if(customResponse.status === "SUCCESS"){
        let payload = JSON.stringify(customResponse.payload)
        if(payload != []){
          monstarDestino(JSON.parse(JSON.stringify(customResponse.payload)))
        }
        else{console.error("PAYLOAD VAZIO")}
      }else{
        // tratar corretamente o erro... (melhorar...)
        console.error("erro ao puxar os dados da tabela!");
      }
    })
    .catch((e)=>{
      console.error("Erro crítico!" + e)
    });
}

let exibirForm = () =>{
  console.log('Montando form')
  requestListaDeCidadesVoo().then(customResponse => {
      // obteve resposta, vamos simplesmente exibir como mensagem:
      if(customResponse.status === "SUCCESS"){
        let payload = JSON.stringify(customResponse.payload)
        if(payload != []){
          construirForm(JSON.parse(JSON.stringify(customResponse.payload)))
        }
        else{console.error("PAYLOAD VAZIO")}
      }else{
        // tratar corretamente o erro... (melhorar...)
        console.error("erro ao puxar os dados da tabela!");
      }
    })
    .catch((e)=>{
      console.error("Erro crítico!" + e)
    });


  }
  let pesquisarViagem = () => {
    const destinoBody = document.getElementById("destino").value;
    const origemBody = document.getElementById("origem").value;
    const dateIda = document.getElementById("dateIda").value;
    const dateVolta = document.getElementById("dateVolta").value;
    location.href= `/cliente/escolherVoo/index.html?cidade_saida=${origemBody}&cidade_chegada=${destinoBody}&date_ida=${dateIda}&date_volta=${dateVolta}`
  };


document.addEventListener('DOMContentLoaded', function() {
  const validarData = document.getElementById('dateIda');
  const dateVolta = document.getElementById('dateVolta');
  
  function bloquearDiasPassados() {
    const dataAtual = new Date().toISOString().split('T')[0];
    validarData.min = dataAtual;
  }
  
  bloquearDiasPassados();

  validarData.addEventListener('change', function() {
    bloquearDiasPassados();
    dateVolta.min = validarData.value; 
  });
});