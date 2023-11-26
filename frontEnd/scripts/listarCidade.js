function requestListaDeCidades() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/cidades/listarCidades', requestOptions)
    .then(T => T.json())
  }

  /***
   * Função que requisita a exclusão
   */
   function requestExcluirCidade(body) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    return fetch('http://localhost:3000/cidades/excluirCidade', requestOptions)
    .then(T => T.json())
  }


  // --------------------------- alterar -----------------------
  
  function preencherTabela(cidades) {
              
    // acessando a referencia pelo id do tbody
    const tblBody = document.getElementById("dados-cidade");

    let cidade = "";
    // creating all cells
    for (let i = 0; i < cidades.length; i++) {

        cidade = cidades[i];
        console.log("Dados da Cidade: " + cidade);
        // row representa a linha da tabela (um novo tr)
        const row = document.createElement("tr");

        // vamos atribuir um estilo.
        if (i % 2 === 0)
          row.className = "evenRow";
        else
          row.className = "oddRow";

        row.innerHTML = 
          `<td class="centerText">${cidade.idCidade}</td>
            <td class="centerText">${cidade.nomeCidade}</td>
            <td class="centerText">${cidade.idEstado}</td>
            <td width="5%" class="centerText">
              <img
                  src="/assets/images/delete_icon.png"
                  onclick="excluirCidade(${cidade.idCidade});"
              />
            </td>`
        tblBody.appendChild(row);
      }
  }


  function excluirCidade(c){
    console.log('Clicou no excluir Cidade: ' + c);
    // vamos fazer a exclusão
    requestExcluirCidade({idCidade: Number(c)})
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

  function exibirCidades() {
    console.log('Entrou no exibir...')
    requestListaDeCidades().then(customResponse => {
          // obteve resposta, vamos simplesmente exibir como mensagem:
          if(customResponse.status === "SUCCESS"){
            // vamos obter o que está no payload e chamar a função .
            console.log("Deu certo a busca de Cidades");

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