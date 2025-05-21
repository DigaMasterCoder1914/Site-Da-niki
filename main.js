let paginaAtual = 1;
const totalPaginas = 5;
let podeScrollar = true;

function carregarpagina(numero) {
    fetch(`paginas/pagina${numero}.html`)
        .then(res => {
            if (!res.ok) throw new Error('Página não encontrada');
            return res.text();
        })
        .then(html => {
            document.getElementById('conteudo').innerHTML = html;
        })
        .catch(err => {
            document.getElementById('conteudo').innerHTML = '<p>Erro ao carregar a página</p>';
            console.error(err);
        });
}

function mudarPagina(direcao) {
    if (!podeScrollar) return;

    podeScrollar = false;
    setTimeout(() => podeScrollar = true, 800);

    if (direcao === 'baixo' && paginaAtual < totalPaginas) {
        paginaAtual++;
    } else if (direcao === 'cima' && paginaAtual > 1) {
        paginaAtual--;
    }

    carregarpagina(paginaAtual);
}

window.onload = () => {
    carregarpagina(paginaAtual);

    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            mudarPagina('baixo');
        } else {
            mudarPagina('cima');
        }
    });
};
