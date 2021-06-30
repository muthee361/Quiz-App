//define questions

const questions = [
    {
        question: "How many continents are there in the world ?",
        a: '5',
        b: '7',
        c: '10',
        d: '12',
        correct: 'b'

    }, {
        question: 'Where was the 2010 World Cup held in ?',
        a: 'Tokyo',
        b: 'Brazil',
        c: 'South Africa',
        d: 'Japan',
        correct: 'c'
    }, {
        question: 'Who owns Alexa ?',
        a: 'Google',
        b: 'Amazon',
        c: 'Tesla',
        d: 'Facebook',
        correct: 'b'

    }, {
        question: 'When was Windows 11 launched ?',
        a: '2021',
        b: '2020',
        c: '2007',
        d: '2017',
        correct: 'a'
    }
]

const container = document.querySelector('.container');
const contentWrapper = document.querySelector('.main');

const quiz_title = document.querySelector('.question');
//quiz answers
const quizOptionsEl = document.querySelectorAll('.questions');

// question UI variables
const quiz_a = document.getElementById('quiz_a');
const quiz_b = document.getElementById('quiz_b');
const quiz_c = document.getElementById('quiz_c');
const quiz_d = document.getElementById('quiz_d');

// next button
const nextBtn = document.querySelector('.btn');

//score and current question
let score = 0;
let currentQuestion = 0;

//load question
loadQuestion();

function loadQuestion() {
    // deselect answers at initial load
    deselectAnswers();

    // loda question
    const currentQuestionData = questions[currentQuestion];
    quiz_title.innerText = currentQuestionData.question;
    quiz_a.innerText = currentQuestionData.a;
    quiz_b.innerText = currentQuestionData.b;
    quiz_c.innerText = currentQuestionData.c;
    quiz_d.innerText = currentQuestionData.d;
}

// get selected answer
function answerSelected() {
    let answer = undefined;
    quizOptionsEl.forEach((quiz_title) => {
        if (quiz_title.checked) {
            answer = quiz_title.id;
        }
    });

    return answer;
}

//deselect answers
function deselectAnswers(){
    quizOptionsEl.forEach((quiz_title) => {
        quiz_title.checked = false;
            
    });
}
// add click event to button
nextBtn.addEventListener('click', nextQuiz);

function nextQuiz() {
    
    const answer = answerSelected();
    //check if answer is selected before going next question
    if (answer) {
        //verify answer correct
        if (answer === questions[currentQuestion].correct) {
            score++;
            
        }

        currentQuestion++;
        // check if questions completed
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showScore();
        }
    }
    else{
        setTimeout(showError,2000)
        
    }


}

function showScore() {
     
    container.innerText = "Results";
    container.style.textAlign = 'center';
    const finished = document.createElement('img');
    finished.src = "./images/loading.gif";      
    const div = document.createElement('div');
    div.style.paddingTop = '1rem';
    div.className = 'loader';
   
    div.appendChild(finished);

    container.appendChild(div);

    //clear loader
    setTimeout(clearLoader, 3000);
}

//clear loader
function clearLoader(){
    document.querySelector('.loader').remove();
    const results = `<span><h2>Results </h2><br>You scored ${score} out of ${questions.length} questions.
                    <br> </span>`;
    container.innerHTML = results;
    container.style.textAlign = 'center';
    //play again button
    const btn = document.createElement('button');
    btn.style.padding = '1rem';
    btn.style.borderRadius = '6px';
    btn.style.color = 'white';
    btn.style.backgroundColor = 'lightseagreen';
    btn.style.fontSize = '1.2rem';
    btn.style.margin = '2rem';
    btn.style.width = '50%';
    btn.className = 'btn';
    
    //add event listener
    btn.addEventListener('click', playAgain);
     
    function playAgain(){
        location.reload();
    }

    //create and append text node
    btn.appendChild(document.createTextNode('Play Again'));
    //append button
    container.appendChild(btn);
}


//show error
function showError(){
    //create div
    const errorDiv = document.createElement('div');

    //style div
    errorDiv.style.padding = '0.7rem';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.backgroundColor = '#27ae60';
    errorDiv.style.color = 'white';
    errorDiv.style.borderRadius = '6px';
    errorDiv.className = 'error';

    //create text node and append
    errorDiv.appendChild(document.createTextNode('Please, select an answer to proceed..'));

    //insert div
    contentWrapper.insertBefore(errorDiv, quiz_title);

    //clear error
    setTimeout(clearError, 2000); 


}

//clear error

function clearError(){
    document.querySelector('.error').remove();
}

