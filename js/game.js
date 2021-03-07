const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById('loader');
const game = document.getElementById('game');

// console.log(choices);

const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const cento = 100;


let currentQuestion = {};
let acceptingAnswer = false;

let score = 0;
let questionCounter = 0;
let availableQuestions = [];


// CONSTANT

// FETCH JSON
let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then(res =>{
    console.log(res);
    return res.json();
}).then(loadedQuestions =>{
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map( loadedQuestion =>{
        const formattedQuestion = {
            question : loadedQuestion.question
        };

        const answerChoices = [ ...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3 ) + 1;
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);
        
        answerChoices.forEach((choice, index) =>{
            formattedQuestion["choice" + (index + 1)] = choice;
        });

        return formattedQuestion;
    });
    // questions = loadedQuestions;


    startGame();
})
.catch(err =>{
    console.error(err);
});



const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
}

getNewQuestion = () => {

    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {

        localStorage.setItem('mostRecentScore', score);
        // go to the end page
        return window.location.assign("/end.html");
    }

    questionCounter++;
    // progressText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    // or ES6
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS} `;
    
    // ************************************************************************************
    
    //UPDATE PROGRESS BAR
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    
    // ************************************************************************************
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) =>{
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswer = true;

};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
    // console.log(e.target);
        if(!acceptingAnswer) return;

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        // const classToApply = 'incorrect';

        // if(selectedAnswer == currentQuestion.answer){
        //     classToApply = 'correct';
        // }

        // or

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        // console.log(selectedAnswer == currentQuestion.answer);

        // ****************************************
        if(classToApply === 'correct'){
           score += 10;
           scoreText.innerText = score;
        };
        // // ****************************************

        selectedChoice.parentElement.classList.add(classToApply);
        
        
        setTimeout(()=> {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
           

    });
});

// ***************************************

function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}

// *******************************************



// startGame();