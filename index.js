
var gameOver = true;
var level = 0;
var ids = ["green","red","yellow","blue"];
var sequence = [];
var userSequence = [];

function startGame(){

    $(".btn").click(function(){
        if (gameOver==false){

            var userColor = $(this).attr('id');
            userSequence.push(userColor);

            playSound(userColor);
            animatePress(userColor);

            console.log("User: " + userSequence);
            
            if (userSequence.length == sequence.length){
                checkSolution();
                updateGame();
            }
        }

    })
    
    $("body").keypress(function(){
        gameOver = false;
        updateGame();
    })

}

function addColor(){
    var newColorID = Math.floor(Math.random()*4);
    sequence.push(ids[newColorID]);
    $("#" + ids[newColorID]).fadeOut(100).fadeIn(100);
    console.log("Solution :" + sequence);
}

function checkSolution(){
    for (var i = 0; i < userSequence.length; i++){
        if (userSequence[i] != sequence[i]){
            gameOver = true;
            break;
        }
    }
}

function updateGame(){
    if (gameOver == true){
        restartGame();
    }
    else{
        level += 1;
        addColor();
        userSequence = [];
        $("h1").text("Level " + level);
    }
}

function restartGame(){
    level = 0;
    sequence = [];
    userSequence = [];
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200)
}

function playSound(color){
    var sound = new Audio("./sounds/" + color + ".mp3");
    sound.play();
}

function animatePress(color){
    $("#" + color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    }, 100);
}

startGame();
