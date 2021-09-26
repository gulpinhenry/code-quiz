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
var highScores = document.getElementById("high-scores");

var timeLeft = 60;
var finishedTime = 0;

//create list of questions
var arr = [["q1", "ans1"],["q2", "ans2"]];

function renderQuiz(){
    title.textContent = "game has started";

    var ans = 0;
    return ans
}

// logic of the quiz
function startQuiz(){
    highScores.disabled = true;
    console.log("Game started");
    //render buttons, render question, get rid of all of the stuff on there
    for(var i = 1; i<=10; i++)
    {
        var n = renderQuiz(i);
        //check to see if question is right or wrong, change time, create feedback
        if(ans[i][1] == n)
            //display correct
        else
        {
            //display incorrect
            //change feedback
        }

    }
        
    //

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

//render home screen
function displayHome(){
    title.textContent = "Code Quiz Game";
    // create description
    var desc = document.createElement("h3");
    desc.setAttribute("id", "description"); //used to style in css
    desc.textContent = "description here";
    descContainer.appendChild(desc);
    // create button
    var start = document.createElement("button");
    start.textContent = "Play";
    botContainer.appendChild(start);

    //when the start button is clicked, the timer starts and the button disappears
    start.addEventListener("click", function decreaseTime(event) {
        var element = event.target;
        console.log(timeLeft);
        start.remove();
        startQuiz();

        var timer = setInterval(function(){
            timeLeft--;
            time.textContent = "Time left: " + timeLeft;
            if(timeLeft == 0){
                clearInterval(timer);
                displayForm();
            }
        }, 1000);
    }); 
}

displayHome();

highScores.addEventListener("click", displayHighScores);

