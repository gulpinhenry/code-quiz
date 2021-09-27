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
var clicked = false; //checks to see if options are clicked
var currentQuestion = 0;
var timer;


//create list of questions
var arr = [["q1", "real ans", "choice 1", "choice 2", "choice 3", "choice 4"],
["q2", "ans2", "ans2", "choice 2", "choice 3", "choice 4"]
,["q3", "ans2", "ans2", "choice 2", "choice 3", "choice 4"]
,["q4", "ans2", "ans2", "choice 2", "choice 3", "choice 4"]
,["q5", "ans2", "ans2", "choice 2", "choice 3", "choice 4"]
,["q6", "ans2", "ans2", "choice 2", "choice 3", "choice 4"]
,["q7", "ans2", "ans2", "choice 2", "choice 3", "choice 4"]
,["q8", "ans2", "ans2", "choice 2", "choice 3", "choice 4"]
,["q9", "ans2", "ans2", "choice 2", "choice 3", "choice 4"]
,["q10", "ans2", "ans2", "choice 2", "choice 3", "choice 4"]];



function renderQuiz(i){
    //clearContainer();
    title.textContent = arr[i][0];
    //add buttons to dom
    var a = document.createElement("button");
    var b = document.createElement("button");
    var c = document.createElement("button");
    var d = document.createElement("button"); //choices
    var ans = ""; //answer that user choose


    a.setAttribute("class", "quiz-choices"); //add to css later
    b.setAttribute("class", "quiz-choices");
    c.setAttribute("class", "quiz-choices");
    d.setAttribute("class", "quiz-choices");

    a.textContent = arr[i][2];
    b.textContent = arr[i][3];
    c.textContent = arr[i][4];
    d.textContent = arr[i][5];

    descContainer.appendChild(a);
    descContainer.appendChild(b);
    descContainer.appendChild(c);
    descContainer.appendChild(d);

    a.addEventListener("click", function() {
        ans = a.textContent;
        a.remove();
        b.remove();
        c.remove();
        d.remove();
        checkAnswer(ans);
    }); 
    b.addEventListener("click", function() {
        ans = b.textContent;
        a.remove();
        b.remove();
        c.remove();
        d.remove();
        checkAnswer(ans);
    }); 
    c.addEventListener("click", function() {
        ans = c.textContent;
        a.remove();
        b.remove();
        c.remove();
        d.remove();
        checkAnswer(ans);
    }); 
    d.addEventListener("click", function() {
        ans = d.textContent;
        a.remove();
        b.remove();
        c.remove();
        d.remove();
        checkAnswer(ans);
    }); 

    //ans = arr[i][1]; //temporary
    
    
}
function checkAnswer(ans){
    var feedback = document.createElement("h3");
    feedback.setAttribute("id", "feedback");
    if(timeLeft<=0){ //not sure where to put this, this is when the user runs out of time while in the middle of the quiz
        finishedTime = 0;
        displayForm();
    }

    if(arr[currentQuestion][1] == ans){
        feedback.textContent = "correct!";
        var correct = new Audio("./assets/images/correct.wav");
        correct.play();
    }
    else{
        feedback.textContent = "wrong!";
        timeLeft -= 10;
        var incorrect = new Audio("./assets/images/incorrect.wav");
        incorrect.play();
    }
    //keeps the feedback there for a bit
    setTimeout(function(){ feedback.remove();
    }, 500);
    botContainer.appendChild(feedback);
    if(currentQuestion<arr.length-1)
    {
        renderQuiz(++currentQuestion);
    }
    else
    {
        endQuiz();
    }
        
}

function endQuiz(){
    console.log("hi");
    finishedTime = timeLeft;
    timeLeft = 0;
    clearInterval(timer);
    time.textContent = "Time left: --";
    displayForm(); 
}
// redo logic of quiz
function startQuiz(){
    highScores.disabled = true;
    console.log("Game started");
    //render buttons, render question, get rid of all of the stuff on there
    renderQuiz(currentQuestion);
    //if the user finishes before time hits 0
      
    //in the event that the user finishes before the time runs out   
}



// just a function for debugging purposes, to clear all containers
function clearContainer(){
    title.textContent = "";
    descContainer.innerHTML = '';
    botContainer.innerHTML = '';

}

// logic of the ending of the quiz, if the quiz is finished before the actual time limit, you need to display form then, as well if the quiz is not finished in time

/**
 * displays the form which prompts the user for their initials, as saves their respective time to under their initials, which will be updated to leaderboard
 */
function displayForm(){
    console.log("game finished");
    clearContainer();
    title.textContent="All Done!";
    var finScore = document.createElement("h3");
    var form = document.createElement("form");
    var formLabel = document.createElement("label")
    var initials = document.createElement("input");
    var submit = document.createElement("input");

    finScore.textContent = "Score: " + finishedTime;
    descContainer.appendChild(finScore);

    formLabel.textContent = "Enter Initials (2 letters): "
    initials.setAttribute("type", "text");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submit-button");
    submit.value = "ok";



    botContainer.appendChild(form);
    form.appendChild(formLabel);
    form.appendChild(initials);
    form.appendChild(submit);
    // this will change the leaderboard the same person with same initials beats their previous high scoire 
    submit.addEventListener("click", function(){
        if(!localStorage.getItem(initials.value) || localStorage.getItem(initials.value)<finishedTime)
        {
            localStorage.setItem(initials.value, finishedTime);
        }
            
    });

}

function displayHighScores(){
    clearContainer();
    title.textContent = "High Scores";
    var board = document.createElement("ol");
    board.setAttribute("id", "leaderboard"); //used to style in css
    descContainer.appendChild(board);
    // create button
    var back = document.createElement("button");
    back.textContent = "back";
    botContainer.appendChild(back);
    highScores.disabled = true;
    //display list
    for (var i = 0; i < localStorage.length; i++){
        if(localStorage.key(i).length == 2) //displays only initials
        {
            var li = document.createElement("li");
            li.textContent = localStorage.key(i) + ":  " + localStorage.getItem(localStorage.key(i));
            li.setAttribute("data-index", i);
            board.appendChild(li);
        }
        
    }
  
    
      
    
    //when the start button is clicked, the timer starts and the button disappears
    back.addEventListener("click", function(){
        displayHome();
        back.remove();
    });
}

//render home screen
function displayHome(){
    clearContainer();
    highScores.disabled = false;
    currentQuestion = 0;
    timeLeft = 60;
    title.textContent = "Code Quiz Game";
    // create description
    var desc = document.createElement("h3");
    desc.setAttribute("id", "description"); //used to style in css
    desc.textContent = "Answer these Javascript-themed questions the best you can in less than a minute! Incorrect answers will be punished. Good luck!";
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

        timer = setInterval(function(){
            timeLeft--;
            time.textContent = "Time left: " + timeLeft;
            if(timeLeft <= 0){
                clearInterval(timer);
                time.textContent = "Time left: --";
                displayForm();
            }
        }, 1000);
    }); 
}

displayHome();

highScores.addEventListener("click", displayHighScores);

