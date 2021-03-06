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
var arr = [["What is JavaScript most known for?", "Scripting for Web Pages", "Having similar names with JAVA", "Scripting for Web Pages", "Its fast interpreters", "Its profound use in ML"],
["Which of the following is not a primitive data type in JavaScript?", "ArrayList", "number", "boolean", "null", "ArrayList"]
,["What does \"===\" mean?", "equal in value and data type", "equal in value and data type", "same object reference", "equal in value ONLY", "not equal"]
,["It is common practice to end each line of code with what?", "semicolon", "period", "closing curly brace", "backslash", "semicolon"]
,["What does Henry find most interesting about JavaScript", "functions within functions", "loose data types", "functions within functions", "undefined instead of index out of bounds exceptions (falsey values)", "nothing, he strongly dislikes JavaScript"]];



function renderQuiz(i){
    clearContainer();
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
}
function checkAnswer(ans){
    var feedback = document.createElement("h3");
    feedback.setAttribute("id", "feedback");
    
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
    console.log(feedback.textContent);  
    
    setTimeout(function(){botContainer.appendChild(feedback)}, 0);
    setTimeout(function(){feedback.remove();}, 1000);
    
    if(currentQuestion<arr.length-1){
        renderQuiz(++currentQuestion);
    }
    else{
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

//starts the quiz
function startQuiz(){
    highScores.disabled = true;
    console.log("Game started");
    //render buttons, render question, get rid of all of the stuff on there
    renderQuiz(currentQuestion);
}

// resets the containers
function clearContainer(){
    title.textContent = "";
    descContainer.innerHTML = '';
    botContainer.innerHTML = '';

}


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

    finScore.setAttribute("class", "results");
    formLabel.setAttribute("class", "results");
    initials.setAttribute("class", "results");
    submit.setAttribute("class", "results");

    finScore.textContent = "Score: " + finishedTime;
    descContainer.appendChild(finScore);

    formLabel.textContent = "Enter Initials (2 letters): "
    initials.setAttribute("type", "text");
    initials.setAttribute("id", "input");
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

//displays the high scores panel
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
    var clear = document.createElement("button");
    clear.textContent = "clear scores";
    botContainer.appendChild(clear);
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
    clear.addEventListener("click", function(){
        localStorage.clear();
        displayHighScores();
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

