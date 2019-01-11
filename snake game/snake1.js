
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
 

// load image

let foodimage = new Image();
foodimage.src="img/food.png";

//load audio
const dead = new Audio();
const eat = new Audio();
const left = new Audio();
const up = new Audio();
const right = new Audio();
const down = new Audio();

dead.src="audio/dead.mp3";
eat.src="audio/eat.mp3";
left.src="audio/left.mp3";
up.src="audio/up.mp3";
right.src="audio/right.mp3";
down.src="audio/down.mp3";

const box = 25;

// create snake array
 let snake = [];
snake[0] = {
    x : 1*box,
    y : 10*box
}
let snake1 = [];
snake1[0] = {
    x : 18*box,
    y : 10*box
}

//create food object
let food = {
    x : Math.floor(Math.random()*19)*box,
    y : Math.floor(Math.random()*19)*box
}

let score = 0;

//add event to the document
document.addEventListener("keydown",direction);

let d = "UP" ,d1 = "UP";

let startCheck = false;

//event function
function direction(event)
{
     if(event.keyCode == 37 && d!='RIGHT'){
         d='LEFT';
         left.play();
     }
     else if(event.keyCode == 38 && d!='DOWN'){
        d='UP';
        up.play();
    }
    else if(event.keyCode == 39 && d!='LEFT'){
        d='RIGHT';
        right.play();
    }
   else  if(event.keyCode == 40 && d!='UP'){
        d='DOWN';
        down.play();
    }
    
   if(event.keyCode == 65 && d1!='RIGHT'){
        d1='LEFT';
        left.play();
    }
    else if(event.keyCode == 87 && d1!='DOWN'){
       d1='UP';
       up.play();
   }
   else if(event.keyCode == 68 && d1!='LEFT'){
       d1='RIGHT';
       right.play();
   }
  else  if(event.keyCode == 83 && d1!='UP'){
       d1='DOWN';
       down.play();
   }
}
 
//function to check collision
   function collision(head,array)
  {
      for(let i=0; i<array.length; i++)
      
       {
           if(head.x == array[i].x && head.y == array[i].y)
         return true;}
      
         
          return false;
       
  }
  
  function generatefood(){
    food = {
        x : Math.floor(Math.random()*19)*box,
        y : Math.floor(Math.random()*19)*box
    }
}

  // function to move snake
function draw()

