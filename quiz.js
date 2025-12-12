const displayPergunta = document.getElementById('pergunta-display');
const optionsContainer = document.getElementById('options-container');

let bancoDePerguntas = [];

// Função para carregar o CSV
async function carregarPerguntas() {
    try {
        const resposta = await fetch('perguntas.csv');
        
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o arquivo CSV.");
        }

        const textoCSV = await resposta.text();
        processarCSV(textoCSV);
        novaPergunta(); // Começa o jogo assim que carregar
    } catch (erro) {
        console.error(erro);
        displayPergunta.innerText = "Erro ao carregar perguntas. Use um servidor local.";
    }
}

// Transforma o texto do CSV em objetos Javascript
function processarCSV(texto) {
    const linhas = texto.split('\n').filter(linha => linha.trim() !== '');
    
    for (let i = 1; i < linhas.length; i++) {
        const colunas = linhas[i].split(',');
        
        // Garante que a linha tem conteúdo suficiente
        if (colunas.length >= 6) {
            bancoDePerguntas.push({
                pergunta: colunas[0],
                opcoes: [colunas[1], colunas[2], colunas[3], colunas[4]],
                correta: colunas[5].trim()
            });
        }
    }
}

function novaPergunta() {
    optionsContainer.innerHTML = '';

    if (bancoDePerguntas.length === 0) return;

    const indiceAleatorio = Math.floor(Math.random() * bancoDePerguntas.length);
    const dadosDaPergunta = bancoDePerguntas[indiceAleatorio];

    displayPergunta.innerText = dadosDaPergunta.pergunta;

    let opcoesParaExibir = [...dadosDaPergunta.opcoes];
    opcoesParaExibir.sort(() => Math.random() - 0.5);

    opcoesParaExibir.forEach(opcao => {
        const btn = document.createElement('button');
        btn.innerText = opcao;
        btn.classList.add('option-btn');

        btn.onclick = () => {
            if (opcao.trim() === dadosDaPergunta.correta) {
                btn.style.backgroundColor = '#4CAF50';
                setTimeout(novaPergunta, 1500);
            } else {
                btn.style.backgroundColor = '#F44336';
            }
        };

        optionsContainer.appendChild(btn);
    });
}

carregarPerguntas();