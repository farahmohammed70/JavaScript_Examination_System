document.addEventListener('DOMContentLoaded', function () {
    // to update the score message and pass/fail messages
    const userScore = document.getElementById('userScore');
    const passMessage = document.getElementById('passMessage');
    const failMessage = document.getElementById('failMessage');

    //User Data
    var storedUserDataJSON = localStorage.getItem('userData');



    // Fetch data from local storage

    var subDetails = localStorage.getItem('examData');
    var details = JSON.parse(subDetails);

    //Get the question array
    let questionsArray = details.wrongAnswers.map(answer => answer.question) || [];
    console.log(questionsArray); //right

    //Get the question's body ans answers
    let questionTextsArray = questionsArray.map(question => question.QuestionText);
    let answersArraysArray = questionsArray.map(question => question.Answers);
    console.log(questionTextsArray); //wrong
    console.log(answersArraysArray); //wrong


    function WrongQ() {

        for (var i = 0; i < QArr.length; i++) {
            var qSpan = document.createElement("span");
            qSpan.innerText = QArr[i];

            var qDiv = document.createElement("div");
            qDiv.className = "qDiv";
            qDiv.appendChild(qSpan);

            var answerDiv = document.createElement("div");
            answerDiv.className = "answers";

            for (var j = 0; j < ansArr[i].length; j++) {
                var answerContainerDiv = document.createElement("div");
                answerContainerDiv.className = "answer-container";

                var label = document.createElement('label');
                label.innerHTML = ansArr[i][j];
                label.className = "answer-label";

                var answerInput = document.createElement('input');
                answerInput.type = "checkbox";
                answerInput.disabled = true;
                answerInput.className = "answer-checkbox";

                // Check the wrong answer and update styles
                if (ansArr[i][j] === wAns[i]) {
                    answerInput.checked = true;
                    answerContainerDiv.style.backgroundColor = "red";
                }

                // Check the right answer and update styles
                if (ansArr[i][j] === rAns[i]) {
                    answerContainerDiv.style.backgroundColor = "green";
                }

                // Append the label and checkbox to the answerContainerDiv
                answerContainerDiv.appendChild(label);
                answerContainerDiv.appendChild(answerInput);

                // Append the answerContainerDiv to the answerDiv
                answerDiv.appendChild(answerContainerDiv);
            }

            // Append the answerDiv to the qDiv
            qDiv.appendChild(answerDiv);

            // Append the qDiv to the body
            document.body.appendChild(qDiv);
        }
    }

    //get data from local storage
    let score = details.numberOfRightAnswers;
    let nOfQuestions = details.numberOfQuestions;
    let nOfWrong = details.numberOfWrongAnswers;
    // let nOfRight = details.rightAnswers.length;
    userScore.textContent = (score / nOfQuestions) * 100 + "%";
    //Display Data
    var td1 = document.getElementById("totalQ");
    var td2 = document.getElementById("rightA");
    var td3 = document.getElementById("wrongA");

    td1.textContent = nOfQuestions;
    td2.textContent = score;
    td3.textContent = nOfWrong;

    if (score >= 3) {

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

        //Audio
        // audioSource = "./Resources/tada-fanfare-a-6313.mp3";

        //Confetti Animation
        //-----------Var Inits--------------
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cx = ctx.canvas.width / 2;
        cy = ctx.canvas.height / 2;

        let confetti = [];
        const confettiCount = 300;
        const gravity = 0.5;
        const terminalVelocity = 5;
        const drag = 0.075;
        const colors = [
            { front: 'red', back: 'darkred' },
            { front: 'green', back: 'darkgreen' },
            { front: 'blue', back: 'darkblue' },
            { front: 'yellow', back: 'darkyellow' },
            { front: 'orange', back: 'darkorange' },
            { front: 'pink', back: 'darkpink' },
            { front: 'purple', back: 'darkpurple' },
            { front: 'turquoise', back: 'darkturquoise' }];


        //-----------Functions--------------
        resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            cx = ctx.canvas.width / 2;
            cy = ctx.canvas.height / 2;
        };

        randomRange = (min, max) => Math.random() * (max - min) + min;

        initConfetti = () => {
            for (let i = 0; i < confettiCount; i++) {
                confetti.push({
                    color: colors[Math.floor(randomRange(0, colors.length))],
                    dimensions: {
                        x: randomRange(10, 20),
                        y: randomRange(10, 30)
                    },

                    position: {
                        x: randomRange(0, canvas.width),
                        y: canvas.height - 1
                    },

                    rotation: randomRange(0, 2 * Math.PI),
                    scale: {
                        x: 1,
                        y: 1
                    },

                    velocity: {
                        x: randomRange(-25, 25),
                        y: randomRange(0, -50)
                    }
                });


            }
        };

        //---------Render-----------
        render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            confetti.forEach((confetto, index) => {
                let width = confetto.dimensions.x * confetto.scale.x;
                let height = confetto.dimensions.y * confetto.scale.y;

                // Move canvas to position and rotate
                ctx.translate(confetto.position.x, confetto.position.y);
                ctx.rotate(confetto.rotation);

                // Apply forces to velocity
                confetto.velocity.x -= confetto.velocity.x * drag;
                confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
                confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

                // Set position
                confetto.position.x += confetto.velocity.x;
                confetto.position.y += confetto.velocity.y;

                // Delete confetti when out of frame
                if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

                // Loop confetto x position
                if (confetto.position.x > canvas.width) confetto.position.x = 0;
                if (confetto.position.x < 0) confetto.position.x = canvas.width;

                // Spin confetto by scaling y
                confetto.scale.y = Math.cos(confetto.position.y * 0.1);
                ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

                // Draw confetti
                ctx.fillRect(-width / 2, -height / 2, width, height);

                // Reset transform matrix
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            });

            // Fire off another round of confetti
            if (confetti.length <= 10) initConfetti();

            window.requestAnimationFrame(render);
        };

        //---------Execution--------
        initConfetti();
        render();

        //----------Resize----------
        window.addEventListener('resize', function () {
            resizeCanvas();
        });

        //------------Click------------
        window.addEventListener('click', function () {
            initConfetti();
        });

        //call the function
        WrongQ();
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
        document.body.style.backgroundImage = "url('./Resources/sad.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
    }

});