const startButton = document.querySelector("button");
const quizContainer = document.querySelector("#quiz-container");
const questions = [
  {
    question: "What is the capital of Pakistan?",
    options: ["Lahore", "Karachi", "Islamabad", "Quetta"],
    answer: "Islamabad"
  },
  {
    question: "Which is the largest planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Jupiter"
  },
  {
    question: "How many days are in a week?",
    options: ["5", "6", "7", "8"],
    answer: "7"
  },
  {
    question: "Which is the national animal of Pakistan?",
    options: ["Lion", "Markhor", "Tiger", "Deer"],
    answer: "Markhor"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Earth", "Saturn", "Venus"],
    answer: "Mars"
  }
];
let currentQuestion = 0;
let score = 0;
function showQuestion() {
  const q = questions[currentQuestion];

  quizContainer.innerHTML = `
    <p>Question ${currentQuestion + 1} of ${questions.length}</p>
    <div class="progress-bar">
      <div id="progress"></div>
    </div>
    <h2>${q.question}</h2>
    <p id="timer">Time: 15</p>
  `;

  document.querySelector("#progress").style.width =
    ((currentQuestion + 1) / questions.length) * 100 + "%";

  q.options.forEach(function(option) {
    quizContainer.innerHTML +=
      `<button onclick="checkAnswer('${option}')">${option}</button>`;
  });

  startTimer();
}
let timeLeft;
let timer;

function startTimer() {
  timeLeft = 15;
  document.querySelector("#timer").textContent = "Time: " + timeLeft;

  timer = setInterval(function() {
    timeLeft--;
    document.querySelector("#timer").textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      checkAnswer("");
    }
  }, 1000);
}
function checkAnswer(selectedAnswer) {
clearInterval(timer);
  const correctAnswer = questions[currentQuestion].answer;

  if (selectedAnswer === correctAnswer) {
    score++;
    quizContainer.innerHTML = `<p class="correct">Correct!</p>`;
  } else {
    quizContainer.innerHTML = `<p class="wrong">Wrong! Correct answer: ${correctAnswer}</p>`;
  }

  setTimeout(function() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      quizContainer.innerHTML = `
  <h2>Quiz Completed!</h2>
  <p>Your Score: ${score} / ${questions.length}</p>
<p>Percentage: ${(score / questions.length) * 100}%</p>
<p>${score >= 3 ? "Good Job!" : "Keep Practicing!"}</p>
  <button onclick="restartQuiz()">Play Again</button>
`;
    }
  }, 1000);
}
function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  showQuestion();
}
startButton.addEventListener("click", function() {
  currentQuestion = 0;
  score = 0;
document.querySelectorAll("p").forEach(p => p.style.display = "none");
document.querySelector("h3").style.display = "none";
startButton.style.display = "none";
  showQuestion();
});