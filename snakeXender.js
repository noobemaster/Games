const gameBord=document.getElementById("gameBoard");
const gameBox=document.getElementById("gameBox");
const ctx=gameBord.getContext("2d");
const gameScore=document.getElementById("gameScore");
const easyBtn=document.getElementById("easy");
const mediumBtn=document.getElementById("medium");
const pauseBtn=document.getElementById("pause");
const playBtn=document.getElementById("continue");
const restartBtn=document.getElementById("restart");
const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height; 
let unitSize=25;  
let yVelocity=0;
let xVelocity=unitSize; 
let running=0;
let foodx;
let foody;
let score=0;
let snake=[
    {x:unitSize*3,y:0},{x:unitSize*2,y:0},
    {x:unitSize,y:0},{x:0,y:0}
];
let time=500;
gameBoard.style.display='none';
window.addEventListener("keydown",changeDirection);
easyBtn.addEventListener("click",easy);
mediumBtn.addEventListener("click",medium);
function changeDirection(event){
    const keyPressed=event.keyCode,up=38,down=40,left=37,right=39;
    const upd=(yVelocity==-unitSize),downd=(yVelocity==unitSize); 
    const leftd=(xVelocity==-unitSize),rightd=(xVelocity==unitSize);
    switch(true){
    case(keyPressed==left&&!rightd):
      xVelocity=-unitSize;yVelocity=0; break;
      case(keyPressed==right&&!leftd):
      xVelocity=unitSize;yVelocity=0; break;
      case(keyPressed==down&&!upd):
      yVelocity=unitSize;xVelocity=0; break;
      case(keyPressed==up&&!downd):
      xVelocity=0;yVelocity=-unitSize; break;
    }
    
};
function easy(){
    gameStart();gameBoard.style.display="unset";
easyBtn.style.display="none";mediumBtn.style.display="none";
function gameStart(){
    running=0;
    gameScore.textContent=score;
    createFood();
    nextTick();
};
function nextTick(){
    if(running==0){
        setTimeout((event)=>{
        clearBoard();
        drawFood();
        moveSnake();drawSnake();         
        checkGameOver();;
        nextTick();},time)
    }
    else if(running==1){displayPaused(); }
    else displayGameOver();
};
function clearBoard(){
    ctx.fillStyle="#fffdd0";
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function createFood(){
    function rando(min, max){
        const num=Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize
        return num
    }
    foodx=rando(0,gameWidth-unitSize);
    foody=rando(0,gameHeight-unitSize);
    //prevents food on body
    for(let i=0;i<snake.length;i++){
        while(foodx==snake[i].x&&foody==snake[i].y){
            createFood();drawFood(); }  }
   
};
 function drawFood(){
    ctx.fillStyle="red";
    ctx.fillRect(foodx,foody,unitSize,unitSize)
};
function moveSnake(){
    const head= {x:snake[0].x+xVelocity,y:snake[0].y+yVelocity};
    snake.unshift(head);
    if(snake[0].x==foodx&&snake[0].y==foody){
        score++;
        gameScore.innerHTML=`score:${score}`;
        createFood();
        //increases speed
    if(time>50){
        time-=5;console.log(time);}
    }
    else snake.pop();
};
function drawSnake(){
    //the snakes appearance
    ctx.fillStyle="blue";
    ctx.strokeStyle="black";
    snake.forEach(snakePart=>{
        ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);
        ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize);})
     //color of snake head
    ctx.fillStyle="lightblue";ctx.strokeStyle="black";
    ctx.fillRect(snake[0].x,snake[0].y,unitSize,unitSize);
    ctx.strokeRect(snake[0].x,snake[0].y,unitSize,unitSize);
   
    };
