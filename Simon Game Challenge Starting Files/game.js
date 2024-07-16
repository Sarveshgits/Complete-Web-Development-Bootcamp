var gamePattern = []
var userClickedPattern = []
var level = 0
var started = false;

var buttonColours = ["red", "blue", "green", "yellow"]

$(document).keypress(function(){
    if(!started ){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})

function nextSequence(){
    userClickedPattern = [];

    level = level+1
    $("h1").text("Level " + level)
    var randomNumber = Math.floor(4*(Math.random()))
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour ).fadeOut(100).fadeIn(100)

    playSound(randomChosenColour)
    
}



function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play()
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    }, 100)
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        console.log("wrong")
        $(document).addClass("game-over")
        $("h1").text("Game Over, Press Any Key to Restart")

        setTimeout(function(){
            $(document).removeClass("game-over")
        }, 200)
        startOver();
        }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }


