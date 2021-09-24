/**
 * script.js
 * Henry Kam
 * 9.24.21
 * This script facilitates index.html, which displays a quiz interface with timers and a saved collection of high scores
 */

// add feature of displaying high score for "view high score"


// timer, when time reaches zero from user to fill out form to insert initials for saving highscores
var time = document.getElementById("time");
var timeLeft = 61;
/**
 * creates a timer that updates index.html's time element every second
 */
function decreaseTime() {
    console.log(timeLeft);
    var timer = setInterval(function(){
        timeLeft--;
        time.textContent = "Time left: " + timeLeft;
        if(timeLeft == 0){
            clearInterval(timer);
            displayForm();
        }
        
        
        
        
    }, 1000);
}

// logic of the quiz


// logic of the ending of the quiz, if the quiz is finished before the actual time limit, you need to display form then

/**
 * displays the form which prompts the user for their initials, as saves their respective time to under their initials, which will be updated to leaderboard
 */
function displayForm(){
    //display the form

    //change the number to the starting time value tp get total number of seconds used to take the quiz
    var timeExpended = 10-timeLeft;

    //prompt for initials and display time and all that stuff
}


// call functions here
decreaseTime();

