var database;
var gameState = 0 ;
var ground;
var player1,player2;
var plf1,plb1,pli1,p1a1,p1a2,p1a3,p1a4;
var plf2,plb2,pli2,p2a1,p2a2,p2a3,p2a4;
//plf1/2=playerfront,plb1/2=player back,pli1/2=player idle
var formObj,gameObj;
var playerCount = 0;
var player1Left = false ,player1Right = false,player1Attack=false,player2Left=false,player2Right=false,player2Attack=false;
var player1Health =100,player2Health =100;



function preload(){
//player 1 animation
plf1 = loadAnimation("images/player1/running1/1.png","images/player1/running1/2.png","images/player1/running1/3.png","images/player1/running1/4.png","images/player1/running1/5.png","images/player1/running1/6.png");
plb1 = loadAnimation("images/player2/running2/1.png","images/player2/running2/2.png","images/player2/running2/3.png","images/player2/running2/4.png","images/player2/running2/5.png","images/player2/running2/6.png");
pli1 = loadImage("images/player1/attack1.1/player1.png");
p1a1 = loadAnimation("images/player1/attack1.1/player1.png","images/player1/attack1.1/player2.png","images/player1/attack1.1/player3.png","images/player1/attack1.1/player4(1).png");
p1a2 = loadAnimation("images/player1/attack1.2/player1.png","images/player1/attack1.2/player3.png","images/player1/attack1.2/player4.png");
//player 2 animations
plf2 = loadAnimation("images/player2/running2/1.png","images/player2/running2/2.png","images/player2/running2/3.png","images/player2/running2/4.png","images/player2/running2/5.png","images/player2/running2/6.png");
plb2 = loadAnimation("images/player1/running1/1.png","images/player1/running1/2.png","images/player1/running1/3.png","images/player1/running1/4.png","images/player1/running1/5.png","images/player1/running1/6.png");
pli2 = loadImage("images/player2/attack2.1/player1.png");
p2a1 = loadAnimation("images/player2/attack2.1/player1.png","images/player2/attack2.1/player2.png","images/player2/attack2.1/player3.png","images/player2/attack2.1/player4(2).png");
p2a2 = loadAnimation("images/player2/attack2.2/player1.png","images/player2/attack2.2/player3.png","images/player2/attack2.2/player4.png");
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  database = firebase.database();
  gameObj = new Game();
  gameObj.getGameState();
  console.log(gameState);
  gameObj.startGame();
  


 
}
function barStatus(type,y,w,color){ 
    stroke(color);
    fill(color);
    textSize(15);
    text(type,width-150,y-10); 
    fill("WHITE");
    rect(width-150,y,100,20);
    fill(color);
    rect(width-150,y,w,20);
}



function draw() {
  background(255,255,255);  
  if(playerCount===2){
    //gamestate should be updated in fbc
    console.log(playerCount);
    gameObj.updateGameState(1);
  }
  if(gameState===1){
    clear();
    gameObj.playGame();

  }
if (gameState===2){
  console.log("gameOver");
  alert("game over");
  
}
}