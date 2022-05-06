let canvas = document.getElementById("snake");
/*
o getContext ("2d"); ele desenha, ele renderiza o desenho que vai acontecer dentro do canvas
Colocando como 2d ele vai passar a tratar o arquivo como m plano de 2d
*/
let context = canvas.getContext ("2d");
/*
aqui determinamos que a variavel box tera o valor 32
esse valor sera cara quadradinho que aparecer na tela.
*/
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box 
}

let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    /*
    O fillStyle e como se fosse um atributo de css.
    ou seja ele esta atribuindo alguma coisa no formato css.
    */
    context.fillStyle = "lightgreen";
    /*
    o fillRect ele vai desenhar o nosso retangulo, aonde vai acontecer o jogo
    */
    context.fillRect (0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood () {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";

}


function iniciarJogo () {
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0        && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0        && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)

}

let jogo = setInterval(iniciarJogo, 100);