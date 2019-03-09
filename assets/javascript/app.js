$(document).ready(function () {

	// VARIABLES //
	var timeLeft = 3;
	var interval;
	var correctCount = 0;
	var incorrectCount = 0;
	var unansweredCount = 0;
	var questionNum = 0;

	var questionsArr = [{
			question: "Question #1",
			correct: "correct #1",
			choices: ["correct #1", "dummy1", "dummy2", "dummy3"],
		},
		{
			question: "Question #2",
			correct: "correct #2",
			choices: ["correct #2", "dummy4", "dummy5", "dummy6"],
		},
		{
			question: "Question #3",
			correct: "correct #3",
			choices: ["correct #3", "dummy7", "dummy8", "dummy9"],
		},
		{
			question: "Question #4",
			correct: "correct #4",
			choices: ["correct #4", "dummy10", "dummy11", "dummy12"],
		},
		{
			question: "Question 5?",
			correct: "correct #5",
			choices: ["correct #5", "dummy13", "dummy14", "dummy15"],
		},
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
	};

	function shuffleAnswers() {
		for (var i = 0; i < questionsArr[i].choices.length; i++) {
			shuffle(questionsArr[i].choices);
		};
	};

	// Display the first question
	function generateQuestion(array) {
		var question = array[questionNum].question;
		$("#question").text(question);
	};

	// Display the correct answer and dummy answer's associated with each question
	function generateAnswers(array) {
		var indexCorrect = array[questionNum].choices.indexOf(array[questionNum].correct)
		var correctAnswer = array[questionNum].choices[indexCorrect];

		$("#answer-container").empty();

		for (var i = 0; i < array[questionNum].choices.length; i++) {
			if (i !== indexCorrect) {
				var choicesDiv = $(`<div class="choice">${array[questionNum].choices[i]}</div>`);
				$("#answer-container").append(choicesDiv);
			} else {
				var correctDiv = $(`<div class="choice correct">${correctAnswer}</div>`);
				$("#answer-container").append(correctDiv);
			};
		};
		// On click events to register user's answer
		$(".choice").on("click", function () {
			if ($(this).hasClass("correct")) {
				correctCount++;
				$(".choice").off("click");
			} else {
				incorrectCount++;
				$(".choice").off("click");
			};
			// Show correct answer, reset the timer, and display next question
			showAnswer();
			stop();
			questionNum++;
			setTimeout(resetTimer, 2000);
			setTimeout(run, 2000);
		});
	};

	// Show answer
	function showAnswer() {
		$("#show-answer").html(`The correct answer was ${questionsArr[questionNum].correct}`);
	};

	// Starts countdown timer
	function run() {
		clearInterval(interval);
		$("#show-time").text(timeLeft);
		interval = setInterval(decrement, 1000);
	};

	// Decrements time by 1 second and ends after cycling through questionsArr
	function decrement() {
		timeLeft--;
		$("#show-time").text(timeLeft);
		if (timeLeft === 0) {
			showAnswer();
			stop();
			questionNum++;
			unansweredCount++;
			setTimeout(resetTimer, 2000);
			setTimeout(run, 2000);
		};
	};

	// Rests timer after each question
	function resetTimer() {
		if (questionNum === questionsArr.length) {
			endGame();
		} else {
			$("#show-answer").empty();
			timeLeft = 3;
			generateQuestion(questionsArr);
			generateAnswers(questionsArr);
		};
	};

	function stop() {
		clearInterval(interval);
	};

	function endGame() {
		stop();
		$(".main-section").html(`<h4>Game Summary</h4>
			<p>Correct Answers: ${correctCount}</p>
			<p>Incorrect Answers: ${incorrectCount}</p>
			<p>Unanswered Questions: ${unansweredCount}</p>
			<br>
			<button id="reset-game">Play Again?</button>`);

		$("#reset-game").on("click", function () {
			timeLeft = 3;
			interval;
			correctCount = 0;
			incorrectCount = 0;
			unansweredCount = 0;
			questionNum = 0;
			$(".main-section").html(`
			
			<div id="gameplay">
				<h4 class="mb-3">Time Remaining: <span id="show-time">3</span> Seconds</h4>
				<strong><span id="question">Question goes here:</span></strong>
				<div id="answer-container"></div>
				<div id="show-answer"></div>
			</div>`)
			shuffleAnswers();
			setTimeout(generateQuestion(questionsArr), 1000);
			setTimeout(generateAnswers(questionsArr), 1000);
		});
	};

	// START THE GAME //
	shuffleAnswers();
	run();
	generateQuestion(questionsArr);
	generateAnswers(questionsArr);
});