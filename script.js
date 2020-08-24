// jshint esversion: 6


/*
Author: Anthony Noel
This webpage makes use of canvas to give the user an ability to control the direction of a drawn square

Future Dev:
-Make a game out of it like snake
-Switch that check for the correct arrow key with a regex
-Sometimes it leaves a little of the old shape behind
-Make constant values for the x min and max and y min and max and use the document body to get the dimensions of the body
*/


const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d");
//give it some color
ctx.fillStyle = "#ce7d00";
//There is only one size rectangle and this will hold it's dimensions
const [RECT_WIDTH, RECT_HEIGHT] = [50,50];
let [lastX, lastY] = [0, window.innerHeight-RECT_HEIGHT];




const initPage = () => {
  //Create a rectangle at the first location
  ctx.fillRect(lastX,lastY,RECT_WIDTH,RECT_HEIGHT);
  //add keyboard events
  document.addEventListener("keydown", keyPressed);


};
//Handle erase events to the canvas
const eraseRect = (x,y) => {
    ctx.clearRect(x,y,RECT_WIDTH,RECT_HEIGHT);
    console.log(`Erased a rectangle at ${x},${y}`);
};
//Handle draw events to the canvas
const drawRect = (x,y) => {
  ctx.fillRect(x,y,RECT_WIDTH,RECT_HEIGHT);
  console.log(`Drew a new rectangle at ${x}${y}`);
};


const move = (direction) => {
  //Erase the old rectangle
  //debugger;
  eraseRect(lastX, lastY);
  //Figure out the coordinates of the new rectangle
  let newX, newY;
  switch (direction) {
    case "right":
        //To move right, increase the x coordinate - keep the old y coordinate
        newX = lastX+RECT_WIDTH;
        newY = lastY;
      break;
    case "left":
      //To move left, decrease the x coordinate - keep the old y coordinate
      newX = lastX-RECT_WIDTH;
      newY = lastY;
      break;
    case "up":
      //To move up, keep the x coordinate the same - decrease the y coordinate
      newX = lastX;
      newY = lastY-RECT_HEIGHT;
      break;
    case "down":
      //To move down, keep the x coordinate the same - increase the y coordinate
      newX = lastX;
      newY = lastY+RECT_HEIGHT;
      break;
    default:
      throw Error("Unknown movement requested!");
  }

  //Make sure the coordinates doesn't pass any borders

  //x coordinate can't be less than 0 or more than the window's width (-the width of the rectangle or it won't show up)
  if(newX < 0) newX = 0;
  if(newX > (window.innerWidth-RECT_WIDTH)) newX = window.innerWidth-RECT_WIDTH;

  //y coordinate can't be less than 0 or more than the window's height (-height of the rectangle it won' show up)
  if(newY < 0) newY = 0;
  if(newY > (window.innerHeight-RECT_HEIGHT)) newY = window.innerHeight-RECT_HEIGHT;
  //Draw the new rectangle
  console.log(`The new coordinates are ${newX},${newY}`);
  drawRect(newX, newY);
  //Set the new x and y coordinates as the last coordinates
  [lastX, lastY] = [newX,newY];
};

//Handle keyboard events
const keyPressed = (e) => {
  //If the key touched isn't one of the arrow keys return it
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
  console.log(e.key);

  //Depending on arrowkey pushed send a desired direction to the move function
  let direction;
  switch (e.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
    default:
      throw Error("A key other than the  arrow keys continued in the function!");
  }
  //Send direction desired to the move function
  console.log(direction+ "!");
  move(direction);

};



initPage();
