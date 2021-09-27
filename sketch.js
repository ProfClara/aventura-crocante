var ENCERRAR = 0;
var JOGAR = 1;
var estado_do_jogo = JOGAR;
var dino, dino_correndo; 
var bordas, chao, deserto, chao_invisivel;
var dino_bateu;
var gameOver, resetImg,reset;

function preload(){
  dino_correndo = loadAnimation("trex1.png","trex3.png","trex4.png"); 
  deserto = loadImage("ground2.png");
  nuvenzinha = loadImage("cloud.png");
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  dino_bateu = loadAnimation("trex_collided.png");
  gameOverImg = loadImage("gameOver.png");
  resetImg = loadImage("restart.png");
  ceu = loadImage("ceu-estrelas.jpg");
}

// configuração do jogo
function setup(){
    createCanvas(600,200);
    dino = createSprite(50,160,20,50);
    dino.addAnimation("running", dino_correndo);
    bordas  = createEdgeSprites();
    dino.scale = 0.5;
    dino.x = 30;
    chao = createSprite(200,180,400,20);
    chao.addImage("ground",deserto );
    chao_invisivel = createSprite(300,190,600,10);
    chao_invisivel.visible = false; 
    grupodeobstaculos = new Group();
    grupodenuvem = new Group();
    pontuacao=0;
  dino.debug = true;
  dino.setCollider("circle",0,0,40);
  dino.addAnimation("collided", dino_bateu);
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  reset = createSprite(300,150,10);
  reset.scale = 0.05;
 reset.addImage("resetImg", resetImg);
} 
  
function draw(){
  background(ceu);
  text("pontuacao "+ pontuacao,500,50);
  dino.collide(chao_invisivel);
  chao.velocityX = -6;
  if( estado_do_jogo === JOGAR){
    gameOver.visible = false;
    reset.visible = false;
      pontuacao=pontuacao+Math.round(frameCount/10);
      gerarNuvens();
      gerarObstaculos();
      dino.velocityY = dino.velocityY+0.9;  
      if(chao.x<0){
        chao.x = chao.width/2;
      }
      if(keyDown("space") && dino.y >=150 ){
      dino.velocityY = -10;
      }
      if(grupodeobstaculos.isTouching(dino)){ 
        estado_do_jogo=ENCERRAR;
      }     
  }
  else if( estado_do_jogo === ENCERRAR){
    gameOver.visible = true;
    reset.visible = true;
    dino.changeAnimation("collided", dino_bateu);
      chao.velocityX = 0;  
      grupodeobstaculos.setVelocityXEach(0);
      grupodenuvem.setVelocityXEach(0); 
    if(mousePressedOver(reset)){
      resetar();
    }
  } 
drawSprites();
  
}
function resetar(){
  estado_do_jogo = JOGAR;
  gameOver.visible = false;
  reset.visible = false;
  grupodeobstaculos.destroyEach();
  grupodenuvem.destroyEach();
  dino.changeAnimation("running", dino_correndo);
  pontuacao = 0;
}

function gerarNuvens(){
  if(frameCount%60 === 0){
  nuvem = createSprite(600,100,40,10);
  nuvem.velocity.x = -3
  nuvem.addImage(nuvenzinha);
  nuvem.y = Math.round(random(30,200))
  nuvem.scale = 0.5
  nuvem.lifetime = 200;
  nuvem.depth = dino.depth
  dino.depth = dino.depth + 1
  grupodenuvem.add(nuvem);    
  }   
}


function gerarObstaculos(){
  if(frameCount%60 === 0){
    var obstacle = createSprite(600,165,10,40);
    obstacle.lifetime = 100; 
    obstacle.velocityX = -6    
    obstacle.scale = 0.5   
    grupodeobstaculos.add(obstacle); 
    var rand = Math.round(random (1,6));
    switch(rand){
      case 1: obstacle.addImage(obstaculo1);
      break;
      case 2: obstacle.addImage(obstaculo2);
      break;
      case 3: obstacle.addImage(obstaculo3);
      break;
      case 4: obstacle.addImage(obstaculo4);
      break;
      case 5: obstacle.addImage(obstaculo5);
      break;
      case 6 : obstacle.addImage(obstaculo6); 
      break;   
    }           
  }
}
  