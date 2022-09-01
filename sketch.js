var PLAY = 1;
var END = 0;
var gameState = PLAY;
var fantasma
var fantasmamoviendose, fantasmamuerto;
var invisibleGround
//var fondo


var obstaclesGroup, obstaculo , obstaculo2

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  fantasmamoviendose = loadAnimation("SeñorFantasma1.png");
  fantasmamuerto = loadAnimation("SeñorFantasmaF.png");
  //fondo = loadAnimation ("Fondo.webp");
  
  
  
  
  obstaculo = loadImage("Obstaculo1.png");
  obstaculo2 = loadImage("Obstaculo2.png")
  
  botonrestart = loadImage("Restart.png")
  gameover = loadImage("Gameover.png")
  
  
}

function setup() {
  createCanvas(800, 200);

 
  fantasma = createSprite(50,150,20,50);
  fantasma.addAnimation("running", fantasmamoviendose);
  fantasma.addAnimation("collided", fantasmamuerto);
  
 
  
  fantasma.scale = 0.1;
  //fondo = createSprite (400,400,800,800);
 // fondo.addImage(fondo1);
  ground = createSprite(780,190,10000,20);
  
  ground.x = ground.width /2;
  
  gameOver = createSprite(400,60);
  gameOver.addImage(gameover);
  
  restart = createSprite(400,140);
  restart.addImage(botonrestart);
  
 
  gameOver.scale = 0.3;
  restart.scale = 0.1;
  
  invisibleGround = createSprite(160,190,400,10);
  invisibleGround.visible = false;
  
  
  obstaclesGroup = createGroup();
  

  
  fantasma.setCollider("rectangle",0,0,fantasma.width,fantasma.height);

  
  score = 0;
  
}

function draw() {
  fantasma.setCollider("circle",0,0,500)
  background("black");
  
  text("Puntuación: "+ score, 680,40);
  
  if(mousePressedOver(restart)){
reinicio();
  }
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
   
    if(keyDown("space")&& fantasma.y >= 100) {
        fantasma.velocityY = -12;
        //jumpSound.play();
    }
    
    
    fantasma.velocityY = fantasma.velocityY + 0.8
  
    
  
   
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(fantasma)){
        
        //jumpSound.play();
        gameState = END;
        //dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     
      fantasma.changeAnimation("collided", fantasmamuerto);
    
     
     
      ground.velocityX = 0;
      fantasma.velocityY = 0
      
     
      
    obstaclesGroup.setLifetimeEach(-1);
    
     
     obstaclesGroup.setVelocityXEach(0);
    
   }
  
 
  
  fantasma.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}
function reinicio(){
  fantasma.changeAnimation("running");
  gameState=PLAY;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  
  score=0;

}
function reset(){
  

}


function spawnObstacles(){
 if (frameCount % 50 === 0){
    obstacle = createSprite(width,140,10,40);
   obstacle.velocityX = -(6 + 3*score/100);
   obstacle.scale=0.11
    //generar obstáculos al azar
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstaculo);
              break;
      case 2: obstacle.addImage(obstaculo2);
              break;
    
      default: break;
      
    }
    obstacle.setCollider("circle",0,0,50)


    
    obstacle.scale = 0.11;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
}




