// Imagens das cartas
let imagens = [];
let cont = [];
for (let i=0; i<=7; i++) {
    let p = Math.floor( Math.random() * 18);
    if (cont.length == 0) {
        cont.push(p);
    } else {
        for (let j=0; j<cont.length; j++) {
            if (p==cont[j]) {
                p++ 
                console.log(p, cont[j]);
                cont.push(p);
                break;
            }else {
                cont.push(p);
                break;
            }              
        }          
    }  
}

console.log(cont);
for (let i=0; i<cont.length; i++){
    imagens.push(`imagens/pallet/${cont[i]}.png`);
}

let fundo = 'imagens/fundo_cards/Poke_Ball_RG.png';

//Estado do jogo
let cartas = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
let cliquesTravados = false;
let temCartaVirada = false;
let posicaoCartaVirada = -1;
let valorCartaVirada = 0;
let pontos = 0;
const timerDoJogo = new Timer('#timer');

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
        img.src = fundo;
    });

    //Reseta o estado do jogo
    cliquesTravados = false;
    temCartaVirada = false;
    posicaoCartaVirada = -1;
    valorCartaVirada = 0;
    pontos = 0;

    //ajusta a interface
    document.querySelector('#btInicio').disabled = true;
    document.querySelector('#timer').style.backgroundColor = 'orange';
    timerDoJogo.start();
};

//------------------------------------------
// Processa o clique das Imagens
//------------------------------------------
const trataCliqueImagens = (e) => {
    if(cliquesTravados) return;
    const p = +e.target.getAttribute('data-valor');
    const valor = cartas[p];
    e.target.src = imagens[valor -1];  
    e.target.onclick = null; 

    if(!temCartaVirada) {
        temCartaVirada = true;
        posicaoCartaVirada = p;
        valorCartaVirada = valor;
    } else {
        if(valor == valorCartaVirada) {
            pontos++;
        } else {
            const p0 = posicaoCartaVirada;
            cliquesTravados = true;
            setTimeout( ()=> {
                e.target.src = fundo;
                e.target.onclick = trataCliqueImagens;
                let img = document.querySelector('#memoria #i' + p0);
                img.src = fundo;
                img.onclick = trataCliqueImagens;
                cliquesTravados = false;
            }, 1000);
        }
        temCartaVirada = false;
        posicaoCartaVirada = -1;
        valorCartaVirada = 0;
    }    

    if(pontos==8) {
        document.querySelector('#btInicio').disabled = false;
        document.querySelector('#timer').style.backgroundColor= 'lightgreen';
        timerDoJogo.stop();
    }
};

//---------------------------------------
// Timer
//---------------------------------------
function Timer(e) {
    this.element = e;
    this.time = 0;
    this.control = null;
    this.start = () => {
        this.time=0;
        this.control = setInterval( () => {
            this.time++;
            const minutes = Math.trunc(this.time/60);
            const seconds = this.time % 60;
            document.querySelector(this.element).innerHTML = 
            (minutes<10?"0":"") + minutes + ':'+
            (seconds<10?"0":"") + seconds;
            seconds;
        }, 1000);
    };

    this.stop = () =>{
        clearInterval(this.control);
        this.control = null;
    };
}


