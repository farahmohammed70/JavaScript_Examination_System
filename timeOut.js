document.addEventListener('DOMContentLoaded', function () {
    // Update the score message and pass/fail messages
    const userScore = document.getElementById('userScore');
    const passMessage = document.getElementById('passMessage');
    const failMessage = document.getElementById('failMessage');

    //User Data
    var storedUserDataJSON = localStorage.getItem('userData');

    // Fetch data from local storage
    var subDetails = localStorage.getItem('examData');
    var details = JSON.parse(subDetails);

    let score = details.numberOfRightAnswers;
    let nOfQuestions = details.numberOfQuestions;
    let nOfWrong = details.numberOfWrongAnswers;
    // let nOfRight = details.rightAnswers.length;
    userScore.textContent = score;

    //Display Data
    var td1 = document.getElementById("totalQ");
    var td2 = document.getElementById("rightA");
    var td3 = document.getElementById("wrongA");

    td1.textContent = nOfQuestions;
    td2.textContent = score;
    td3.textContent = nOfWrong;
    userScore.textContent = score;

    if (score >= 5) {
        //Get stored user data
        if (storedUserDataJSON) {
            var storedUserData = JSON.parse(storedUserDataJSON);
            passMessage.innerText = `Congratulations ${storedUserData.firstName} ${storedUserData.lastName}! You passed the exam.`
        }
        else {
            passMessage.innerText = "Congratulations! You passed the exam."
        }
        passMessage.style.display = 'block';
        passMessage.style.color = 'green';
    }

    else {
        if (storedUserDataJSON) {
            var storedUserData = JSON.parse(storedUserDataJSON);
            failMessage.innerText = `Sorry ${storedUserData.firstName} ${storedUserData.lastName}, you failed the exam. Better luck next time.`
        }
        else {
            failMessage.innerText = "Sorry, you failed the exam. Better luck next time."
        }
        failMessage.style.display = 'block';
        failMessage.style.color = 'red';

    }

});