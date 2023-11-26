function requestListaDeAeronaves() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    return fetch('http://localhost:3000/aeronaves/listarAeronaves', requestOptions)
    .then(T => T.json())
  }

  /***
   * Função que requisita a exclusão
   */
   function requestExcluirAeronave(body) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    return fetch('http://localhost:3000/aeronaves/excluirAeronave', requestOptions)
    .then(T => T.json())
  }
  
  function preencherTabela(aeronaves) {
    const tblBody = document.getElementById("dados-aeronave");
    let aeronave = "";

    for (let i = 0; i < aeronaves.length; i++) {
        aeronave = aeronaves[i];
        const row = document.createElement("tr");

        if (i % 2 === 0)
            row.className = "evenRow";
        else  
            row.className = "oddRow";

        row.innerHTML = 
          `<td class="centerText">${aeronave.idAeronave}</td>
            <td class="centerText">${aeronave.idModelo}</td>
            <td class="centerText">${aeronave.anoFabricacao }</td>
            <td width="5%" class="centerText">
              <img
                  src="/assets/images/delete_icon.png"
                  onclick="excluirAeronave(${aeronave.idAeronave});"
              />
            </td>`
        tblBody.appendChild(row);
    }
}

  function excluirAeronave(c){
    console.log('Clicou no excluir aeronave: ' + c);
    requestExcluirAeronave({idAeronave: Number(c)})
    .then(customResponse => {
      if(customResponse.status === "SUCCESS"){
        location.reload();
      }else{
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível excluir." + e);
    });
  }

  function exibirAeronaves() {
    console.log('Entrou no exibir...')
    requestListaDeAeronaves().then(customResponse => {
          if(customResponse.status === "SUCCESS"){
            console.log("Deu certo a busca de aeronaves");
            let payload = JSON.stringify(customResponse.payload)
            if(payload != []){
              preencherTabela(JSON.parse(JSON.stringify(customResponse.payload)))
            }
            else{console.error("PAYLOAD VAZIO")}
          }else{

            console.error("erro ao puxar os dados da tabela!");
          }
        })
        .catch((e)=>{
          console.error("Erro crítico! Possívelmente banco de dados fora do ar!")
        });
  }