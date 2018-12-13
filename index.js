'use strict'; 

const QUESTIONS = [
    {
        id: 0,
        question: "When Cameron was sick in bed, what was he singing about?", 
        answers: [
          {
            text: "His dad’s car", 
            correct: false
          },
          {
            text: "Himself in Egypt", 
            correct: true
          },
          {
            text: "Ferris' previous stunts", 
            correct: false
          },
          {
            text: "Gibberish", 
            correct: false
          },
        ]
    },
    {
        id: 1,
        question: "What was Ferris Bueller’s stated motive for ditching school and having an adventure in the city?",
        answers: [
            {
                text: "You should have as much fun as you can.",
                correct: false
            },
            {
                text:  "I need one good day with my friends before college.", 
                correct: false
            },
            {
                text: "All I wanted to do was give Cameron a great day.", 
                correct: true
            },
            {
                text: "I simply cannot take another day with Rooney.",
                correct: false
            }
        ]
    }, 
    {
        id: 2, 
        question: "Ferris’ sister’s name was Jeanie, but according to her, her friends called her what?", 
        answers: [
            {
                text: "Shauna", 
                correct: true
            },
            {
                text: "Jean", 
                correct: false
            },
            {
                text: "Jane", 
                correct: false
            },
            {
                text: "Sally", 
                correct: false
            },
        ]
    },
    {
        id: 3, 
        question: "What three symptoms does the singing telegram nurse describe during her singing telegram to Ferris?", 
        answers: [
            {
                text: "Headache", 
                correct: false
            },
            {
                text: "Fever", 
                correct: false
            },
            {
                text: "Chill", 
                correct: false
            },
            {
                text: "All of the above", 
                correct: true
            },
        ]
    },
    {
        id: 4, 
        question: "Who directed Ferris Bueller’s Day Off?", 
        answers: [
            {
                text: "John Waters", 
                correct: false
            },
            {
                text: "John Hughes", 
                correct: true
            },
            {
                text: "Cameron Crowe", 
                correct: false
            },
            {
                text: "Richard Linklater", 
                correct: false
            },
        ]
    },
]
  
  let userInfo = {
      score: 0, 
      currentQuestion: 0
  }

  function clearMainContent(){
    $('main').children().remove(); 
  }

  function increaseUserScore(){
    userInfo.score +=1 ; 
}

  function renderCorrectAnswerPage(){
    let correctAnswerPage = `
    <section>
    <h1>Correct!</h1>
    <iframe class="gif" src="https://giphy.com/embed/T18sJKpwRdfQ4" width="480" height="250" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/T18sJKpwRdfQ4">via GIPHY</a></p>
    </section>`; 
    $('main').append(correctAnswerPage); 
}

function renderUserInfo(){
    clearUserInfo(); 
     let userInfoText = 
     `<h2 class="question">Question: <span class="question-num">${userInfo.currentQuestion}</span>/<span class="question-total">${QUESTIONS.length}</span></h2>
     <h2 class="score">Score: ${userInfo.score} </h2>`; 
      $('.user-info').append(userInfoText); 
  }

function correctAnswerFunctions(){
    increaseUserScore(); 
    renderCorrectAnswerPage(); 
    renderUserInfo(); 
}


function findCorrectAnswer(){ 
    let correctAnswer; 
    let possibleAnswers = QUESTIONS[userInfo.currentQuestion-1].answers;
    possibleAnswers.forEach(key => {
        if(key.correct){
            correctAnswer = key.text
        }
    }); 
    return correctAnswer; 
};

function renderWrongAnswerPage(){
    let wrongAnswerPage = `
    <section>
    <h1>Nope!</h1>
    <p class="response-corrected">The correct answer is "${findCorrectAnswer()}"</p>
    <iframe class ="gif" src="https://giphy.com/embed/sW6P26sp3HFvy" width="480" height="197" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/ferris-buellers-day-off-bueller-sW6P26sp3HFvy">via GIPHY</a></p>
    </section>`; 
    $('main').append(wrongAnswerPage); 
}

function handleSubmitAnswer(event, questionName){
    event.preventDefault(); 
    var selAnswer = $(`input[value="true"]`).is(':checked');
    clearMainContent(); 
    $('.js-btn').text("Next"); 
    $('.js-btn').toggleClass("visible"); 
    if(selAnswer === true){
        return correctAnswerFunctions();
    } else {
        return renderWrongAnswerPage(); 
    }
}

  function renderQuestion(questionNum){
    let questionObj = QUESTIONS[questionNum-1];
    let questionTemplate = `
        <section class="question">
            <div class="question-text">
                <h2>${questionObj.question}</h2>
            </div>
                <form class="quiz-form">
                    <div class="answer">
                        <input type="radio" name="question-${questionObj.id}" value=${questionObj.answers[0].correct}>${questionObj.answers[0].text}<br>
                    </div>
                    <div class="answer">
                        <input type="radio" name="question-${questionObj.id}" value=${questionObj.answers[1].correct}>${questionObj.answers[1].text}<br>
                    </div>
                    <div class="answer">
                        <input type="radio" name="question-${questionObj.id}" value=${questionObj.answers[2].correct}>${questionObj.answers[2].text}<br>
                    </div>
                    <div class="answer">
                        <input type="radio" name="question-${questionObj.id}" value=${questionObj.answers[3].correct}>${questionObj.answers[3].text}<br>
                    </div> 
                    <button class="js-submit" type="submit">Submit</button>
                </form>
       </section>`;
    $('main').append(questionTemplate); 
    let questionName = `question-${questionObj.id}`
    $('.js-submit').on('click', event => handleSubmitAnswer(event, questionName))
  }

  function clearUserInfo(){
      $('.user-info').children().remove(); 
  }

  function incrementQuestion(){
    userInfo.currentQuestion += 1; 
  }

  function renderFinalResultsPage(){
      clearMainContent(); 
      clearUserInfo(); 
      userInfo.currentQuestion = 0; 
      const results = `
      <h1>You did it!</h1>
      <h2>You got ${userInfo.score} out of ${QUESTIONS.length} questions correct.</h2>
      `; 
      $('main').append(results); 
      $('.js-btn').text("Take Again"); 
  }
  
  function renderHomePage(){
    $('.js-btn').on('click', event => {
        if(userInfo.currentQuestion === QUESTIONS.length){
            return renderFinalResultsPage(); 
        } else if (userInfo.currentQuestion === 0){
            userInfo.score = 0; 
        }
        incrementQuestion()
        clearMainContent();  
        renderUserInfo(userInfo); 
        renderQuestion(userInfo.currentQuestion, );  
        $('.js-btn').toggleClass('visible');  
    })
  }
  
  function handleQuizApp() {
    renderHomePage();  
  }
  
  $(handleQuizApp);