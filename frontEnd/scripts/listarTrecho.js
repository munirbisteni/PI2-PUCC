function requestListaDeTrechos() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/trechos/listarTrechos', requestOptions)
    .then(T => T.json())
  }

  /***
   * Função que requisita a exclusão
   */
   function requestExcluirTrecho(body) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    return fetch('http://localhost:3000/trechos/excluirTrecho', requestOptions)
    .then(T => T.json())
  }


  // --------------------------- alterar -----------------------
  
  function preencherTabela(trechos) {
              
    // acessando a referencia pelo id do tbody
    const tblBody = document.getElementById("dados-trecho");

    let trecho = "";
    // creating all cells
    for (let i = 0; i < trechos.length; i++) {

        trecho = trechos[i];
        console.log("Dados da trecho: " + trecho);
        // row representa a linha da tabela (um novo tr)
        const row = document.createElement("tr");

        // vamos atribuir um estilo.
        if (i % 2 === 0)
          row.className = "evenRow";
        else
          row.className = "oddRow";

        row.innerHTML = 
          `<td class="centerText">${trecho.idTrecho}</td>
            <td class="centerText">${trecho.idCidadeSaida}</td>
            <td class="centerText">${trecho.idCidadeChegada}</td>
            <td width="5%" class="centerText">
              <img
                  src="/assets/images/delete_icon.png"
                  onclick="excluirTrecho(${trecho.idTrecho});"
              />
            </td>`
        tblBody.appendChild(row);
      }
  }


  function excluirTrecho(c){
    console.log('Clicou no excluir Trecho: ' + c);
    // vamos fazer a exclusão
    requestExcluirTrecho({idTrecho: Number(c)})
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

  function exibirTrechos() {
    console.log('Entrou no exibir...')
    requestListaDeTrechos().then(customResponse => {
          // obteve resposta, vamos simplesmente exibir como mensagem:
          if(customResponse.status === "SUCCESS"){
            // vamos obter o que está no payload e chamar a função .
            console.log("Deu certo a busca de Trechos");
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