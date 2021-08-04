//ceating variables for the bow and arrow
var bow, arrow

//creating variables for the score and missed
var score = 0
var missed = 0
var invisRect

//creating variables for the balloon groups
var RedBGroup 
var BlueBGroup
var PinkBGroup 

function preload(){
 
 //loading the images here 
 backgroundImage = loadImage("background0.png");
 BlueBalloonImage = loadImage("blue_balloon0.png");
 PinkBalloonImage = loadImage("pink_balloon0.png");
 RedBalloonImage = loadImage("red_balloon0.png");
 bowImage = loadImage("bow0.png")
 arrowImage = loadImage("arrow0.png")
}

function setup() {
  
  //setting the size of the canvas
  createCanvas(600, 600);
  
  //crating the bow and arrow
  bow = createSprite(545, 300, 20, 20)
  bow.addImage(bowImage)
  
  arrow = createSprite(510, 300, 20, 20)
  arrow.visible = false;
  arrow.setCollider("rectangle", 0, 0, 200, 50 );
  
  //making groups for the balloons
  RedBGroup = new Group();
  BlueBGroup = new Group();
  PinkBGroup = new Group();

  invisRect = createSprite(300, 5, 600, 3);
  invisRect.visible = false

}


function draw() {

  //setting the background
 background(backgroundImage)
  
  //making the bow move with the mouse
  bow.y = mouseY;
  
  //making the arrow shoot and reset
  if(keyDown("space") && arrow.x ==  510){
  arrow.y = mouseY
  //camera.position.x = arrow.x 
  arrow.visible = true;
  arrow.addImage(arrowImage)
  arrow.scale = 0.3
  arrow.velocityX = -15
  }
  
  if(arrow.x<0){
    arrow.x = 510
    arrow.velocityX = 0
    arrow.visible = false;
  }
  
  //adding to the score if you hit the balloon with the arrow
  if(arrow.isTouching(RedBGroup) && arrow.visible == true){
    RedBGroup.destroyEach();
    arrow.visible = false;
    arrow.x = 510
    arrow.velocityX = 0
    score = score + 1
  }
  if(arrow.isTouching(BlueBGroup) && arrow.visible == true){
    BlueBGroup.destroyEach();
    arrow.visible = false;
    arrow.x = 510
    arrow.velocityX = 0
    score = score + 2
  }
  if(arrow.isTouching(PinkBGroup) && arrow.visible == true){
    PinkBGroup.destroyEach();
    arrow.visible = false;
    arrow.x = 510
    arrow.velocityX = 0
    score = score + 3
  }

    //selecting which balloons are going to appear
    var select_balloon = Math.round(random(1,3));
    if(World.frameCount % 80 == 0){
      if(select_balloon == 1){
        redBalloon();
      }else if(select_balloon == 2){
        blueBalloon();
      }else{
        pinkBalloon();
      }
    }

    //adding to missed if you miss a balloon
  if(RedBGroup.isTouching(invisRect)){
    missed = missed + 1
    RedBGroup[0].destroy();
  }
  if(BlueBGroup.isTouching(invisRect)){
    missed = missed + 1
    BlueBGroup[0].destroy();
  }
  if(PinkBGroup.isTouching(invisRect)){
    missed = missed + 1
    PinkBGroup[0].destroy();
  }
  
  //displaying the sprites
  drawSprites();

  if(missed === 5){
    RedBGroup.destroyEach();
    BlueBGroup.destroyEach();
    PinkBGroup.destroyEach();
    bow.destroy();
    arrow.destroy();
    textSize(50);
    fill(255, 0, 0)
    text("Game Over", 220, 300);
    textSize(40);
    text("Final Score: " + score, 210, 350);
  }
  
  //displaying the score and missed
  textSize(12);
  fill("grey")
  text("Score: " + score, 270, 30)
  text("Missed: " + missed, 270, 50)
  
}

//making the different balloons

function redBalloon(){
  var redBalloon = createSprite(Math.round(random(20, 370)), 600, 10, 10);
  redBalloon.addImage(RedBalloonImage);
  redBalloon.velocityY = -7;
  redBalloon.scale = 0.1
  redBalloon.lifetime = 150
  RedBGroup.add(redBalloon)
}

function blueBalloon(){
  var blueBalloon = createSprite(Math.round(random(20, 370)), 600, 10, 10);
  blueBalloon.addImage(BlueBalloonImage);
  blueBalloon.velocityY = -9;
  blueBalloon.scale = 0.1
  blueBalloon.lifetime = 150
  BlueBGroup.add(blueBalloon)
}

function pinkBalloon(){
  var pinkBalloon = createSprite(Math.round(random(20, 370)), 600, 10, 10);
  pinkBalloon.addImage(PinkBalloonImage);
  pinkBalloon.velocityY = -15;
  pinkBalloon.scale = 1
  pinkBalloon.lifetime = 150
  PinkBGroup.add(pinkBalloon)
}