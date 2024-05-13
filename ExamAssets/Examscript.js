class Question {
  #QuestionID;
  #QuestionText;
  #QuestionAnswers;
  #RightAnswer;
  constructor(QID, Qtext, Qanswers, RightAns) {
    this.#QuestionID = QID;
    this.#QuestionText = Qtext;
    this.#QuestionAnswers = Qanswers;
    this.#RightAnswer = RightAns;
  }
  get QuestionText() {
    return this.#QuestionText;
  }
  //hamama
  get RightAnswer() {
    return this.#RightAnswer;
  }
  get QuestionID() {
    return this.#QuestionID;
  }
  get Answers() {
    return this.#QuestionAnswers;
  }
  set Answers(answers) {
    if (answers.length < 3 || typeof answers != "object")
      throw "answers shouldn't be less than 3 ";
    else this.#QuestionAnswers = answers;
  }
  set RightAnswer(answer) {
    this.#RightAnswer = answer;
  }
  set QuestionText(text) {
    this.#QuestionText = text;
  }
  set QuestionID(id) {
    this.#QuestionID = id;
  }
}
function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    var number = Math.random();
    // console.log(number);
    // console.log(number * (i + 1));
    const j = Math.floor(number * (i + 1));
    // console.log(j);
    [array[i], array[j]] = [array[j], array[i]];
  }
}
//for progress bar updating 
var CurrentCheckedIndexes=[];
//Change Answers & Questions content
function ChangeContent(array, Current_Question, Html_Element) {
//clear the choices content 
  $(Html_Element).empty();
  //change the Question text
  $(".question span").text(QuestionsArr[Current_Question].QuestionText);
  //check the current index to hide or show the next and previous Buttons  
  checkIndex(Current_Question);
  //display the answers text of that question
  array[Current_Question].Answers.forEach((AnswerText) => {
    var label = $(`<label for="${AnswerText}">${AnswerText}</label>`);
    var radio = $(`<input type="radio" name="choices" id="${AnswerText}" value="${AnswerText}">`);
    var answersDiv = $("<div></div>").append(label).append(radio);
    $(".answers").append(answersDiv);
    answersDiv.fadeIn();
    //update the page index 
    $(".question-number").text(Current_Question + 1);
  });
  $("input[name='choices']").on("change", () => {
    //save the answered choices
    var value = $("input[name='choices']:checked").val();
    var QuestionId = QuestionsArr[Current_Question].QuestionID;
    AnswersArr[Current_Question] = { id: QuestionId, answer: value };

    if (!CurrentCheckedIndexes.includes(Current_Question)){
      //update the progress bar
      var progressBar = $(".progress");
      progressBar[0].style.setProperty("--webkit-progress-value-color",getColor(progressBarValue));
      progressBar.val(progressBarValue);
      progressBarValue += progressBarStep;
      alreadyChecked=true;
      console.log("in the true")
      CurrentCheckedIndexes.push(Current_Question);

    }
  });
}
//well .. the name is enough 
function searchQuestionById(id) {
  return QuestionsArr.find((question) => question.QuestionID == id);
}

//Checks the previously Checked answers
function CheckRadios(array, CurrentPosition) {
  // console.log(array[CurrentPosition].answer)
  $(`#${array[CurrentPosition].answer}`).prop("checked", true);
}
//add marked questions to the marked list
function AddMarkedQuestion(QID, QArray, QIndex, AnsArray) {
  //add the div
  if ($(`#marked-question${QID}`).length == 0) {
    var MarkedDiv = $(
      `<div id='marked-question${QID}' class='marked-questions-content'><span>Question ${
        QIndex + 1
      }</span><span class='delete-btn'>X</span></div>`
    );
    $(".marked-questions").append(MarkedDiv);
    $(".marked-questions-content").on("click", function () {
      // debugger
      CurrentQuestion = QIndex;
      console.log(CurrentQuestion);
      ChangeContent(QArray, QIndex, ".answers");
      if (AnsArray[QIndex]) CheckRadios(AnsArray, QIndex);
    });
    $(".delete-btn").on("click", () => {
      $(`#marked-question${QuestionsArr[CurrentQuestion].QuestionID}`).remove();
    });
  }
}

function checkIndex(Current_Question) {
  if (Current_Question == 0) {
    $("#previous").prop("disabled", true);
    $("#previous").fadeOut();
  }

  if (Current_Question > 0) {
    $("#previous").fadeIn();
    $("#previous").prop("disabled", false);
  }

  if (
    Current_Question < QuestionsArr.length &&
    !(Current_Question + 1 == QuestionsArr.length)
  ) {
    $("#next").prop("disabled", false);
    $("#next").fadeIn();
  }

  if (Current_Question + 1 == QuestionsArr.length) {
    $("#next").prop("disabled", true);
    $("#next").fadeOut();
  }
  // console.log(Current_Question);
}
function checkIfMarked(id) {
  var flag;
  if (
    $(`#marked-question${QuestionsArr[CurrentQuestion].QuestionID}`).length == 0
  )
    flag = false;
  else flag = true;
  return flag;
}

// Function to update the timer
function updateTimer() {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  // Format minutes and seconds with leading zeros
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  // Update the timer span
  document.getElementById("timer").textContent = `${formattedMinutes}:${formattedSeconds}`;

  // Decrease the time by 1 second
  timeInSeconds--;

  // Change color to red in the last 10 seconds
  if (timeInSeconds <= 10) {
    document.getElementById("timer").style.color = "red";
  }
}

//Function for progress bar color change
function getColor(value) {
  // Determine the color based on the percentage
  if (value <= 50) {
    // Red to yellow gradient
    var red = 255;
    var green = Math.floor(value * 5.1);
    return `rgb(${red}, ${green}, 0)`;
  } else {
    // Yellow to green gradient
    var red = Math.floor(255 - (value - 50) * 5.1);
    var green = 255;
    return `rgb(${red}, ${green}, 0)`;
  }
}

