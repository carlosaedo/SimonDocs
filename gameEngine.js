const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

$(document).keydown(function (e) {

    console.log(e);

    if (!gameStarted) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        gameStarted = true;
    }
});

let nextSequence = function () {

    userClickedPattern = [];
    level++;

    $("#level-title").text(`Level ${level}`);

    let randomNumber = Math.floor(4 * Math.random());
    let randomChosenColour = buttonColours[randomNumber];
    $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
}

let playSound = function (name) {
    let audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

let animatePress = function (currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

let checkAnswer = function (currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text(`Game Over🥴, Press Any Key to Restart`);

        startOver();
    }

}

let startOver = function () {

    gamePattern = [];
    level = 0;
    gameStarted = false;
}

$(".btn").click(function () {

    let userChosenColour = $(this).attr("id");

    console.log(userChosenColour);

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});