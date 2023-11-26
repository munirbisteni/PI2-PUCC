function requestListaDeEstados() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/estados/listarEstados', requestOptions)
    .then(T => T.json())
  }

  /***
   * Função que requisita a exclusão
   */
   function requestExcluirEstado(body) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    return fetch('http://localhost:3000/estados/excluirEstado', requestOptions)
    .then(T => T.json())
  }


  
  function preencherTabela(estados) {
              
    // acessando a referencia pelo id do tbody
    const tblBody = document.getElementById("dados-estado");

    let estado = "";
    // creating all cells
    for (let i = 0; i < estados.length; i++) {

        estado = estados[i];
        console.log("Dados do Estado: " + estado);
        // row representa a linha da tabela (um novo tr)
        const row = document.createElement("tr");

        // vamos atribuir um estilo.
        if (i % 2 === 0)
          row.className = "evenRow";
        else
          row.className = "oddRow";

        row.innerHTML = 
          `<td class="centerText">${estado.idEstado}</td>
            <td class="leftText">${estado.nomeEstado}</td>
            <td class="centerText">${estado.siglaEstado}</td>
            <td width="5%" class="centerText">
              <img
                  src="/assets/images/delete_icon.png"
                  onclick="excluirEstado(${estado.idEstado});"
              />
            </td>`
        tblBody.appendChild(row);
      }
  }


  function excluirEstado(c){
    console.log('Clicou no excluir Estado: ' + c);
    // vamos fazer a exclusão
    requestExcluirEstado({idEstado: Number(c)})
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

  function exibirEstados() {
    console.log('Entrou no exibir...')
    requestListaDeEstados().then(customResponse => {
          // obteve resposta, vamos simplesmente exibir como mensagem:
          if(customResponse.status === "SUCCESS"){
            // vamos obter o que está no payload e chamar a função .
            console.log("Deu certo a busca de Estados");

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