var PLAY = 0;
var END = 1;
var gameState = PLAY;

var monkey , monkey_running , m ;

var banana ,bananaImage, obstacle, obstacleImage;
var FruitGroup, obstacleGroup;

var Ground;

var reset, resetImage;

var forest, forestImage;

var ropeImage;

var bananaScore;

function preload(){
   
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  m = loadAnimation ("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  resetImage = loadImage("restart.png");
  forestImage=loadImage("forest.jpg");
  ropeImage = loadImage("rope.png");
  
}



function setup() {
     
  createCanvas(570,450);
  
  
  forest = createSprite(50,100);
  forest.addImage(forestImage);
  forest.scale=3;
    
  

  
  monkey = createSprite(100,325,10,10);
  monkey.addAnimation("monkey",monkey_running);
    monkey.addAnimation("m",m);

  monkey.scale= 0.1;
  
  ground= createSprite(230,448,1000);
  ground.visible=false;
       
  
  reset = createSprite(285,225,40,40);
  reset.addImage(resetImage);

  bananaScore = 0;

  
  fruitGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  
  
  
 if (gameState===PLAY){ 
   monkey.scale=0.1;
   var index = 0;
   camera.position.x = displayWidth/2;
  camera.position.y = monkey[index-1];
   
   
   
   reset.visible=false;
       bananas();
       obstacles();
   
     
  
   
   if(fruitGroup.isTouching(monkey)){
      fruitGroup.destroyEach(); 
     bananaScore++;
     monkey.scale=monkey.scale+0.05;
   }
  
   monkey.velocityY = monkey.velocityY + 1;
   monkey.collide(ground);
   
  if(keyDown("space")&& monkey.y >= 80){    
      monkey.velocityY=-10;
      }
  
   
   if(obstacleGroup.isTouching(monkey)){
     monkey.scale=monkey.scale-0.1;
       gameState = END;
     reset.visible=true;
   }
 }
  
  if (gameState === END){
  
  fruitGroup.destroyEach();
    
    monkey.changeAnimation ("m", m);
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
  
    
}
  
  monkey.collide(ground);
  
  if(mousePressedOver(reset)){
    gameState=PLAY;
    reset.visible=false;
    fruitGroup.setLifetimeEach(0);
    obstacleGroup.setLifetimeEach(0);
    monkey.changeAnimation("monkey",monkey_running);
    bananaScore=0;
  }
    
  

drawSprites(); 
  
  fill("white");
  stroke ("bold")
  textSize(15)
  
  text("BANANAS COLLECTED = " + bananaScore, 10,20);
}



function bananas(){
  
  if (frameCount%140===0){
             
    banana = createSprite(570,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(70,230));
    banana.scale = 0.1;
    
    banana.velocityX = -7;
    banana.lifetime = 200; 
    
    fruitGroup.add(banana)
  }
}
   
function obstacles(){
  
  if (frameCount%100===0){
    
    obstacle = createSprite(570,360,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
    obstacle.scale = 0.18 ;
    obstacle.lifetime = 200
//  obstacle.debug = true;
    obstacle.rotation = 5;
   
    obstacle.setCollider("rectangle",0,0,380,380);
    
    obstacleGroup.add(obstacle);    
  }
}