{   var grd = ctx.createRadialGradient(250,260,50,250,250,500);
     grd.addColorStop(0,"pink");
     grd.addColorStop(1,"white");

    // Fill with gradient
     ctx.fillStyle = grd;
     ctx.fillRect(0,0,500,500);
    
    for(let i=0;i<snake.length;i++)
     { ctx.lineWidth = 2;
     ctx.fillStyle = (i==0) ? "green" : "white";
     ctx.fillRect(snake[i].x,snake[i].y,box,box);
     
     ctx.strokeStyle = "red";
     ctx.strokeRect(snake[i].x,snake[i].y,box,box);

     }
     for(let i=0;i<snake1.length;i++)
     { ctx.lineWidth = 1.5;
     ctx.fillStyle = (i==0) ? "green" : "white";
     ctx.fillRect(snake1[i].x,snake1[i].y,box,box);
     
     ctx.strokeStyle = "red";
     ctx.strokeRect(snake1[i].x,snake1[i].y,box,box);

     }

    ctx.drawImage(foodimage,food.x,food.y);
   
     //get the position of old head
      let snakex=snake[0].x;
     let snakey=snake[0].y;
     
    let snakex1=snake1[0].x;
    let snakey1=snake1[0].y;

     // get the new head position
     if (d == 'LEFT') snakex-=box;
    else if(d == 'UP') snakey-=box;
     else if(d == 'RIGHT') snakex+=box;
     else if(d == 'DOWN') snakey+=box;
     else if(d1 == 'LEFT') snakex1-=box;
    else if(d1 == 'UP') snakey1-=box;
    else if(d1 == 'RIGHT') snakex1+=box;
    else if(d1 == 'DOWN') snakey1+=box;

     //eating food
     if(snakex == food.x && snakey == food.y){
         score++;
         eat.play();
         document.getElementById("score").innerHTML ="SCORE = "+ score;
          generatefood();
          
          /*for(let i=0; i <= snake.length; i++)
             if(food.x>snake[i].x && food.x < snake[i].x+box && food.y>snake[i].y && food.y < snake[i].y+box)
                     {   generatefood();
                        ctx.drawImage(foodimage,food.x,food.y);
                        break;
                     }*/
                    }
    else  snake.pop();
    if(snakex1 == food.x && snakey1 == food.y){
        score++;
        eat.play();
        document.getElementById("score").innerHTML ="SCORE = "+ score;
         generatefood();
         
         /*for(let i=0; i <= snake.length; i++)
            if(food.x>snake[i].x && food.x < snake[i].x+box && food.y>snake[i].y && food.y < snake[i].y+box)
                    {   generatefood();
                       ctx.drawImage(foodimage,food.x,food.y);
                       break;
                    }
           */
        }
   
       else  snake1.pop();

      let newhead = {
        x : snakex,
        y : snakey
       }
       
    let newhead1 = {
        x : snakex1,
        y : snakey1
       }

       //game over on collision 
       if(snakex == -box && snakey>200 && snakey <300)
         newhead.x = 20*box;
       else if (snakey == -box && snakex>200 && snakex <300)
                 newhead.y = 20*box;
       else if (snakey == 500 && snakex>200 && snakex <300)
                 newhead.y = 0;         
       else if (snakex == 500 && snakey>200 && snakey <300)
                 newhead.x = 0; 
                 
         else if(newhead.x <=-10 || newhead.x >19*box|| newhead.y <=-15 || newhead.y >19*box || collision(newhead,snake)){
          
        
            clearInterval(gameStatus);
        dead.play();
         ctx.strokeStyle = "black";
        ctx.font = "24px Arial";
        ctx.strokeText("GAME OVER: PRESS ENTER TO RESTART",8,200);
          let gameover = true;
      }
    snake.unshift(newhead);

       if(snakex1 == -box && snakey1>200 && snakey1 <300)
         newhead1.x = 20*box;
       else if (snakey1 == -box && snakex1>200 && snakex1 <300)
                 newhead1.y = 20*box;
       else if (snakey1 == 500 && snakex1>200 && snakex1 <300)
                 newhead1.y = 0;         
       else if (snakex1 == 500 && snakey>200 && snakey1 <300)
                 newhead1.x = 0; 
                 
      else if(newhead1.x <-10 || newhead1.x >19*box|| newhead1.y <=-15 || newhead1.y >19*box ||  collision(newhead1,snake1)){
          
    
        clearInterval(gameStatus);
        dead.play();
         ctx.strokeStyle = "black";
        ctx.font = "24px Arial";
        ctx.strokeText("GAME OVER: PRESS ENTER TO RESTART",8,200);
          let gameover = true;
      }
    snake1.unshift(newhead1);
    
    ctx.strokeStyle ="black";
    ctx.lineWidth = 10;
ctx.moveTo(500,0);
ctx.lineTo(500,200);
ctx.moveTo(500,500);
ctx.lineTo(500,300);
ctx.moveTo(0,0);
ctx.lineTo(200,0);
ctx.moveTo(300,0);
ctx.lineTo(500,0);
ctx.moveTo(0,0);
ctx.lineTo(0,200);
ctx.moveTo(0,500);
ctx.lineTo(0,300);
ctx.moveTo(0,500);
ctx.lineTo(200,500);
ctx.moveTo(300,500);
ctx.lineTo(500,500);
ctx.stroke();

}

let gameStatus;
    draw();
 
document.addEventListener("keydown",(evt)=>{
    if(!startCheck && evt.code =="Space")
    {   gameStatus = setInterval(draw,150);
        startCheck = true; 
    }
    else if(evt.code === "Space" )
    {    clearInterval(gameStatus);
        startCheck = false;

    }
    else if(evt.keyCode == 13)
      {   
        gameover = false;
        snake = [0];
           snake[0] = {
              x : 2*box,
              y : 10*box
          }
         
           snake1 = [0];
              snake1[0] = {
                x : 18*box,
                y : 10*box
            }
            gameStatus = setInterval(draw,150);
            
        }
        else if(evt.keyCode == 107 ){
             hard(); }
             else if(evt.keyCode == 109) {
                medium();}  
 })
 
   

 function hard(){
    clearInterval(gameStatus);
     gameStatus = setInterval(draw,100);
    startCheck = true;
}

function medium(){
   startCheck = true;
   clearInterval(gameStatus);
   gameStatus =   setInterval(draw,400);
}
 function hard1(){
     clearInterval(gameStatus1);
     gameStatus1 =setInterval(draw1,70);
 }
 
 function medium1(){
    clearInterval(gameStatus1);
   gameStatus1 =  setInterval(draw1,250);
}

function easy1(){
    clearInterval(gameStatus1);
    gameStatus1 = setInterval(draw1,400);
}
 
