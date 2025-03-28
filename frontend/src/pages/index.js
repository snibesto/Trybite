const form = document.getElementById("form");
const errorMessage = document.getElementById("errorMessage");

const usernameDefaultField = document.getElementById('usernameDefaultField')
const usernameErrorField = document.getElementById('usernameErrorField')
const emailDefaultField = document.getElementById('emailDefaultField')
const emailErrorField = document.getElementById('emailErrorField')
const passwordDefaultField = document.getElementById('passwordDefaultField')
const passwordErrorField = document.getElementById('passwordErrorField')

// VISUAL EFFECTS
// Continue with google button
const continueGoogleBtn = document.getElementById('continueGoogleBtn')
const continueGoogleBtnText = document.getElementById('continueGoogleBtnText')

continueGoogleBtn.addEventListener('mouseenter', () => {
    continueGoogleBtnText.classList.add('text-white')
    continueGoogleBtnText.classList.add('text-slate-950')

    continueGoogleBtn.classList.add('bg-slate-950')
    continueGoogleBtn.classList.remove('bg-white')
    continueGoogleBtn.classList.remove('outline-2')
})

continueGoogleBtn.addEventListener('mouseleave', () => {
    continueGoogleBtnText.classList.add('text-slate-950')
    continueGoogleBtnText.classList.remove('text-white')

    continueGoogleBtn.classList.add('bg-white')
    continueGoogleBtn.classList.remove('bg-slate-950')
    continueGoogleBtn.classList.add('outline-2')
})

// Create account button
const submitBtn = document.getElementById('submitBtn')
const submitBtnText = document.getElementById('submitBtnText')
const submitBtnImg = document.getElementById('submitBtnImg')

submitBtn.addEventListener('mouseenter', () => {
    submitBtnText.classList.add('text-emerald-500')
    submitBtnText.classList.remove('text-white')

    submitBtn.classList.add('bg-white')
    submitBtn.classList.remove('bg-emerald-500')
    submitBtn.classList.add('outline-2')

    submitBtnImg.src = '/frontend/public/photographic/right-arrow-green.svg'
})

submitBtn.addEventListener('mouseleave', () => {
    submitBtnText.classList.add('text-white')
    submitBtnText.classList.add('text-emerald-500')

    submitBtn.classList.add('bg-emerald-500')
    submitBtn.classList.remove('bg-white')
    submitBtn.classList.remove('outline-2')

    submitBtnImg.src = '/frontend/public/photographic/right-arrow-black.svg'
})

function usernameDefault() {
    usernameDefaultField.classList.add("flex");
    usernameDefaultField.classList.remove("hidden");
    usernameErrorField.classList.add("hidden");
    usernameErrorField.classList.remove("flex");
}

function usernameError() {
    usernameDefaultField.classList.remove("flex");
    usernameDefaultField.classList.add("hidden");
    usernameErrorField.classList.remove("hidden");
    usernameErrorField.classList.add("flex");
}

function emailDefault() {
    emailDefaultField.classList.add("flex");
    emailDefaultField.classList.remove("hidden");
    emailErrorField.classList.add("hidden");
    emailErrorField.classList.remove("flex");
}

function emailError() {
    emailDefaultField.classList.add("hidden");
    emailDefaultField.classList.remove("flex");
    emailErrorField.classList.add("flex");
    emailErrorField.classList.remove("hidden");
}

function passwordDefault() {
    passwordDefaultField.classList.add("flex");
    passwordDefaultField.classList.remove("hidden");
    passwordErrorField.classList.add("hidden");
    passwordErrorField.classList.remove("flex");
}

function passwordError() {
    passwordDefaultField.classList.add("hidden");
    passwordDefaultField.classList.remove("flex");
    passwordErrorField.classList.add("flex");
    passwordErrorField.classList.remove("hidden");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    usernameDefault();
    emailDefault();
    passwordDefault();

    // Form validation
    const usernameValue = document.getElementById("usernameInput").value;
    const emailValue = document.getElementById("emailInput").value;
    const passwordValue = document.getElementById("passwordInput").value;

    validInputs = {
        usernameValid: true,
        emailValid: true,
        passwordValid: true
    }

    function usernameValidator() {

    }

    if (!usernameValue || !emailValue || !passwordValue) {
        document.getElementById("submitBtn").classList.remove("shake");
        void document.getElementById("submitBtn").offsetWidth;

        document.getElementById("submitBtn").classList.add("shake");
    }

    axios
        .post("/login", {
            email: emailValue,
            password: passwordValue,
        })
        .then((response) => {
            console.log(response);

            errorMessage.textContent = "test";
            errorMessage.style.color = "green";
        })
        .catch((err) => {
            errorMessage.style.color = "red";
            console.log("t2");
        });
});