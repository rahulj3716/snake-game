
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const canvas = document.getElementById("score");
const context = canvas.getContext("2d");
 
context.font = "30px Arial";
context.fillText("P1 :",20,35);
context.font = "30px Arial";
context.fillText("P2 :",400,35);


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

//create food object
let food = {
    x : Math.floor(Math.random()*19)*box,
    y : Math.floor(Math.random()*19)*box
}


var now1 = new Date().getTime()+120000;

    function time() {

    var now = new Date().getTime();
    var distance =  now1 - now;
    
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
    context.clearRect(130,10,190,50);
     context.font = "30px Arial";
    context.fillText( minutes + "m " + seconds + "s ", 200, 35);
      
    if (distance < 1) {
      clearInterval(x);
      clearInterval(gameStatus);
      clearInterval(gameStatus1);
      if(score>score1){ 
      ctx.strokeStyle = "red";
      ctx.font = "50px Arial";
      ctx.strokeText("P1 WINS",200,200);}
      else {
           
         ctx.font = "60px Arial";
         ctx.fillText("P2 WINS",150,230);
      }
    }
    }
    
  
let score = 0,score1 = 0;

//add event to the document
document.addEventListener("keydown",direction);

let d = "UP" ,d1 = "UP";

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
let startCheck = false,startCheck1= false;
let gameStatus,gameStatus1;
document.addEventListener("keydown",(evt)=>{
    if(!startCheck && evt.code =="Space")
    {   gameStatus = setInterval(draw,180);
        startCheck = true; 
        gameStatus1 = setInterval(draw1,180);
        startCheck1 = true;
        var x = setInterval(time,1000);
    }
    else if(evt.code === "Space" )
    {    clearInterval(gameStatus);
        startCheck = false;
        clearInterval(gameStatus1);
        startCheck1 = false;
    }
    else if(evt.keyCode == 13)
      {    x= setInterval(time,1000);
        gameover = false;
        snake = [0];
           snake[0] = {
              x : 2*box,
              y : 10*box
          }
          gameStatus = setInterval(draw,180);
          gameover1 = false;
          snake1 = [0];
              snake1[0] = {
                x : 18*box,
                y : 10*box
            }
            gameStatus1 = setInterval(draw1,180);
        }
        else if(evt.keyCode == 107 ){
             hard();hard1(); }
             else if(evt.keyCode == 109) {
                medium();medium1();}  
 })
 
 
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
let snakex,snakey; 
 
  // function to move snake
function draw()

{   
    var grd = ctx.createRadialGradient(250,260,50,250,250,500);
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

    ctx.drawImage(foodimage,food.x,food.y);
   
     //get the position of old head
       snakex=snake[0].x;
       snakey=snake[0].y;
       

     // get the new head position
     if(d == 'LEFT') snakex-=box;
     if(d == 'UP') snakey-=box;
     if(d == 'RIGHT') snakex+=box;
     if(d == 'DOWN') snakey+=box;

     //eating food
     if(snakex == food.x && snakey == food.y){
         score++;
         eat.play();
         context.clearRect(75,10,100,60);
         context.font = "30px Arial";
         context.fillText(score, 80, 35);
          generatefood();
           /*for(let i=0; i <= snake.length; i++)
             if(food.x>snake[i].x && food.x < snake[i].x+box && food.y>snake[i].y && food.y < snake[i].y+box)
                     {   generatefood();
                        ctx.drawImage(foodimage,food.x,food.y);
                        break;
                     }*/
    }
     else  snake.pop();

         newhead = {
        x : snakex,
        y : snakey
       }
     
       //game over on collision 
       if(snakex == -box && snakey>=200 && snakey <=300)
         newhead.x = 20*box;
       else if (snakey == -box && snakex>=200 && snakex <=300)
                 newhead.y = 20*box;
       else if (snakey == 500 && snakex>=200 && snakex <=300)
                 newhead.y = 0;         
       else if (snakex == 500 && snakey>=200 && snakey <=300) 
                 newhead.x = 0; 
        else if(newhead.x <=-15 || newhead.x >19*box|| newhead.y <=-15 || newhead.y >19*box || collision(newhead,snake)){
             clearInterval(gameStatus1);
            clearInterval(gameStatus);
           // clearInterval(x);
        dead.play();
        
        ctx.strokeStyle = "black";
        ctx.font = "24px Arial";
        ctx.strokeText("P2 WINS: PRESS ENTER TO RESTART",8,200);
          let gameover = true;
    for(let i=0;i<snake1.length;i++)
    { ctx.lineWidth = 1.5;
    ctx.fillStyle = (i==0) ? "black" : "white";
    ctx.fillRect(snake1[i].x,snake1[i].y,box,box);
    
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake1[i].x,snake1[i].y,box,box);

    }
      }
  
      snake.unshift(newhead);
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

   draw();
    
