// Imagens das cartas
let imagens = [];
for (let i=0; i<=8; i++) imagens.push(`imagens/pallet/${i}.png`);

let fundo = 'imagens/fundo_cards/Poke_Ball_RG.png';

onload = () => {
    let elemImagens = document.querySelectorAll('#memoria img');
    elemImagens.forEach((img, i) => {
        img.src = fundo;
    });
};