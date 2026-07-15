const passwordInput = document.getElementById("passwordInput");
const toggleButton = document.getElementById("toggleButton");
const strengthFill = document.querySelector(".strength-fill");
const strengthText = document.getElementById("strengthText");
const crackTime = document.getElementById("crack-time");
const suggestions = document.getElementById("suggestions");
const lengthCheck = document.getElementById("lengthCheck");
const uppercaseCheck = document.getElementById("uppercaseCheck");
const lowercaseCheck = document.getElementById("lowercaseCheck");
const numberCheck = document.getElementById("numberCheck");
const specialCheck = document.getElementById("specialCheck");


const COLORS = {
    weak: "#ef4444",
    medium: "#facc15",
    strong: "#22c55e",
    empty: "#334155"
};

toggleButton.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        toggleButton.textContent = "🙈 Hide";

    } else {

        passwordInput.type = "password";
        toggleButton.textContent = "👁 Show";

    }

});


passwordInput.addEventListener("input", analyzePassword);

function analyzePassword() {

    const password = passwordInput.value;

    let score = 0;
    let tips = [];
    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length === 0) {

        strengthFill.style.width = "0%";
        strengthFill.style.background = COLORS.empty;

        strengthText.textContent = "Strength: None";

        crackTime.textContent = "⌛ —";

        suggestions.innerHTML =
            "<li>Start typing a password...</li>";

        lengthCheck.textContent = "❌ At least 8 characters";
        uppercaseCheck.textContent = "❌ Uppercase letter";
        lowercaseCheck.textContent = "❌ Lowercase letter";
        numberCheck.textContent = "❌ Number";
        specialCheck.textContent = "❌ Special character";

        return;
    }

    if (hasLength) {
        score++;
    } else {
        tips.push("Use at least 8 characters.");
    }

    if (hasUpper) {
        score++;
    } else {
        tips.push("Add an uppercase letter.");
    }

    if (hasLower) {
        score++;
    } else {
        tips.push("Add a lowercase letter.");
    }

    if (hasNumber) {
        score++;
    } else {
        tips.push("Include at least one number.");
    }

    if (hasSpecial) {
        score++;
    } else {
        tips.push("Include a special character.");
    }


    lengthCheck.textContent =
        hasLength ? "✅ At least 8 characters" : "❌ At least 8 characters";

    uppercaseCheck.textContent =
        hasUpper ? "✅ Uppercase letter" : "❌ Uppercase letter";

    lowercaseCheck.textContent =
        hasLower ? "✅ Lowercase letter" : "❌ Lowercase letter";

    numberCheck.textContent =
        hasNumber ? "✅ Number" : "❌ Number";

    specialCheck.textContent =
        hasSpecial ? "✅ Special character" : "❌ Special character";


   

    updateUI(score, tips, password.length);


function updateUI(score, tips, length) {

    const percent = (score / 5) * 100;

    strengthFill.style.width = percent + "%";


    

    if (score <= 2) {

        strengthFill.style.background = COLORS.weak;
        strengthText.textContent = "🔴 Strength: Weak";

    }

    else if (score <= 4) {

        strengthFill.style.background = COLORS.medium;
        strengthText.textContent = "🟡 Strength: Medium";

    }

    else {

        strengthFill.style.background = COLORS.strong;
        strengthText.textContent = "🟢 Strength: Strong";

    }



    suggestions.innerHTML = "";

    if (tips.length === 0) {

        suggestions.innerHTML =
            "<li>🎉 Excellent! Your password follows good security practices.</li>";

    }

    else {

        tips.forEach((tip) => {

            const li = document.createElement("li");
            li.textContent = tip;

            suggestions.appendChild(li);

        });

    }


    if (length < 6) {

        crackTime.textContent = "⌛ A few seconds";

    }

    else if (length < 8) {

        crackTime.textContent = "⌛ A few minutes";

    }

    else if (length < 12) {

        crackTime.textContent = "⌛ Several hours";

    }

    else if (score === 5) {

        crackTime.textContent = "⌛ Several years";

    }

    else {

        crackTime.textContent = "⌛ Days to months";

    }
}

}