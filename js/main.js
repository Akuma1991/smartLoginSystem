var userName = document.getElementById('userName');
var userEmail = document.getElementById('userEmail');
var userPassword = document.getElementById('userPassword');

var userEmail2 = document.getElementById('userEmail2');
var userPassword2 = document.getElementById('userPassword2');

var userWelcome = document.getElementById('userWelcome');
var alertAllInput = document.querySelector('span');
var alertLoginIn = document.querySelector('span');

var singUp = document.getElementById('singUp');
var singIn = document.getElementById('singIn');

// var welcomeName = '';

if (localStorage.getItem('usersAccounts') == null) {
    var userAccounts = [];
}
else {

    var userAccounts = JSON.parse(localStorage.getItem('usersAccounts'));
}








if (singUp) {



    singUp.addEventListener('click', function () {

        if (userName.value == '' || userEmail.value == '' || userPassword.value == '') {
            alertAllInput.innerHTML = `All input fields are required`;
            alertAllInput.setAttribute('class', 'text-danger');

        }
        else if (userName.value != '' && userEmail.value != '' && userPassword.value != '') {
            for (var i = 0; i < userAccounts.length; i++) {
                if (userAccounts[i].email == userEmail.value) {
                    alertAllInput.innerHTML = `This email already exists`;
                    alertAllInput.setAttribute('class', 'text-danger');
                    break;
                }

            }
            if (i == userAccounts.length && regexEmail() == true) {
                var object = {
                    name: userName.value,
                    email: userEmail.value,
                    password: userPassword.value
                };
                userAccounts.push(object);
                console.log(userAccounts);
                localStorage.setItem('usersAccounts', JSON.stringify(userAccounts));
                alertAllInput.innerHTML = `Success`;
                alertAllInput.setAttribute('class', 'text-success');

                clearInputs();

            }
            else {
                alertAllInput.innerHTML = `email should be like : xxxx@xxxx`;
                alertAllInput.setAttribute('class', 'text-warning');
            }
        }

    });
}

if (singIn) {
    if (localStorage.getItem('userWelcome') != null) {
        userEmail2.value = JSON.parse(localStorage.getItem('userWelcome')).email;
        userPassword2.value = JSON.parse(localStorage.getItem('userWelcome')).password;

    }
    singIn.addEventListener('click', function () {
        var temp = 0;

        for (var i = 0; i < userAccounts.length; i++) {
            if (userAccounts[i].email == userEmail2.value && userAccounts[i].password == userPassword2.value) {
                // welcomeName = userAccounts[i].name;
                // localStorage.setItem('userWelcome', welcomeName);
                var object = {
                    name: userAccounts[i].name,
                    email: userAccounts[i].email,
                    password: userAccounts[i].password
                };
                localStorage.setItem('userWelcome', JSON.stringify(object));
                singIn.setAttribute('href', 'home.html')
                temp = 1;
                break;
            }

        }
        if (temp == 0) {
            alertLoginIn.innerHTML = 'invalid email or password'
            singIn.removeAttribute('href');
        }

    });
}

function clearInputs() {
    userName.value = '';
    userEmail.value = '';
    userPassword.value = '';
    // alertAllInput.innerHTML = '';
}

if (userWelcome) {
    userWelcome.innerHTML = `welcome ${JSON.parse(localStorage.getItem('userWelcome')).name}`;
}


function regexEmail() {
    var regexEmail = /^[A-Za-z0-9]{1,100}@[A-Za-z0-9]/;
    console.log(regexEmail.test(userEmail.value));
    console.log(userEmail.value);
    if (regexEmail.test(userEmail.value)) {
        return true;
    } else {
        return false;
    }

}
