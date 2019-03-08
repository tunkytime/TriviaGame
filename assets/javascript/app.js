$(document).ready(function() {
  
	var timeLeft = 3;
	var interval;
	var correctCount = 0;
	var incorrectCount = 0;
	var unansweredCount = 0;
	var questionNum = 0;
	
	var questionsArr = [
		{
			question: "This is a question?",
			answerCorrect: "this is the correct answer",
			dummyAnswers: ["dummy1", "dummy2", "dummy3"],
		},
		{
			question: "This is question 2?",
			answerCorrect: "this is another correct answer",
			dummyAnswers: ["dummy4", "dummy5", "dummy6"],
		},
		{
			question: "This is question 3?",
			answerCorrect: "this is also correct",
			dummyAnswers: ["dummy7", "dummy8", "dummy9"],
		},
		{
			question: "This is question 4?",
			answerCorrect: "this is a correct answer too",
			dummyAnswers: ["dummy10", "dummy11", "dummy12"],
		},
		{
			question: "Question 5?",
			answerCorrect: "i am correct",
			dummyAnswers: ["dummy13", "dummy14", "dummy15"],
		},
	];
	
	function generateQuestion (array) {
		if (questionNum === (questionsArr.length - 1)) {
			endGame();
		} else {	
			var question = array[questionNum].question;
			$("#question").text(question);
		};
	};
	
	function generateAnswers(array) {
			var correctAnswerDiv = $(`<div class="answer correct">${array[questionNum].answerCorrect}</div>`);
			$("#answer-container").html(correctAnswerDiv);
				for (var i = 0; i < array[questionNum].dummyAnswers.length; i++) {
					var dummyAnswersDiv = $(`<div class="answer incorrect">${array[questionNum].dummyAnswers[i]}</div>`);
					$("#answer-container").append(dummyAnswersDiv);
				}	
			
			// On click events
			$(".answer").on("click", function () {			
				if( $(this).hasClass("correct")) {
					correctCount++;
					$(".answer").off("click");
				} else {
					incorrectCount++;
					$(".answer").off("click");
				}
				showAnswer();
				stop();
				questionNum++;
				setTimeout(resetTimer, 2000);
				setTimeout(run, 2000);
			});		
	};
	
	function showAnswer() {
		if (questionNum === questionsArr.length) {
			endGame(); 
		} else {
		var newDiv = $(`<div id="show-answer"></div>`);
		$("#show-answer").html(`The correct answer was ${questionsArr[questionNum].answerCorrect}`);
	};
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
		} 
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
		}
	};
	
	function stop() {
		clearInterval(interval);
	};
	
	function endGame() {
		stop();
		$(".main-section").html
		(`<h4>Game Summary</h4>
		<p>Correct Answers: ${correctCount}</p>
		<p>Incorrect Answers: ${incorrectCount}</p>
		<p>Unanswered Questions: ${unansweredCount}</p>
		<br>
		<button id="reset-game">Play Again?</button>`);
		
		$("#reset-game").on("click", function () {
			resetGame();
		});
	};
	
	// Resets the game
	function resetGame() {
		$(".main-section").html
		(`<div id="gameplay">
		<h4 class="mb-3">Time Remaining: <span id="show-time">3</span> Seconds</h4>
		<strong><span id="question">Question goes here:</span></strong><br>
		<div id="answer-container">
		</div>
		</div>`)
	};
	
	// Starts the game 1st time
	run();
	generateQuestion(questionsArr);	
	generateAnswers(questionsArr);
});
