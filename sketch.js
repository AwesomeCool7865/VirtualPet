var dog, dogIMG, happyDog;
var database;
var foodS, foodStock;

function preload(){
  dogIMG = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);

  database= firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(250, 250, 50,50);
  dog.addImage(dogIMG);
  dog.scale= 0.125;
  
}


function draw() {  
  background(197,245,196)

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  if (keyWentUp(UP_ARROW)){
    dog.addImage(dogIMG);
  }


  drawSprites();
  //add styles here
  fill(0,0,0);
  textSize(18)
  text("Food: " + foodS, 400, 20)
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



