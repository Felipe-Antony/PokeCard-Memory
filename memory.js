// Imagens das cartas
let imagens = [];
for (let i=0; i<=8; i++) imagens.push(`imagens/pallet/${i}.png`);
let fundo = 'imagens/fundo_cards/Poke_Ball_RG.png';

//Estado do jogo
let cartas = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];


onload = () => {

    //Carrega fundo
    let elemImagens = document.querySelectorAll('#memoria img');
    elemImagens.forEach((img, i) => {
        img.src = fundo;
        img.setAttribute('data-valor', i);
        img.style.opacity = 0.4;
    });

    //Cria evento do botao início
    document.querySelector('#btInicio').onclick = iniciaJogo;
};

//--------------------------------------
//Inicia o jogo
//--------------------------------------
const iniciaJogo = () => {

    //embaralhar as cartas
    for(let i=0; i<cartas.length; i++) {
        let p = Math.trunc( Math.random() * cartas.length );
        let aux = cartas[p];
        cartas[p] = cartas[i];
        cartas[i] = aux;
    }


    //associar evento às imagens
    let elemImagens = document.querySelectorAll('#memoria img');
    elemImagens.forEach((img, i) => {
        img.onclick = trataCliqueImagens;
        img.style.opacity = 1;
    });
};

//------------------------------------------
// Processa o clique das Imagens
//------------------------------------------
const trataCliqueImagens = (e) => {
    const p = +e.target.getAttribute('data-valor');
    const valor = cartas[p];
    e.target.src = imagens[valor -1];  
    e.target.onclick = null; 
};