var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

var fly = new Audio();
var score_audio = new Audio();
var theme = new Audio();
var lose = new Audio();



lose.src = "audio/lose.mp3";
fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";
theme.src = "audio/theme.mp3";



var gap = 90;

document.addEventListener("keydown" || "touch", moveUp);

function moveUp() { 
    yPos -= 35;
    fly.play();
    theme.play();    
 }

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
    
}

var xPos = 10;
var yPos = 150;
var grav = 2;

var score = 0;

function draw () {    
    ctx.drawImage(bg, 0, 0);    

    

    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + 
        pipeUp.height + gap);
     
        pipe[i].x--;
    
        if(pipe[i].x == 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

      if(xPos + bird.width >= pipe[i].x 
    && xPos <= pipe[i].x + pipeUp.width
    && (yPos <= pipe[i].y + pipeUp.height 
    || yPos + bird.height >= pipe[i].y + pipeUp.height + gap || yPos + bird.height >= cvs.height - fg.height)) {
        lose.play();
        location.reload();
        alert("Sizning natijangiz: " + score);
    }
    
     

     if(pipe[i].x == 5){
        score++;
        score_audio.play();
     }

    

    }
    
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    
    

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Natija: " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);
    
    
}



pipeBottom.onload = setInterval(draw(),
  
100);
