var startButton = document.querySelector("#start-button")
var startPage = document.querySelector(".start-page")
var quizPage = document.querySelector(".quiz-pages")
var endPage = document.querySelector(".end-page")

var submitScore = document.querySelector(".submit-score")
var scoreList = document.querySelector(".score-list")
var clearScore = document.querySelector(".clear-score")
var tryAgain = document.querySelector(".start-over")

var countdownTimer = document.querySelector("#countdown")
var timeLeft = "10"

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

var scoreInfo = {
    // GENERATE li THAT INCL. BOTH MOST RECENT SCORE + INITIALS
} 

var quizQuestions = [
    {
        text: "what is a string?",
        choices: ["option a","option b","option c","option d"],
        answer: "option b"
    },
    {
        text: "what is an array?",
        choices: ["choice a","choice b","choice c","choice d"],
        answer: "choice c"
    },
    {
        text: "what is the third question?",
        choices: ["another choice a","again choice b","choice c","choice d"],
        answer: "choice c"
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
    console.log(event)
    var correctOption = quizQuestions[currentIndex].answer
    var selectedOption = event.target.value
    if (correctOption === selectedOption) {
        answerValidator.textContent = "Correct!"
    } else {
        answerValidator.textContent = "Wrong!";
        timeLeft -= 5;
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
    endPage.style.display = "block"
}

startButton.addEventListener("click", function(){
    startPage.style.display = "none"
    quizPage.style.display = "block"
    renderQuestion()
})

optionOne.addEventListener("click", nextQuestion)
optionTwo.addEventListener("click", nextQuestion)
optionThree.addEventListener("click", nextQuestion)
optionFour.addEventListener("click", nextQuestion)


localStorage.

// timer
// localStorage for score + initials
// 