const span1 = document.getElementById('num1');
const span2 = document.getElementById('num2');
const optionsContainer = document.getElementById('options-container');

function iniciarJogo() {
    // Limpa as opções anteriores
    optionsContainer.innerHTML = '';

    // Gera números novos entre 1 e 9
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    const respostaCorreta = n1 * n2;

    // Atualiza a tela
    span1.innerText = n1;
    span2.innerText = n2;

    // Gera opções (1 certa + 3 erradas)
    let opcoes = [respostaCorreta];
    while (opcoes.length < 4) {
        let errado = Math.floor(Math.random() * 81) + 1;
        if (errado !== respostaCorreta && !opcoes.includes(errado)) {
            opcoes.push(errado);
        }
    }
    
    // Embaralha
    opcoes.sort(() => Math.random() - 0.5);

    // Cria os botões
    opcoes.forEach(opcao => {
        const btn = document.createElement('button');
        btn.innerText = opcao;
        btn.classList.add('option-btn');
        
        btn.onclick = () => {
            if (opcao === respostaCorreta) {
                // Se acertar: Fica verde
                btn.style.backgroundColor = '#4CAF50'; 
                
                // Espera 1 segundo e reinicia o jogo
                setTimeout(iniciarJogo, 1000);
            } else {
                // Se errar: Fica vermelho
                btn.style.backgroundColor = '#F44336';
            }
        };
        
        optionsContainer.appendChild(btn);
    });
}

// Começa o jogo ao carregar
iniciarJogo();