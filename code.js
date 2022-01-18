var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["47b0665c-3b0e-48b6-959b-e199038bc37e","1176d565-db1e-4584-8dcd-2f1cba4a9456"],"propsByKey":{"47b0665c-3b0e-48b6-959b-e199038bc37e":{"name":"sbot","sourceUrl":null,"frameSize":{"x":50,"y":50},"frameCount":1,"looping":true,"frameDelay":12,"version":"KepRWivr7in3ydrtSf7hJmc4gBBOkEme","loadedFromSource":true,"saved":true,"sourceSize":{"x":50,"y":50},"rootRelativePath":"assets/47b0665c-3b0e-48b6-959b-e199038bc37e.png"},"1176d565-db1e-4584-8dcd-2f1cba4a9456":{"name":"s bot-1.png.png_1","sourceUrl":"assets/v3/animations/_WT2-Py92se61_SkqUV5escUEge-3Y12-W52XBRQCRA/1176d565-db1e-4584-8dcd-2f1cba4a9456.png","frameSize":{"x":200,"y":200},"frameCount":1,"looping":true,"frameDelay":4,"version":"BW6W9zYO58jdUzHMbWn9.Q04axGXgDTM","loadedFromSource":true,"saved":true,"sourceSize":{"x":200,"y":200},"rootRelativePath":"assets/v3/animations/_WT2-Py92se61_SkqUV5escUEge-3Y12-W52XBRQCRA/1176d565-db1e-4584-8dcd-2f1cba4a9456.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//jogador e bots
var gregory = createSprite(25, 340, 10, 10);
gregory.shapeColor = "blue"; 
var sbot = createSprite(75, 282, 11, 11);
var sbot1 = createSprite(205, 282, 11, 11);
var sbot2 = createSprite(278, 273, 11, 11);
var sbot3 = createSprite(278, 135, 11, 11);
var sbot4 = createSprite(393,65, 11, 11);
var mapbot = createSprite(135, 393, 11, 11);
var mapbot1 = createSprite(265, 393, 11, 11);
var mapbot2 = createSprite(393, 200, 11, 11);
var saida = createSprite(335, 5, 130, 25);
saida.shapeColor = rgb(211, 222, 220);
 
 
 
//velocidade dos bots
sbot.velocityY = 12;
sbot1.velocityY = 9;
sbot2.velocityX = 12;
sbot3.velocityX = 10;
sbot4.velocityX = 16;

mapbot.velocityY = -7;
mapbot1.velocityY = -6;
mapbot2.velocityX = -8;


//paredes
var wall1 = createSprite(125, 272, 290,5);
wall1.shapeColor = "gray";
var wall2 = createSprite(268, 128, 5, 290);
wall2.shapeColor = "gray";


var lifes = 10;
var gameState = 1;

function walk(){
   //faz o jogador se mecher
    if(keyDown(RIGHT_ARROW)){
     gregory.x = gregory.x +3;
    }
    if(keyDown(LEFT_ARROW)){
     gregory.x = gregory.x -3;
    }
    if(keyDown(UP_ARROW)){
     gregory.y = gregory.y -3;
    }
    if(keyDown(DOWN_ARROW)){
     gregory.y = gregory.y +3;
    }
    }
   
   function bots(){
//faz bots capturarem o jogador
   if(gregory.isTouching(sbot) ||
    gregory.isTouching(sbot1) ||
    gregory.isTouching(sbot2) ||
    gregory.isTouching(sbot3) ||
    gregory.isTouching(sbot4)){
     gregory.x = 25;
     gregory.y = 340;
     lifes = lifes - 1;
     playSound("assets/category_alerts/playful_game_error_sound_4.mp3");
    }
     
   if(gregory.isTouching(mapbot) ||
    gregory.isTouching(mapbot1) ||
    gregory.isTouching(mapbot2)){
     gregory.x = 25;
     gregory.y = 340;
     lifes = lifes - 1;
     playSound("assets/category_alerts/playful_game_error_sound_5_long.mp3");
    }
   }



function draw() {
  background("white");
  
  //faz os bots e o jogador quicarem
   createEdgeSprites();
   gregory.bounceOff(edges);
   gregory.bounceOff(wall1);
   gregory.bounceOff(wall2);
   sbot.bounceOff(edges);
   sbot.bounceOff(wall1);
   sbot1.bounceOff(edges);
   sbot1.bounceOff(wall1);
   sbot2.bounceOff(edges);
   sbot2.bounceOff(wall1);
   sbot3.bounceOff(edges);
   sbot3.bounceOff(wall2);
   sbot4.bounceOff(edges);
   sbot4.bounceOff(wall2);
   mapbot.bounceOff(edges);
   mapbot.bounceOff(wall1);
   mapbot1.bounceOff(edges);
   mapbot1.bounceOff(wall1);
   mapbot2.bounceOff(edges);
   mapbot2.bounceOff(wall2); 

     //estados do jogo
    if(gameState == 1){
     walk();
      bots();
      if(lifes == 0){
      gameState = 2;
     }
     if(gregory.isTouching(saida)){
     gameState = 3;
    }
    }
    
    if(gameState == 2){
    textSize(20);
    fill("red");
    text("você foi capturado!", 90, 200);
    }
    
     if(gameState == 3){
     fill("red");
     textSize(30);
     text("você fugiu", 110, 200);
     playSound("assets/category_achievements/lighthearted_bonus_objective_2.mp3", false);
     }
     
  //começo e linha de chegada
   strokeWeight(0);
   fill(rgb(146, 169, 189));
   rect(0, 274, 57, 125);
   strokeWeight(0);
   fill(rgb(146, 169, 189));
   rect(270, 0, 129, 57);
   
   //vida do jogador
   textSize(15);
   text("vidas:" + lifes, 180, 250);
    

 drawSprites();
}


// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
