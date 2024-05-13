
//get the p elements to display the error msg
var f = document.getElementById("fName");
var l = document.getElementById("lName");
var e = document.getElementById("Email");
var p = document.getElementById("Password");
var c = document.getElementById("confirm");

//Regular Expressions
var validNameRegex = /^[A-Za-z]+$/;
var validEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*_?&])[A-Za-z\d@$!%*_?&]{8,}$/;

//Form Validation
function validateForm() {

    //get user input values
    var fName = document.forms["registrationForm"]["fName"].value;
    var lName = document.forms["registrationForm"]["lName"].value;
    var Email = document.forms["registrationForm"]["Email"].value;
    var Password = document.forms["registrationForm"]["Password"].value;
    var confirm = document.forms["registrationForm"]["confirm"].value;

    //first name is empty
    if (fName === '') {
        resetErrorMsgs();
        f.textContent = "First name is required."
        f.style.display = "block";
        f.style.color = "red";
        return false;
    }

    //first name contains anything but characters
    else if (!validNameRegex.test(fName)) {
        resetErrorMsgs();
        f.textContent = "First name must contain characters only.";
        f.style.display = "block";
        f.style.color = "red";
        clearValue(document.forms["registrationForm"]["fName"]);
        return false;
    }

    //Last name is empty
    else if (lName === '') {
        resetErrorMsgs();
        l.textContent = "Last name is required."
        l.style.display = "block";
        l.style.color = "red";
        return false;
    }

    //Last name contains anything but characters
    else if (!validNameRegex.test(lName)) {
        resetErrorMsgs();
        l.textContent = "Last name must contain characters only.";
        l.style.display = "block";
        l.style.color = "red";
        clearValue(document.forms["registrationForm"]["lName"]);
        return false;
    }

    //Email is empty
    else if (Email === '') {
        resetErrorMsgs();
        e.textContent = "Email is required."
        e.style.display = "block";
        e.style.color = "red";
        return false;
    }

    //Email address is invalid
    else if (!validEmailRegex.test(Email)) {
        resetErrorMsgs();
        e.textContent = "Please enter a valid Email address.";
        e.style.display = "block";
        e.style.color = "red";
        clearValue(document.forms["registrationForm"]["Email"]);
        return false;
    }

    //Check if user with the same email already exists
    else if (isUserRegistered(Email)) {
        e.textContent = "This email is already registered. Please login instead.";
        e.style.display = "block";
        e.style.color = "red";
        var loginbtn = document.getElementById("btn2");
        loginbtn.style.display = "inline";
        loginbtn.addEventListener("click", function () {
            redirectToNewPage();
        })
        return false;
    }

    //Password is empty
    else if (Password === '') {
        resetErrorMsgs();
        p.textContent = "Please enter a password."
        p.style.display = "block";
        p.style.color = "red";
        return false;
    }

    //Password is invalid
    else if (!validPasswordRegex.test(Password)) {
        resetErrorMsgs();
        p.textContent = "Password must contain at least 8 characters including at least one lowercase letter, at least one uppercase letter, at least one special character and at least one digit.";
        p.style.display = "block";
        p.style.color = "red";
        clearValue(document.forms["registrationForm"]["Password"]);
        return false;
    }

    //Password confirmation is empty
    else if (confirm === '') {
        resetErrorMsgs();
        c.textContent = "Please re-enter your password."
        c.style.display = "block";
        c.style.color = "red";
        return false;
    }

    //The two passwords don't match
    else if (confirm !== Password) {
        resetErrorMsgs();
        c.textContent = "The two passwords aren't matched";
        c.style.display = "block";
        c.style.color = "red";
        clearValue(document.forms["registrationForm"]["confirm"]);
        return false;
    }

    //Save the user's input to local storage
    else {
        var userData = {
            firstName: fName,
            lastName: lName,
            email: Email,
            password: Password,
        };

        //Convert the user data to a JSON string
        var userDataJSON = JSON.stringify(userData);

        //Store the JSON string in local storage
        localStorage.setItem('userData', userDataJSON);

        //go to login page
        redirectToNewPage();
    }

    var loginBtn = document.getElementById("btn2");
    loginBtn.addEventListener('click', function(){
        redirectToNewPage();
    })
}

//Reset error messages
function resetErrorMsgs() {
    f.style.display = "none";
    l.style.display = "none";
    e.style.display = "none";
    p.style.display = "none";
    c.style.display = "none";
}

//Check if user with the same email already exists
function isUserRegistered(email) {
    var storedUserDataJSON = localStorage.getItem('userData');

    if (storedUserDataJSON) {
        var storedUserData = JSON.parse(storedUserDataJSON);
        return storedUserData.email === email;
    }

    return false;
}


//Redirect to login page
function redirectToNewPage() {

    //Specify the URL of the new page
    var newPageURL = 'login.html';

    //Redirect to the new page
    window.location.replace(newPageURL);

    //Modify the browser's history to replace the current state
    history.replaceState(null, null, newPageURL);
}

function clearValue(inputElement) {
    inputElement.value = "";
}