function checkGameOver(){
    //crosses the snake through the boarders
     switch(true){
     case (snake[0].x>gameWidth):snake[0].x=-unitSize;break;
    case(snake[0].y>gameHeight-unitSize):snake[0].y=-unitSize;break;
    case(snake[0].x<0):snake[0].x=gameWidth;break;
    case(snake[0].y<0):snake[0].y=gameHeight; break;      
    } 
    //if you want to bite yourself==gameover
    /* for(let i=1;i<snake.length;i++){ 
      if(snake[i].x==snake[0].x&&snake[i].y==snake[0].y){
        running=3;
    
      };} 
 */
};
function displayGameOver(){
    clearBoard();drawSnake();
    ctx.font="90px MV Boli";
    ctx.fillStyle="red";
    ctx.textAlign="center";
    ctx.fillText("Game over!!!",gameWidth/2,gameHeight/2);running=3;
};
pauseBtn.addEventListener("click",pauseGame);
function pauseGame(event){
        running=1;
};
function displayPaused(){
    ctx.font="80px MV Boli";
    ctx.fillStyle="darkgreen";
    ctx.textAlign="center";
    ctx.fillText("Game Paused",gameWidth/2,gameHeight/2);running=1;
};
playBtn.addEventListener("click",playGame);
function playGame(){
    if(running==3){
        displayGameOver();
    }
    else  running=0;nextTick();
};
restartBtn.addEventListener("click",restartGame);
function restartGame(){
    snake=[
        {x:unitSize*3,y:0},{x:unitSize*2,y:0},
        {x:unitSize,y:0},{x:0,y:0}
    ];
    time=500;
    score=0;running=0;gameStart();
    //xVelocity=unitSize; yVelocity=0;
}; };
function medium(){
gameStart();gameBoard.style.display="unset";
easyBtn.style.display="none";mediumBtn.style.display="none";
function gameStart(){
    running=0;
    gameScore.textContent=score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running==0){
        setTimeout(()=>{
        clearBoard();
        drawFood();
        moveSnake();drawSnake();         
        checkGameOver();
        nextTick();},time)
    }
    else if(running==1){displayPaused(); }
    else displayGameOver();
};
function clearBoard(){
    ctx.fillStyle="#fffdd0";
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function createFood(){
    function rando(min, max){
        const num=Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize
        return num
    }
    foodx=rando(0,gameWidth-unitSize);
    foody=rando(0,gameHeight-unitSize);
    //prevents food on body
    for(let i=0;i<snake.length;i++){
        while(foodx==snake[i].x&&foody==snake[i].y){
            createFood();drawFood(); }  }
};
 function drawFood(){
    ctx.fillStyle="red";
    ctx.fillRect(foodx,foody,unitSize,unitSize)
};
function moveSnake(){
    const head= {x:snake[0].x+xVelocity,y:snake[0].y+yVelocity};
    snake.unshift(head);
    if(snake[0].x==foodx&&snake[0].y==foody){
        score++;
        gameScore.innerHTML=`score:${score}`;
        createFood();
        if(time>80){
            time-=2.5;}
    }
    else snake.pop();
};
function drawSnake(){
    ctx.fillStyle="blue";
    ctx.strokeStyle="black";
    snake.forEach(snakePart=>{
        ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);
        ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize);})
        //snake head color
        ctx.fillStyle="lightblue";ctx.strokeStyle="black";
        ctx.fillRect(snake[0].x,snake[0].y,unitSize,unitSize);
        ctx.strokeRect(snake[0].x,snake[0].y,unitSize,unitSize);  
};
function checkGameOver(){
     if(snake[0].x>gameWidth-unitSize||snake[0].x<0||
        snake[0].y>gameHeight-unitSize||snake[0].y<0){
       running=3;       
    } 
    for(let i=1;i<snake.length;i++){ 
      if(snake[i].x==snake[0].x&&snake[i].y==snake[0].y){
        running=3;};
    }
};
function displayGameOver(){
    clearBoard();drawSnake();
    ctx.font="90px MV Boli";
    ctx.fillStyle="red";
    ctx.textAlign="center";
    ctx.fillText("Game over!!!",gameWidth/2,gameHeight/2);running=false;
};
pauseBtn.addEventListener("click",pauseGame);
function pauseGame(){
     running=1;
};
function displayPaused(){
    ctx.font="80px MV Boli";
    ctx.fillStyle="darkgreen";
    ctx.textAlign="center";
    ctx.fillText("Game Paused",gameWidth/2,gameHeight/2);running=1;
};
playBtn.addEventListener("click",playGame);
function playGame(){
     running=0;nextTick();
};
restartBtn.addEventListener("click",restartGame);
function restartGame(){
    snake=[
        {x:unitSize*3,y:0},{x:unitSize*2,y:0},
        {x:unitSize,y:0},{x:0,y:0}
    ];
    time=500;score=0;running=0;gameStart();
};};
