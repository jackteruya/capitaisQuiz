const questions = [
  {
    question: "Capital do Brasil?",
    answers: [
      { text: "São Paulo", correct: false },
      { text: "Brasília", correct: true },
      { text: "Rio de Janeiro", correct: false },
      { text: "Santiago", correct: false },
    ]
  },
  {
    question: "Capital do Canada?",
    answers: [
      { text: "Montreal", correct: false },
      { text: "Toronto", correct: false },
      { text: "Raptors", correct: false },
      { text: "Otava", correct: true },
    ]
  },
  {
    question: "Capital do Japão?",
    answers: [
      { text: "Tóquio", correct: true },
      { text: "Osaka", correct: false },
      { text: "Hokkaido", correct: false },
      { text: "Otava", correct: false },
    ]
  }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próximo"
  showQuestion();
}

function showQuestion(){
  resetState()
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct; 
    }
    button.addEventListener("click", selectAnswer);
  })
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = "true";
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `Sua pontuação ${score} de ${questions.length}!`;
  nextButton.innerHTML = "Responder novamente";
  nextButton.style.display = "block";

}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
})

startQuiz()