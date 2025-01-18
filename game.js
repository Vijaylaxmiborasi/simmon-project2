const buttonColors = ['red', 'green', 'blue', 'yellow'];
const gamePattern = [];
let userClickedPattern = []; 
let level = 0;
let started = false;
var success = true

$(document).ready(function () {
    $(document).keypress(function () {
        if (!started) {
            $('#level-title').text("Level " + level); 
            nextSequence(); 
            started = true;  
        }
        
    });
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)

    console.log(userClickedPattern); 
});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000)
            
        }
    }
    else{
        playSound("wrong")
        $("body").addClass('game-over')
        setTimeout(function(){
        $("body").removeClass("game-over")
    },200)
    $('#level-title').text("Game Over, Press Any Key to Restart");
    startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function animatePress(currentColor) {
    var activeButton = $("#" + currentColor);
    if (activeButton) {
        activeButton.addClass("pressed"); 
        setTimeout(function () {
            activeButton.removeClass("pressed"); 
        }, 100);
    }
}

function playSound(name) {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }




