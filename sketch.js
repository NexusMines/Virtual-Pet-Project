var dog, dogImg, happyDog;
var foodObject, food, foodStock;
var fedTime, lastFed, feed, addFood;    

function preload(){
  dogImg = loadImage("Images/Dog.png");
  happyDog = loadImage("Images/happy dog.png");
}

function setup(){
  database = firebase.database()
  createCanvas(1000,400);
  foodObject = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  dog = createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;
  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);
}

function draw(){
  background(46,139,87);
  foodObject.display();
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed = data.val();
  })
  fill(255,255,254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Fed: "+lastFed%12+"PM",350,30);
  }
  else if(lastFed == 0) {
    text("Last Fed: 12AM ",350,30);
  }
  else {
    text("Last Fed:  " +lastFed+"AM",350,30);
  }
  drawSprites();
}

function readStock(data){
  food = data.val();
  foodObject.updateFoodStock(food);
}

  function feedDog() {
    dog.addImage(happyDog);
    foodObject.updateFoodStock(foodObject.getFoodStock()-1);
    database.ref('/').update({
    Food:foodObject.getFoodStock(),
    FeedTime:hour()
  })
}

function addFood(){
  food++;
  database.ref('/').update({
  Food:food
  })
}