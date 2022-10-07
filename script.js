// INITIAL DATA
let field_square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

let who_player = ''; //Ou será 'X' ou 'O'
let warning_result = '';
let has_playing = false;

reset_game();

// EVENTS
document.querySelector('.button-reset').addEventListener('click', reset_game); //Quando o usuário clicar no botão de resetar, este comando chama a função responsável por resetar o jogo, e então o jogo é resetado do começo.
document.querySelectorAll('.item').forEach(item => { //Comando responsável por adicionar a função de clique em cada uma das áreas do jogo da velha. Ele identifica qual foi a área clicada e faz o evento de clique.
    item.addEventListener('click', fieldSquareClick);
});


// FUNCTIONS
function fieldSquareClick(event) {
    let item = event.target.getAttribute('data-item'); //Achamos qual área foi clicada no jogo da velha.
    if(has_playing && field_square[item] === ''){ //Se ninguém ainda ganhou(ou seja o jogo ainda está rolando) o jogado tiver clicado em uma área onde ainda está vazia, então ele marca a letra da vez do jogador. Por exemplo, se o jogador da vez é X, e o usuário tiver clicado em uma área vazia, ele irá marcar a área com um X. Assim não ficará mais vazia aquela área que ele clicou, ela teria informação.
        field_square[item] = who_player;
        updateFieldSquare();
        generatePlayer();
    }
}

function reset_game() { //Função responsável por resetar o jogo inteiro, e deixar ele pronto para iniciar tudo de novo do zero.
    warning_result = ''; //A mensagem de aviso será limpada.

    let random = Math.floor(Math.random() * 2); //A função escolherá aleatoriamente ou Bolinha ou X para começar a jogada.
    who_player = random === 0 ? 'x' : 'o';

    for (let i in field_square) { //Para cada área do jogo da velha ele deixará vazio
        field_square[i] = '';
    }

    //Com isso, ele chamará a função responsável por interagir com o jogo em questão de jogada, que no caso é o a função que determina qual lugar o usuário clicou para realizar a jogada emarca o lugar de acordo com a jogada que ele fez... E também chama a função que exibe as informações de quem é a vez de jogar e também as mensagens de quem é o vencedor.
    updateFieldSquare();
    updateFieldInformation();

    has_playing = true; //A variável responsável por armazenar se tem ou não jogador para jogar no momento, irá começar com verdadeiro, uma vez que o sistema escolherá ou X ou bolinha para começar a jogada, já que ele está resetando.
}

function updateFieldSquare() { //Irá percorrer o meu jogo da velha e ve se tem alguma coisa preenchida. Se tiver, ele modifica o HTML e coloca o X ou o O. Isso vai depender do que foi selecionado.
    for(let i in field_square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        if(field_square[i] !== ''){
            item.innerHTML = field_square[i]; //Se tiver vazio, ele deixará vazio. Se tiver com algo preenchido, ele colocará com o que foi preenchido. De acordo com o que tá no objeto ele irá coocar na tela.
        } else {
            item.innerHTML = '';
        } 
    }

    checkWhoWon(); //É necessário chamar esta função aqui para que após modificar visualmente o campo colocando a escolha do usuário, ele já verifique se alguém ganhou ou não
}

function updateFieldInformation() { //
    document.querySelector('.player').innerHTML = who_player; //Ele exibe de quem está sendo a vez de jogar no momento.
    document.querySelector('.result').innerHTML = warning_result; //Se tiver alguma mensagem de quem ganhou no Warning, ele irá exibirá.
}

function generatePlayer(){ //Esta função é basicamente para alternar o player que vai jogar da próxima vez.
    who_player = who_player === 'x' ? 'o' : 'x'; //Se quem estiver jogando foi 'o', então o próximo a jogar é o 'x'. E vice-versa.
    updateFieldInformation();
}

function checkWhoWon() { //Função responsável por ver se alguém ganhou, se deu empate, ou se ainda não teve resultado e tem quadros a serem preenchidos para ele permitir a jogada continua.
    //Se alguém vencer ou der velha ele para o jogo e exibe a respectiva mensagem
    if(checkingWinner('x')) {
        warning_result = 'O "X" venceu!!!';
        has_playing = false;
    } else if(checkingWinner('o')){
        warning_result = 'O "O" venceu!!!';
        has_playing = false;
    } else if(fullFields()){
        warning_result = 'Deu velha!!!';
        has_playing = false;
    }
}

function checkingWinner(who_player){
    let possibilities = [ //Vari[avel com todas as possibilidades de ganhar]
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for(let w in possibilities) {
        let eachPossibilitiesArray = possibilities[w].split(','); //Função responsável por selecionar a variável 'possibilities' e criar um array com cada opção em cada vírgula nela. Ele achará a primeira vírgula e fechará um array com aquelas opções que colocamos, e fará assim a cada vírgula que encontrar dentro do array 'possibilities'. Ficando assim um array para cada opção de ganhar as jogadas.
        let someoneWon = eachPossibilitiesArray.every(option => field_square[option] === who_player);
        if(someoneWon) //Se algém vencer ele para a execução do jogo e dá a mensagem que alguém ganhou.
            return true;
    }

    return false; //Se não achar nenhum vencedor, então retorna falso e exibe a mensagem que deu velha.
}

function fullFields(who_player) {
    for(let i in field_square){ //Se tem um quadrinho vazio esperando para ser preenchido, então retorna falso e continua o jogo
        if(field_square[i] === ''){
            return false;
        }
    }

    return true; //Se tiver com todos os campos preenchidos, significa que todos os campos estão preenchidos.

}