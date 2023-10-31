var startButton = document.querySelector("#start-button")
var startPage = document.querySelector(".start-page")
var quizPage = document.querySelector(".quiz-pages")
var endPage = document.querySelector(".end-page")
var scorePage = document.querySelector(".highscore-page")
var scoreLink = document.querySelector("#highscore-link")

var mostRecentScore = document.querySelector(".most-recent-score")
var initialsInput = document.querySelector("#user-initials")
var saveScore = document.querySelector("#submit-score")
var scoreList = document.querySelector("#score-list")
var clearScore = document.querySelector("#clear-score")
var tryAgain = document.querySelector("#start-over")

var countdownTimer = document.querySelector("#countdown")
var timeLeft = "90"

function countdown () {
    var timeInterval = setInterval(() => {
    countdownTimer.innerHTML = timeLeft
        if (timeLeft < 1) {
            countdownTimer.innerHTML = "0";
            clearInterval(timeInterval);
            renderEnd()
        } else {
            timeLeft--;
        } 
    }, 1000);

}

// Object including the questions, choices, and correct answer
var quizQuestions = [
    {
        text: "How do you declare a JavaScript variable?",
        choices: ["var carName;","variable carName;","v carName;","v Car-Name;"],
        answer: "var carName;"
    },
    {
        text: "Inside which HTML element do we put the JavaScript?",
        choices: ["<javascript>","<script>","<js>","<scripting>"],
        answer: "<script>"
    },
    {
        text: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choices: ["<script src='xxx.js'>","<script name='xxx.js'>","<script href='xxx.js'>","<script src='xxx.javascript'>"],
        answer: "<script src='xxx.js'>"
    },
]

var quizText = document.querySelector("#question-text")
var optionOne = document.querySelector("#option-one")
var optionTwo = document.querySelector("#option-two")
var optionThree = document.querySelector("#option-three")
var optionFour = document.querySelector("#option-four")
var answerValidator = document.querySelector(".answer-validator")

var currentIndex = 0

function renderQuestion () {
    countdown()
    quizText.textContent = quizQuestions[currentIndex].text
    optionOne.value = quizQuestions[currentIndex].choices[0]
    optionTwo.value = quizQuestions[currentIndex].choices[1]
    optionThree.value = quizQuestions[currentIndex].choices[2]
    optionFour.value = quizQuestions[currentIndex].choices[3]
}

function nextQuestion (event) {
    var correctOption = quizQuestions[currentIndex].answer
    var selectedOption = event.target.value
    if (correctOption === selectedOption) {
        answerValidator.textContent = "Correct!"
    } else {
        answerValidator.textContent = "Wrong!";
        timeLeft -= 10;
    } 
    currentIndex++
    if (currentIndex < quizQuestions.length) {
    renderQuestion()
    } else {
    renderEnd()
    }
}

function renderEnd () {
    quizPage.style.display = "none"
    endPage.style.display = "flex"
    newScore = Number(timeLeft)
    mostRecentScore.textContent = newScore
}

var highScores = [];

function renderHighScores() {
    endPage.style.display = "none";
    scorePage.style.display = "flex";

    // Sort the high scores in descending order
    highScores.sort((a, b) => b.score - a.score);

    scoreList.innerHTML = "";

    // Loop through the high scores and display them
    for (var i = 0; i < highScores.length; i++) {
        var score = highScores[i];
        var li = document.createElement("li");
        li.textContent = score.initialsInput + ": " + score.score;
        li.setAttribute("data-index", i);

        scoreList.appendChild(li);
    }
}

function startOver () {
    startPage.style.display = "flex"
    quizPage.style.display = "none"
    endPage.style.display = "none"
    scorePage.style.display = "none"
}

function clearList() {
    localStorage.clear()
}


// View Highscores Link
scoreLink.addEventListener("click", function(){
    startPage.style.display = "none"
    quizPage.style.display = "none"
    endPage.style.display = "none"
    scorePage.style.display = "flex"
})


// Button to begin the quiz 
startButton.addEventListener("click", function(){
    startPage.style.display = "none"
    quizPage.style.display = "flex"
    renderQuestion()
})


// User selects their answer using buttons
optionOne.addEventListener("click", nextQuestion)
optionTwo.addEventListener("click", nextQuestion)
optionThree.addEventListener("click", nextQuestion)
optionFour.addEventListener("click", nextQuestion)


// Reload Home page to try again
tryAgain.addEventListener("click", startOver)


saveScore.addEventListener("click", function() {
    var initialsValue = initialsInput.value.trim();
    if (initialsValue !== "") {
        var scoreObject = {
            initialsInput: initialsValue,
            score: Number(timeLeft),
        };

        // Add the new score to the high scores array
        highScores.push(scoreObject);

        // Save high scores to localStorage
        localStorage.setItem("highScores", JSON.stringify(highScores));

        renderHighScores();
    }
});


// Load high scores from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
    var storedHighScores = JSON.parse(localStorage.getItem("highScores"));

    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }
});

// Clear both the high scores array and localStorage
clearScore.addEventListener("click", function () {

    highScores = [];
    localStorage.removeItem("highScores");

    scoreList.innerHTML = "";
});
