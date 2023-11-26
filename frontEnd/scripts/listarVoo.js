function requestListaDeVoos() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/voos/listarVoos', requestOptions)
    .then(T => T.json())
  }


   function requestExcluirVoo(body) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    return fetch('http://localhost:3000/voos/excluirVoo', requestOptions)
    .then(T => T.json())
  }


  
  function preencherTabela(voos) {
              
    // acessando a referencia pelo id do tbody
    const tblBody = document.getElementById("dados-voo");

    let voo = "";
    // creating all cells
    for (let i = 0; i < voos.length; i++) {

        voo = voos[i];
        console.log("Dados da voo: " + voo);
        // row representa a linha da tabela (um novo tr)
        const row = document.createElement("tr");

        // vamos atribuir um estilo.
        if (i % 2 === 0)
          row.className = "evenRow";
        else
          row.className = "oddRow";
        let cnvrsSaida = voo.previsaoSaida
        let cnvrsChegada = voo.previsaoChegada
        row.innerHTML = 
          `<td class="centerText">${voo.idVoo}</td>
            <td class="centerText">${voo.idAeronave}</td>
            <td class="centerText">${voo.idTrecho}</td>
            <td class="centerText">${cnvrsSaida.slice(0,21)}</td>
            <td class="centerText">${cnvrsChegada.slice(0,21)}</td>
            <td class="centerText">R$ ${voo.preco}</td>
            <td width="5%" class="centerText">
              <img
                  src="/assets/images/delete_icon.png"
                  onclick="excluirVoo(${voo.idVoo});"
              />
            </td>`
        tblBody.appendChild(row);
      }
  }


  function excluirVoo(c){
    console.log('Clicou no excluir Voo: ' + c);
    // vamos fazer a exclusão
    requestExcluirVoo({idVoo: Number(c)})
    .then(customResponse => {
      // obteve resposta na exclusão, chamamos novamente o carregar.
      if(customResponse.status === "SUCCESS"){
        location.reload();
      }else{
        // tratar corretamente o erro... (melhorar...)
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível excluir." + e);
    });
  }

  function exibirVoos() {
    console.log('Entrou no exibir...')
    requestListaDeVoos().then(customResponse => {
          // obteve resposta, vamos simplesmente exibir como mensagem:
          if(customResponse.status === "SUCCESS"){
            let payload = JSON.stringify(customResponse.payload)
            if(payload != []){
              preencherTabela(JSON.parse(JSON.stringify(customResponse.payload)))
            }
            else{console.error("PAYLOAD VAZIO")}
          }else{
            // tratar corretamente o erro... (melhorar...)
            console.error("erro ao puxar os dados da tabela!");
          }
        })
        .catch((e)=>{
          console.error("Erro crítico! Possívelmente banco de dados fora do ar!")
        });
}