function hard(){
     clearInterval(gameStatus);
      gameStatus = setInterval(draw,90);
     startCheck = true;
}
 
 function medium(){
    startCheck = true;
    clearInterval(gameStatus);
    gameStatus =   setInterval(draw,180);
}

// create snake array
 let snake1 = [];
snake1[0] = {
    x : 18*box,
    y : 10*box
}


  // function to move snake
  
function draw1()
 {  /* var grd = ctx.createRadialGradient(250,260,50,250,250,500);
    grd.addColorStop(0,"pink");
    grd.addColorStop(1,"white");

   // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,500,500);*/
    
   /* for(let i=0;i<snake.length;i++)
     { ctx.lineWidth = 2;
     ctx.fillStyle = (i==0) ? "green" : "white";
     ctx.fillRect(snake[i].x,snake[i].y+box,box,box);
     
     ctx.strokeStyle = "red";
     ctx.strokeRect(snake[i].x,snake[i].y+box,box,box);

     }*/
     
    for(let i=0;i<snake1.length;i++)
     { ctx.lineWidth = 1.5;
     ctx.fillStyle = (i==0) ? "black" : "white";
     ctx.fillRect(snake1[i].x,snake1[i].y,box,box);
     
     ctx.strokeStyle = "red";
     ctx.strokeRect(snake1[i].x,snake1[i].y,box,box);

     }
     ctx.drawImage(foodimage,food.x,food.y);
    //get the position of old head
       let snakex1=snake1[0].x;
     let snakey1=snake1[0].y;
       
       
      // get the new head position
     if(d1 == 'LEFT') snakex1-=box;
     if(d1 == 'UP') snakey1-=box;
     if(d1 == 'RIGHT') snakex1+=box;
     if(d1 == 'DOWN') snakey1+=box;

     //eating food
     if(snakex1 == food.x && snakey1 == food.y){
         score1++;
         eat.play();
         context.clearRect(450,10,100,60);
         context.font = "30px Arial";
         context.fillText(score1, 460, 35);
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

        
       newhead1 = {
        x : snakex1,
        y : snakey1
       }
//game over on collision 
         if(snakex1 == -box && snakey1>=200 && snakey1 <=300)
         newhead1.x = 20*box;       
       else if (snakey1 == -box && snakex1>=200 && snakex1 <=300)
                 newhead1.y = 20*box;
       else if (snakey1 == 500 && snakex1>=200 && snakex1 <=300)
                 newhead1.y = 0;         
       else if (snakex1 == 500 && snakey>=200 && snakey1 <=300)
                 newhead1.x = 0; 
                 
else if(newhead1.x <-10 || newhead1.x >19*box|| newhead1.y <=-15 || newhead1.y >19*box ||   collision(newhead1,snake1)){
    dead.play();    
    clearInterval(gameStatus);
        clearInterval(gameStatus1);
        clearInterval(x);
         ctx.strokeStyle = "black";
        ctx.font = "24px Arial";
        ctx.strokeText("P1 WINS: PRESS ENTER TO RESTART",8,200);
          let gameover1 = true;
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
    
     draw1();

 function hard1(){
     clearInterval(gameStatus1);
     gameStatus1 =setInterval(draw1,90);
 }
 
 function medium1(){
    clearInterval(gameStatus1);
   gameStatus1 =  setInterval(draw1,180);
}


