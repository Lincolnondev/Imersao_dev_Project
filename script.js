let cardContainer = document.querySelector(".card-container"); // Seleciona o elemento HTML onde os cards serão inseridos.
let dados = []; // Array que irá armazenar todos os dados do JSON, para como um filho do container de cards na página.
    
 //não precisar recarregá-los.


// Adiciona um seletor para o campo de busca
let searchInput = document.querySelector("#search-input"); // Seleciona o campo de input da busca no HTML.


// Adiciona um event listener que dispara a busca a cada tecla digitada
searchInput.addEventListener("input", () => { // Adiciona um "ouvinte" que executa uma função sempre que o usuário digita algo no campo de busca.
    const termoBusca = searchInput.value.toLowerCase(); // Pega o texto digitado, e o converte para minúsculas para uma busca não sensível a maiúsculas/minúsculas.


    // Filtra o array 'dados' que já foi carregado.
    // O método '.filter' cria um novo array com todos os elementos que passam no teste.
    const dadosFiltrados = dados.filter(item =>
        // O teste verifica se o nome do item OU a descrição incluem o termo da busca.
        item.nome.toLowerCase().includes(termoBusca) ||
        item.descricao.toLowerCase().includes(termoBusca)
    ); // O resultado é um novo array contendo apenas os itens que correspondem à busca.


    renderizarCards(dadosFiltrados); // Chama a função para exibir na tela apenas os cards que foram filtrados.
});


async function carregarDados() { // Define uma função assíncrona para buscar os dados.
    let resposta = await fetch("data.json"); // Faz uma requisição para carregar o arquivo 'data.json'. 'await' pausa a execução até que o arquivo seja baixado.
    dados = await resposta.json(); // Converte a resposta (que está em formato de texto JSON) para um objeto/array JavaScript e armazena na variável 'dados'.
    dados.sort((a, b) => a.ano - b.ano); // Ordena os dados pelo ano, do mais antigo para o mais novo.
    renderizarCards(dados); // Chama a função para exibir todos os cards na tela pela primeira vez.
}


function renderizarCards(dadosParaRenderizar) { // Define a função que cria e exibe os cards na página.
    cardContainer.innerHTML = ""; // Esvazia o conteúdo do container de cards. Isso é importante para limpar os cards antigos antes de mostrar os novos (filtrados).


  for (let dado of dadosParaRenderizar) { // Inicia um loop para percorrer cada item do array de dados recebido.
        let article = document.createElement("article"); // Cria um novo elemento HTML <article> para ser o card.
        article.classList.add("card"); // Adiciona a classe CSS 'card' ao elemento <article> para estilização.
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article); // Adiciona o card recém-criado 
    }
}

carregarDados(); // Executa a função carregarDados() assim que o script é lido, iniciando todo o processo.
