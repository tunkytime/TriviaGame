$(document).ready(function () {
  // VARIABLES //
  var startTime = 20;
  var timeLeft = startTime;
  var interval;
  var correctCount = 0;
  var incorrectCount = 0;
  var unansweredCount = 0;
  var questionNum = 0;
  var timeout = 4000;

  var questionsArr = [{
      question: `Complete this line by the Joker: "If you're good at something, never do it for ________."`,
      correct: "Free",
      choices: ["Free", "Fun", "Yourself", "Money"],
      mp3: "assets/sounds/free.mp3"
    },
    {
      question: `Who said this first? "You either die a hero, or you live long enough to see yourself become the villain."`,
      correct: "Harvey Dent",
      choices: ["Harvey Dent", "Batman", "The Joker", "Commissioner Gordon"],
      mp3: "assets/sounds/hero.mp3"
    },
    {
      question: `Complete the following line by Harvey Dent: "It's not about what I want - it's about what's ________!"`,
      correct: "Fair",
      choices: ["Fair", "Right", "Necessary", "Legal"],
      mp3: "assets/sounds/fair.mp3"
    },
    {
      question: `What was The Joker's first line in the movie?`,
      correct: "And I thought my jokes were bad.",
      choices: [
        "And I thought my jokes were bad.",
        "Nobody panics when things go according to plan.",
        "Good evening ladies and gentlemen!",
        "Why so serious?"
      ],
      mp3: "assets/sounds/jokes.mp3"
    },
    {
      question: `What kind of car does Bruce Wayne drive?`,
      correct: "Lamborghini",
      choices: ["Lamborghini", "Bugatti", "Rolls-Royce", "Ferrari"],
      mp3: "assets/sounds/subtle.mp3"
    },
    {
      question: `What was The Joker's signature phrase?`,
      correct: "Why so serious?",
      choices: [
        "Why so serious?",
        "You're not playing the odds, friend",
        "It's not about money",
        "How 'bout a magic trick?"
      ],
      mp3: "assets/sounds/serious.mp3"
    }
  ];

  // FUNCTIONS //

  // Fisher-Yates shuffle algorithm
  function shuffle(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  }

  function shuffleAnswers() {
    for (var i = 0; i < questionsArr[i].choices.length; i++) {
      shuffle(questionsArr[i].choices);
    }
  }

  // Display the first question
  function generateQuestion(array) {
    hideAnswer();
    var question = array[questionNum].question;
    $("#question").text(question);
  }

  // Display the correct answer and incorrect answer's associated with each question
  function generateAnswers(array) {
    var indexCorrect = array[questionNum].choices.indexOf(
      array[questionNum].correct
    );
    var correctAnswer = array[questionNum].choices[indexCorrect];

    $("#answer-container").empty();

    for (var i = 0; i < array[questionNum].choices.length; i++) {
      if (i !== indexCorrect) {
        var choicesDiv = $(
          `<div class="choice rounded">${array[questionNum].choices[i]}</div>`
        );
        $("#answer-container").append(choicesDiv);
      } else {
        var correctDiv = $(
          `<div class="choice correct rounded">${correctAnswer}</div>`
        );
        $("#answer-container").append(correctDiv);
      }
    }
    // On click events to register user's answer
    $(".choice").on("click", function () {
      if ($(this).hasClass("correct")) {
        correctCount++;
        $(".choice").off("click");
      } else {
        incorrectCount++;
        $(".choice").off("click");
      }
      // Show correct answer, reset the timer, and display next question
      showAnswer();
      stop();
      questionNum++;
      setTimeout(resetTimer, timeout);
      setTimeout(run, timeout);
    });
  }

  // Show answer
  function showAnswer() {
    $("#show-answer").css("display", "block");
    $("#show-answer").html(
      `The correct answer was "${questionsArr[questionNum].correct}"`
    );
    var playQuote = document.createElement("audio");
    playQuote.setAttribute("src", " " + questionsArr[questionNum].mp3 + "");
    playQuote.play();
  }

  // Hide answer
  function hideAnswer() {
    $("#show-answer").css("display", "none");
  }

  // Starts countdown timer
  function run() {
    clearInterval(interval);
    $("#show-time").text(timeLeft);
    interval = setInterval(decrement, 1000);
  }

  // Decrements time by 1 second and ends after cycling through questionsArr
  function decrement() {
    timeLeft--;
    $("#show-time").text(timeLeft);
    if (timeLeft === 0) {
      showAnswer();
      stop();
      questionNum++;
      unansweredCount++;
      setTimeout(resetTimer, timeout);
      setTimeout(run, timeout);
    }
  }

  // Rests timer after each question
  function resetTimer() {
    if (questionNum === questionsArr.length) {
      endGame();
    } else {
      $("#show-answer").empty();
      timeLeft = startTime;
      generateQuestion(questionsArr);
      generateAnswers(questionsArr);
    }
  }

  function stop() {
    clearInterval(interval);
  }

  function endGame() {
    stop();
    $(".main-section").html(`<h4><strong>Game Summary</strong></h4>
			<hr>
			<p>Correct Answers: ${correctCount}</p>
			<p>Incorrect Answers: ${incorrectCount}</p>
			<p>Unanswered Questions: ${unansweredCount}</p>
			<button id="reset-game" class="btn btn-block text-white">Play Again?</button>`);

    $("#reset-game").on("click", function () {
      timeLeft = startTime;
      interval;
      correctCount = 0;
      incorrectCount = 0;
      unansweredCount = 0;
      questionNum = 0;
      $("#gameplay").html(`<div class="main-section">
			<h4 class="mb-3">Time Remaining: <strong><span id="show-time">3</span> Seconds</strong></h4>
			<strong><span id="question"></span></strong>
			<br>
			<div id="answer-container"></div>
			<div id="show-answer"></div>
			</div>`);
      shuffleAnswers();
      setTimeout(generateQuestion(questionsArr), 1000);
      setTimeout(generateAnswers(questionsArr), 1000);
    });
  }

  // START THE GAME //
  $("#start-game").on("click", function () {
    $("#gameplay").css("display", "block");
    $("#start-game").empty();
    shuffleAnswers();
    run();
    generateQuestion(questionsArr);
    generateAnswers(questionsArr);
  });
});