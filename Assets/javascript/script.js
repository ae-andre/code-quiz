var startButton = document.querySelector("#start-button")
var startPage = document.querySelector(".start-page")
var quizPage = document.querySelector(".quiz-pages")

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

var currentIndex = 0

function renderQuestion () {
    quizText.textContent = quizQuestions[currentIndex].text
    optionOne.value = quizQuestions[currentIndex].choices[0]
    optionTwo.value = quizQuestions[currentIndex].choices[1]
    optionThree.value = quizQuestions[currentIndex].choices[2]
    optionFour.value = quizQuestions[currentIndex].choices[3]
}

function nextQuestion () {
    currentIndex++
    renderQuestion()
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