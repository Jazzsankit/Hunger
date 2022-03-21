
let loginPassword = document.querySelector("#login-password");
let loginEmail = document.querySelector("#login-email");
let loginBtn = document.querySelector("#login-btn");
let signUpBtn = document.querySelector("#signup-btn");
let username = document.querySelector('#signupUsername');
let signupEmail = document.querySelector('#signup-email');
let signupPassword = document.querySelector('#signup-password');
let confirmPassword = document.querySelector('#confirm-password');
const loginForm = document.querySelector("#login");
let resetPassword = document.querySelector('#resetPassword');

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    })

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    // loginBtn.addEventListener("click",e =>{
    //   e.preventDefault();
    //   //perform login
    //   setFormMessage(loginForm,"error","Invalid username/password combination");
    // });

    // document.querySelectorAll(".form__input").array.forEach(inputElement => {
    //     inputElement.addEventListener("blur", e => {
    //       if(e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10){
    //           setInputError(inputElement,"Username must be at least 10 charaters in length");
    //       }
    //     });
    //     inputElement.addEventListener("input", e => {
    //         clearInputError(inputElement);
    //     });
    // });
});


loginBtn.addEventListener("click", async function (e) {
    try {
        e.preventDefault(); // prevent page refresh
        // console.log(loginEmail,loginPassword)
        if (loginEmail.value && loginPassword.value) {
            let obj = await axios.post("http://localhost:3000/api/user/login", { email: loginEmail.value, password: loginPassword.value });
            console.log(obj);
            if (obj.data.data) {
                window.location.href = '/';
            } else {
                setFormMessage(loginForm, "error", obj.data.message);
            }
        } else {
        }
    }
    catch (error) {
        console.log(error);
    }
})

signUpBtn.addEventListener("click", async function (e) {
    try {
        e.preventDefault(); // prevent page refresh
        // alert("click")
        if (username.value && signupEmail.value && signupPassword.value && confirmPassword.value) {
            let signUpObj = {
                "name": username.value,
                "email": signupEmail.value,
                "password": signupPassword.value,
                "confirmPassword": confirmPassword.value,
                "role": "user"
            }
            let obj = await axios.post("http://localhost:3000/api/user/signup", signUpObj);
            console.log(obj);
        }
    }
    catch (error) {
        console.log(error);
    }
})

resetPassword.addEventListener("click", async function(e){
    console.log('abc');
    try {
        e.preventDefault();
        if(loginEmail.value){
            let obj = await axios.post("http://localhost:3000/api/user/forgetpassword" , {email:loginEmail.value});
            console.log(obj);
        }
    } catch (error) {
        console.log(error);
    }
})