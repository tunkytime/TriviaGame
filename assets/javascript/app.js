$(document).ready(function() {
  
	var timeLeft = 3;
	var interval;
	var correctCount;
	var incorrectCount;
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
		var question = array[questionNum].question;
		$("#question").text(question);
		var answerDiv = $(`<div class="answer">${array[questionNum].answerCorrect}</div>`);
		$("#answer-container").html(answerDiv);
		for (var i = 0; i < array[questionNum].dummyAnswers.length; i++) {
			var answerDiv = $(`<div class="answer">${array[questionNum].dummyAnswers[i]}</div>`);
			$("#answer-container").append(answerDiv);
		};
	};
		
	function run() {
		interval = setInterval(decrement, 1000);
	};
  
	function decrement() {
		timeLeft--;
		$("#show-time").text(timeLeft);
		if (timeLeft === 0) {
			reset();
			questionNum++;	
			console.log(questionNum);
			generateQuestion(questionsArr);
		} 
		if (questionNum === questionsArr.length) {
			stop();
		}
	};
	
	function reset() {
		timeLeft = 3;
	};
	
	function stop() {
		clearInterval(interval);
	}
	
	run();
	generateQuestion(questionsArr);
	
});
