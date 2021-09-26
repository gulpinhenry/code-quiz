/**
 * script.js
 * Henry Kam
 * 9.24.21
 * This script facilitates index.html, which displays a quiz interface with timers and a saved collection of high scores
 */



// timer, when time reaches zero from user to fill out form to insert initials for saving highscores
var time = document.getElementById("time");
var title = document.getElementById("title");
var descContainer = document.getElementById("desc-container");
var botContainer = document.getElementById("bottom-container");
var highScores = document.getElementById("high-scores")
var start = document.getElementById("start")

var timeLeft = 60;
/**
 * creates a timer that updates index.html's time element every second
 */
function decreaseTime() {
    console.log(timeLeft);
    startQuiz();
    var timer = setInterval(function(){
        timeLeft--;
        time.textContent = "Time left: " + timeLeft;
        if(timeLeft == 0){
            clearInterval(timer);
            displayForm();
        }
    }, 1000);
}

/**
 * Button used to start the timer and effectively loading the next pages
 */



// logic of the quiz
function startQuiz(){
    highScores.disabled = true;
    console.log("Game started");
    //render buttons, render question, get rid of all of the stuff on there

    //check to see if question is right or wrong, change time, create feedback

    //check to see if the quiz is finished or not
}


// logic of the ending of the quiz, if the quiz is finished before the actual time limit, you need to display form then, as well if the quiz is not finished in time

/**
 * displays the form which prompts the user for their initials, as saves their respective time to under their initials, which will be updated to leaderboard
 */
function displayForm(){
    console.log("game finished");
    //display the form clear all other elements on the page



    //prompt for initials and display time and add to local storage, buttons for homescreen, which resets time, resetting to deafult page

    //if user clicks play again, go back to landing page, make highScores.disabled = false;
}

function displayHighScores(){

}


// call functions here
start.addEventListener("click",decreaseTime); 
highScores.addEventListener("click", displayHighScores);

