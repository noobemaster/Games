const gameBord=document.getElementById("gameBoard");
const gameBox=document.getElementById("gameBox");
const ctx=gameBord.getContext("2d");
const gameScore=document.getElementById("gameScore1");
const easyBtn=document.getElementById("easy");
const mediumBtn=document.getElementById("medium");
const pauseBtn=document.getElementById("pause");
const playBtn=document.getElementById("continue");
const restartBtn=document.getElementById("restart");
const gameWidth=gameBoard.width;
const gameHeight=gameBoard.height; 
const ballRadius=12.5;  
const paddleSpeed=50;  
let ballVelocity=1;
let intervalId; 
let XD=0;
let YD=0;
let ballx=gameWidth/2;
let bally=gameHeight/2;
let p1score=0;
let p2score=0;
let paddle1={width:20, height:100,x:0,y:0};
let paddle2={width:20, height:100,x:gameWidth-20,y:gameHeight-100};
window.addEventListener("keydown",changeDirection);
gameStart();
function changeDirection(event){
    const keyPressed=event.keyCode,p2up=37,p2down=39,p1up=87,p1down=83,pause=32;
    console.log(keyPressed);
    switch(true){
        case(keyPressed==p1up):
        if(paddle1.y>0){paddle1.y-=paddleSpeed}break;

        case(keyPressed==p1down):
        if(paddle1.y<gameHeight-paddle1.height){paddle1.y+=paddleSpeed;} break;

        case(keyPressed==p2up):
        if(paddle2.y>0){paddle2.y-=paddleSpeed}break;

        case(keyPressed==p2down):
        if(paddle2.y<gameHeight-paddle2.height){paddle2.y+=paddleSpeed;} break;

        case(keyPressed==pause):
            pauseGame(); break;
    }
}
function gameStart(){
    running=0;
   // gameScore.textContent=score;
    createBall();
    nextTick();
};
function nextTick(){
    if(running==0){
        setTimeout(()=>{
        clearBoard();drawPaddle();
        moveBall(); drawBall(ballx,bally);       
        checkCollision();
        nextTick();},20)
    }
    else if(running==1){displayPaused(); }
    else displayGameOver();
};
function clearBoard(){
    ctx.fillStyle="#0000ff";
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function drawPaddle(){
    ctx.fillStyle="red";
    ctx.strokeStyle="black";
    ctx.fillRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
    ctx.strokeRect(paddle1.x,paddle1.y,paddle1.width,paddle1.height);
     ctx.fill();ctx.stroke();
    ctx.fillStyle="green";
    ctx.strokeStyle="black";
    ctx.fillRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
    ctx.strokeRect(paddle2.x,paddle2.y,paddle2.width,paddle2.height);
    ctx.fill();ctx.stroke();
}; 
function createBall(){
    ballVelocity=1;
    if(Math.round(Math.random())==1){XD=1;}
    else{XD=-1;}
    if(Math.round(Math.random())==1){YD=1;}
    else{YD=-1;}
    bally=gameHeight/2;  
    ballx=gameWidth/2;
    drawBall(ballx,bally);  
};
function moveBall(){
    ballx+=(ballVelocity*XD);
    bally+=(ballVelocity*YD);
};
function drawBall(ballx,bally){
    ctx.fillStyle="yellow";
    ctx.strokeStyle="black";ctx.lineWidth=2;
    ctx.beginPath();
    ctx.arc(ballx,bally,ballRadius,0,2*Math.PI );
    ctx.fill();ctx.stroke();
};
function checkCollision(){
if(bally>=gameHeight-ballRadius){YD*=-1;}
if(bally<=ballRadius){YD*=-1;}
if(ballx<0){
    p2score++;
    updateScore();
    createBall();return;
}
if(ballx>=gameWidth){
    p1score++;
    updateScore();
    createBall();return;
}
   
if(ballx<=(paddle1.x+paddle1.width+ballRadius)){
         if(bally> paddle1.y&&bally<paddle1.y+paddle1.height){
            ballx=(paddle1.x+paddle1.width)+ballRadius;//if ball gets stuck
            XD *=-1;ballVelocity+=0.2;}}
if(ballx>=(paddle2.x-ballRadius)){
         if(bally> paddle2.y&&bally<paddle2.y+paddle2.height){
            ballx=paddle2.x-ballRadius;
            XD*=-1;ballVelocity+=0.2;}}
      
};
function updateScore(){
    gameScore.textContent=`${p1score} : ${p2score}`;
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
    running=0;
    ballVelocity=1;p1score=0;p2score=0;ballVelocity=1;XD=0;YD=0;
    paddle1={width:20, height:100,x:0,y:0};
    paddle2={width:20, height:100,x:gameWidth-20,y:gameHeight-100};
    updateScore();clearInterval(intervalId);
    gameStart();
}
