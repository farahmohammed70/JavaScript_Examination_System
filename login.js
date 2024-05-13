//get the p elements to display the error msg
var e = document.getElementById("Email");
var p = document.getElementById("Password");

//Retrieve user data from local storage
var storedUserDataJSON = localStorage.getItem('userData');

//Form validation
function validateForm() {

    //get user input values
    var Email = document.forms["loginForm"]["Email"].value;
    var Password = document.forms["loginForm"]["Password"].value;

    //Check if user data exists in local storage
    if (storedUserDataJSON) {
        var storedUserData = JSON.parse(storedUserDataJSON);

        //Check if the email is empty
        if (Email === '') {
            resetErrorMsgs();
            e.textContent = "Please enter your email address."
            e.style.display = "block";
            e.style.color = "red";
            return false;
        }

        //Compare entered email to stored user data
        else if (Email !== storedUserData.email) {
            resetErrorMsgs();
            e.textContent = "Incorrect email address."
            e.style.display = "block";
            e.style.color = "red";
            clearValue(document.forms["loginForm"]["Email"]);
            return false;
        }

        //Check if the password is empty
        if (Password === '') {
            resetErrorMsgs();
            p.textContent = "Please enter your password."
            p.style.display = "block";
            p.style.color = "red";
            return false;
        }

        //Compare entered password to stored user data
        else if (Password !== storedUserData.password) {
            resetErrorMsgs();
            p.textContent = "Incorrect password."
            p.style.display = "block";
            p.style.color = "red";
            clearValue(document.forms["loginForm"]["Password"]);
            return false;
        }

        //Successful login, redirect to new page
        else {
            location.replace('Exam.html');

            //Modify the browser's history to replace the current state
            history.replaceState(null, null, 'Exam.html');
        }

    }

    //No user data is found in local storage
    else {
        alert("No user data found in local storage");
    }

    return true;

}

//Reset error messages
function resetErrorMsgs() {
    e.style.display = "none";
    p.style.display = "none";
}

function clearValue(inputElement) {
    inputElement.value = "";
}

