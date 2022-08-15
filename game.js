// Simon Game

gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
userClickedPattern = [];
var started = false;
var level = 0;

// -------------------------------------------------------------------
// Plays sound of button, adds color to userChosenColour array and animates press
$(".btn").on("click", function playSound(name) {

  var userChosenColour = event.target.id;

  // Add color picked by user to userChosenColour array
  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern);

  // Executes function to play sound
  makeSound(userChosenColour);
  // Executes function to animate press
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

})

// ------------------------------------------------------------------------
// Detect when a keyboard key is pressed the first time


$(document).on("keypress", function() {

  if (!started) {
    $("h1").text("Level " + level);
    nextSequence()
    started = true;
  }
});


// -----------------------------------------------------------------------------------
// Picks a ramdom number and flashes the correponding button
function nextSequence() {

  userClickedPattern = [];
  level++;
  var randNum = Math.floor(Math.random() * 3);
  var randomChosenColour = buttonColours[randNum];

  $("h1").text("Level " + level);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  gamePattern.push(randomChosenColour);

  makeSound(randomChosenColour);

  console.log(gamePattern);
};

// _________________________________________________________________________
// Checks to see if the gamePattern array equals the userClickedPattern Array

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    $("h1").text("Game Over, Press Any Key To Restart.");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    gameOver();
    gamePattern = [];
    userClickedPattern = [];
    console.log("wrong");
    started = false;
    level = 0;

  }

}

// ----------------------------------------------------------------------------
// function to add class to change body style when game is over.
function gameOver() {
  $("body").addClass("game-over");

  setTimeout(function() {
    //code to be executed after 100 milliseconds
    $("body").removeClass("game-over");
  }, 200);

}

// --------------------------------------------------------------------
// animates user click chosen by user
function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    //code to be executed after 100 milliseconds
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


// ---------------------------------------------------------------------------------
// play sound of color that is randomly selected from nextSequence function
function makeSound(randomChosenColour) {

  switch (randomChosenColour) {
    case "blue":
      var blueButton = new Audio("sounds/blue.mp3");
      blueButton.play();
      break;

    case "green":
      var greenButton = new Audio("sounds/green.mp3")
      greenButton.play();
      break;


    case "red":
      var redButton = new Audio("sounds/red.mp3")
      redButton.play();
      break;

    case "yellow":
      var yellowButton = new Audio("sounds/yellow.mp3")
      yellowButton.play();
      break;

    case "wrong":
      var wrongButton = new Audio("sounds/wrong.mp3")
      wrongButton.play();
      break;

    default:
      console.log(randomChosenColour);
  }
}
