// DOM Elements

const goQuizBtn = document.getElementById("quizBtn");
const nameInput = document.getElementById("nameInput");
const logInContainer = document.querySelector(".login-container");
const startQuizBtn = document.getElementById("start-quiz-btn");
const questionContainer = document.querySelector(".question-container");
const nextQuestionBtn = document.getElementById("next-question-btn");
const curTime = document.getElementById("cur-time");
const question = document.getElementById("question");
const optionsBtn = document.querySelectorAll(".choice-btn");
const allTime = document.querySelector(".time");
const progress = document.querySelector(".progress");
const activeQuestion = document.getElementById("active-question");
const overlay = document.getElementById("overlay");
const finishContainer = document.querySelector(".finish-container");
const finishMessage = document.querySelector(".finish-message");
const showResultBtn = document.getElementById("show-result-btn");
const correctIcon = document.querySelector(".correct-icon");
const reloadBtn = document.getElementById("reload-btn");
const resetBtn = document.getElementById("reset-btn");

// Questions

let questionsAll = [
  {
    question: "I. Which is the javascript package management application?",
    options: { a: "Node.js", b: "Typescript", c: "Npm" },
    answer: "a",
  },
  {
    question: "II. Which is the most popular language in the world right now?",
    options: { a: "JavaScript", b: "Python", c: "Java" },
    answer: "a",
  },
  {
    question: "III. Which one is used for clean code?",
    options: { a: "Angular", b: "Typescript", c: "React" },
    answer: "b",
  },
  {
    question: "IV. What language does the Macos operating system use?",
    options: { a: "Java", b: "C++", c: "Swift" },
    answer: "c",
  },
  {
    question: "V. When was the java language created?",
    options: { a: "1997", b: "1995", c: "1993" },
    answer: "b",
  },
];

//Constants

const INITIAL_TIME = 10;
const TOTAL_QUESTIONS = questionsAll.length;

// Start conditions

let text = "Enter your first and last name...";
let studentName = "";
let index = 0;
let correctAnswers;
let remainingTime;
let currentQuestion;
let timeUpdate;

function initializeConditions() {
  nextQuestionBtn.style.visibility = "hidden";
  correctAnswers = 0;
  remainingTime = INITIAL_TIME;
  currentQuestion = 0;
  clearInterval(timeUpdate);
}

function writeText() {
  if (index < text.length) {
    document.getElementById("message").textContent += text.charAt(index);
    index++;
    setTimeout(writeText, 50);
  } else {
    return;
  }
}

writeText();

initializeConditions();

// Click events

goQuizBtn.addEventListener("click", handleQuizStart);
startQuizBtn.addEventListener("click", showQuestions);
nextQuestionBtn.addEventListener("click", handleNextQuestion);
showResultBtn.addEventListener("click", showQuizResult);
resetBtn.addEventListener("click", resetQuiz);
reloadBtn.addEventListener("click", reload);
optionsBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleClickOptions(e);
  });
});

// Functions

function timeUpdateStart() {
  timeUpdate = setInterval(() => {
    remainingTime--;
    progressBar();
    curTime.textContent = remainingTime;
    if (remainingTime === 0) {
      if (currentQuestion === TOTAL_QUESTIONS - 1) {
        hiddenNextQuestionBtn();
      }
      timeUpdateStop();
      openOverlay();
      showCorrectAnswer();
    }
  }, 1000);
}

function timeUpdateStop() {
  remainingTime = INITIAL_TIME;
  clearInterval(timeUpdate);
}

function showQuestions() {
  timeUpdateStart();
  progress.style.width = "0%";
  startQuizBtn.classList.add("hidden");
  questionContainer.classList.remove("hidden");
}

function displayQuestion() {
  question.innerText = `${questionsAll[currentQuestion].question}`;
  optionsBtn[0].innerText = `a: ${questionsAll[currentQuestion].options.a}`;
  optionsBtn[1].innerText = `b: ${questionsAll[currentQuestion].options.b}`;
  optionsBtn[2].innerText = `c: ${questionsAll[currentQuestion].options.c}`;
  activeQuestion.innerText = `${currentQuestion + 1} / ${TOTAL_QUESTIONS}`;
  curTime.innerHTML = `${INITIAL_TIME}`;
  progress.style.width = "0%";
}

function handleQuizStart(event) {
  event.preventDefault();
  const inputValue = nameInput.value.trim();
  if (inputValue) {
    studentName = inputValue;
    logInContainer.classList.add("hidden");
    startQuizBtn.classList.remove("hidden");
  } else {
    alert("Please enter your first and last name...");
  }
}

function handleNextQuestion() {
  if (currentQuestion === TOTAL_QUESTIONS - 1) {
    return;
  }
  currentQuestion++;
  nextQuestionBtn.style.visibility = "hidden";
  closeOverlay();
  displayQuestion();
  timeUpdateStart();
  resetOptionStyles();
}

function handleClickOptions(e) {
  nextQuestionBtn.style.visibility = "";
  if (currentQuestion > TOTAL_QUESTIONS - 1) return;
  if (currentQuestion == TOTAL_QUESTIONS - 1) {
    hiddenNextQuestionBtn();
  }
  if (questionsAll[currentQuestion].answer == e.target.textContent[0]) {
    correctAnswers++;
    e.target.style.borderBottom = "2px solid green";
  } else {
    e.target.style.borderBottom = "2px solid red";
  }
  nextQuestionBtn.style.visibility = "";
  showCorrectAnswer();
  timeUpdateStop();
  openOverlay();
}

function openOverlay() {
  nextQuestionBtn.style.visibility = "";
  overlay.classList.add("overlay");
}

function showCorrectAnswer() {
  optionsBtn.forEach((btn) => {
    if (questionsAll[currentQuestion].answer == btn.textContent[0]) {
      btn.style.borderBottom = "2px solid green";
    }
  });
}

function closeOverlay() {
  overlay.classList.remove("overlay");
}

function resetOptionStyles() {
  optionsBtn.forEach((btn) => {
    btn.style.borderBottom = "2px solid white";
  });
}

function showQuizResult() {
  closeOverlay();
  finishMessage.innerText = `${studentName}, you gave ${correctAnswers} correct answers out of ${TOTAL_QUESTIONS} questions in total.`;
  questionContainer.classList.add("hidden");
  finishContainer.classList.remove("hidden");
}

function progressBar() {
  let progressPercentage =
    ((INITIAL_TIME - remainingTime) / INITIAL_TIME) * 100;
  progress.style.width = progressPercentage + "%";
}

function hiddenNextQuestionBtn() {
  showResultBtn.classList.remove("hidden");
  nextQuestionBtn.classList.add("hidden");
}

function resetQuiz() {
  initializeConditions();
  displayQuestion();
  resetOptionStyles();
  finishContainer.classList.add("hidden");
  questionContainer.classList.add("hidden");
  logInContainer.classList.remove("hidden");
  startQuizBtn.classList.add("hidden");
  nameInput.value = "";
  showResultBtn.classList.add("hidden");
  nextQuestionBtn.classList.remove("hidden");
}

function reload() {
  initializeConditions();
  displayQuestion();
  resetOptionStyles();
  timeUpdateStart();
  finishContainer.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  logInContainer.classList.add("hidden");
  startQuizBtn.classList.add("hidden");
  showResultBtn.classList.add("hidden");
  nextQuestionBtn.classList.remove("hidden");
}