var QuestionsArr = [
  new Question(
    1,
    "What does the abbreviation HTML stand for?",
    [
      "HyperText Markup Language",
      "HighText Markup Language",
      "HyperText Markdown Language",
      "None of the above",
    ],
    "HyperText Markup Language"
  ),
  new Question(
    2,
    "Which of the following CSS framework is used to create a responsive design?",
    ["bootstrap", "laravel", "rails", "django"],
    "bootstrap"
  ),
  new Question(
    3,
    "Which of the following CSS selectors are used to specify a group of elements?",
    ["tag", "id", "class", "both class and tag"],
    "class"
  ),
  new Question(
    4,
    "Which of the following has introduced text, list, box, margin, border, color, and background properties?",
    ["Html", "PHP", "CSS", "Ajax"],
    "CSS"
  ),
  new Question(
    5,
    "What's the name of our coding filler in JS ",
    ["Hamada", "Hamoda", "Hamo", "Dodo"],
    "Hamada"
  ),
];
var AnswersArr = [];
var submissionDetails = {
  numberOfQuestions: QuestionsArr.length,
  numberOfRightAnswers: 0,
  get numberOfWrongAnswers() {
    return this.numberOfQuestions - this.numberOfRightAnswers;
  },
  rightAnswers: [],
  wrongAnswers: [],
};
var progressBar = $(".progress");
var progressBarStep=(1/QuestionsArr.length)*100;
var progressBarValue=progressBarStep
let CurrentQuestion = 0;
let timeInSeconds = 90;
$(document).ready(() => {
  //========================================
  // Clearing  exam Data in local storage
  localStorage.removeItem("examData");
  //========================================
  // page initialization
  
    
    shuffle(QuestionsArr); //shuffle allQuestions
    //================================================
    // 1st Question display
    ChangeContent(QuestionsArr,CurrentQuestion,".answers")
    
  //===================================================
  //Setting time Interval
  const timerInterval = setInterval(updateTimer, 1000);
  //===================================================
  //Setting timeout
  setTimeout(() => {
    CurrentQuestion = 0;
    AnswersArr.forEach((Answer) => {
      if (Answer.answer == QuestionsArr[CurrentQuestion].RightAnswer) {
        submissionDetails.numberOfRightAnswers++;
        submissionDetails.rightAnswers.push(searchQuestionById(Answer.id));
      } else
        submissionDetails.wrongAnswers.push({
          question: searchQuestionById(Answer.id),
          userAnswer: Answer.answer,
        });
      CurrentQuestion++;
    });
    console.log(submissionDetails);
    CurrentQuestion = $(".question-number").text() - 1;
    let jsonString = JSON.stringify(submissionDetails);
    localStorage.setItem("examData", jsonString);
    location.replace("./timeOut.html");
  }, timeInSeconds * 1000);
  //============================================================================================
  //Next Button functionality
  $("#next").on("click", () => {
    CurrentQuestion++;
    checkIndex(CurrentQuestion);
    ChangeContent(QuestionsArr, CurrentQuestion, ".answers");
    if (AnswersArr[CurrentQuestion]) CheckRadios(AnswersArr, CurrentQuestion);
    if (checkIfMarked(QuestionsArr[CurrentQuestion].QuestionID))
      $("#mark").css("background-color", "red");
    else $("#mark").css("background-color", "#4caf50");
  });

  $("#previous").hide();

  $("#previous").on("click", () => {
    CurrentQuestion--;
    checkIndex(CurrentQuestion);
    ChangeContent(QuestionsArr, CurrentQuestion, ".answers");
    if (AnswersArr[CurrentQuestion]) CheckRadios(AnswersArr, CurrentQuestion);
    if (checkIfMarked(QuestionsArr[CurrentQuestion].QuestionID))
      $("#mark").css("background-color", "red");
    else $("#mark").css("background-color", "#4caf50");
  });

  $("#mark").on("click", () => {
    if (
      $(`#marked-question${QuestionsArr[CurrentQuestion].QuestionID}`).length ==
      0
    ) {
      AddMarkedQuestion(
        QuestionsArr[CurrentQuestion].QuestionID,
        QuestionsArr,
        CurrentQuestion,
        AnswersArr
      );
      $("#mark").css("background-color", "red");
    } else {
      $("#mark").css("background-color", "#4caf50");
      $(`#marked-question${QuestionsArr[CurrentQuestion].QuestionID}`).remove();
    }
  });

  $("#submit").on("click", function () {
    var flag = true;
    // debugger
    if (AnswersArr.length == 0 || AnswersArr.length < QuestionsArr.length) {
      flag = window.confirm(
        "Are you sure you want to submit ? you didn't answer all of your questions\n Click OK to proceed or Cancel to keep answering"
      );
    }
    if (flag) {
      CurrentQuestion = 0;
      AnswersArr.forEach((Answer) => {
        if (Answer.answer == QuestionsArr[CurrentQuestion].RightAnswer) {
          submissionDetails.numberOfRightAnswers++;
          submissionDetails.rightAnswers.push(searchQuestionById(Answer.id));
        } else
          submissionDetails.wrongAnswers.push({
            question: searchQuestionById(Answer.id),
            userAnswer: Answer.answer,
          });
        CurrentQuestion++;
      });
      console.log(submissionDetails);
      CurrentQuestion = $(".question-number").text() - 1;
    }
    let jsonString = JSON.stringify(submissionDetails);
    localStorage.setItem("examData", jsonString);
    location.replace("./results.html");
  });
});
