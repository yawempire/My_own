const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Moving to the next question.");
            currentQuestionIndex++;
            loadQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        alert(`Quiz completed! Your score: ${score}`);
        currentQuestionIndex = 0;
        score = 0;
    }
    
    timeLeft = 30;
    startTimer();

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('div');
        button.classList.add('option');
        button.innerText = option;
        button.onclick = () => selectOption(option);
        optionsElement.appendChild(button);
    });
}

function selectOption(option) {
    clearInterval(timerInterval);
    const currentQuestion = questions[currentQuestionIndex];

    if (option === currentQuestion.answer) {
        score++;
        alert("Correct!");
    } else {
        alert("Wrong answer. The correct answer was: " + currentQuestion.answer);
    }
    
    scoreElement.innerText = `Score: ${score}`;
    currentQuestionIndex++;
    loadQuestion();
}

nextButton.onclick = loadQuestion;

loadQuestion();

