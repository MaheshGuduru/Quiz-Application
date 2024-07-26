const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correct: "Paris"
    },
    {
        question: "What is the capital of Italy?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correct: "Rome"
    },
    {
        question: "What is the capital of Germany?",
        options: ["Paris", "London", "Berlin", "Rome"],
        correct: "Berlin"
    },
    {
        question: "What is the capital of Spain?",
        options: ["Madrid", "London", "Berlin", "Rome"],
        correct: "Madrid"
    },
    {
        question: "What is the capital of Portugal?",
        options: ["Lisbon", "London", "Berlin", "Rome"],
        correct: "Lisbon"
    },
    {
        question: "What is the capital of Russia?",
        options: ["Moscow", "London", "Berlin", "Rome"],
        correct: "Moscow"
    },
    {
        question: "What is the capital of China?",
        options: ["Beijing", "London", "Berlin", "Rome"],
        correct: "Beijing"
    },
    {
        question: "What is the capital of Japan?",
        options: ["Tokyo", "London", "Berlin", "Rome"],
        correct: "Tokyo"
    },
    {
        question: "What is the capital of India?",
        options: ["New Delhi", "London", "Berlin", "Rome"],
        correct: "New Delhi"
    },
    {
        question: "What is the capital of Australia?",
        options: ["Canberra", "London", "Berlin", "Rome"],
        correct: "Canberra"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
    startTimer();
});

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.className = "option";
        button.textContent = option;
        button.onclick = () => selectOption(button);
        li.appendChild(button);
        optionsElement.appendChild(li);
    });
}

function selectOption(button) {
    const options = document.querySelectorAll(".option");
    options.forEach(option => option.disabled = true);

    const selectedOption = button.textContent;
    const feedbackElement = document.getElementById("feedback");
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correct) {
        feedbackElement.textContent = `${selectedOption}: your answer is correct`;
        score++;
    } else {
        feedbackElement.textContent = `${selectedOption}: your answer is wrong. Correct answer: ${currentQuestion.correct}`;
    }

    document.getElementById("score").textContent = score;
}

function submitAnswer() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        document.getElementById("feedback").textContent = '';
        enableOptions();
    } else {
        endQuiz();
    }
}

function enableOptions() {
    const options = document.querySelectorAll(".option");
    options.forEach(option => option.disabled = false);
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time-left").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    document.getElementById("feedback").textContent = "Quiz Over! Final Score: " + score;
    document.querySelector(".quiz-body").style.display = "none";
}
