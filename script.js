const passwordInput = document.getElementById("passwordInput");
const strengthFill = document.querySelector(".strength-fill");
const strengthText = document.getElementById("strengthText");
const suggestions = document.getElementById("suggestions");
const crackTime = document.getElementById("crack-time");
const toggleButton = document.getElementById("toggleButton");
const lengthCheck = document.getElementById("lengthCheck");
const uppercaseCheck = document.getElementById("uppercaseCheck");
const lowercaseCheck = document.getElementById("lowercaseCheck");
const numberCheck = document.getElementById("numberCheck");
const specialCheck = document.getElementById("specialCheck");

// Show / Hide Password
toggleButton.addEventListener("click", () => {

    if(passwordInput.type === "password"){
        passwordInput.type = "text";
        toggleButton.textContent = "Hide";
    }else{
        passwordInput.type = "password";
        toggleButton.textContent = "Show";
    }

});

// Analyze Password
passwordInput.addEventListener("input", analyzePassword);

function analyzePassword(){

    const password = passwordInput.value;

    let score = 0;
    let tips = [];

    // Length
    if(password.length >= 8){
        score++;
    }else{
        tips.push("Use at least 8 characters.");
    }

    // Uppercase
    if(/[A-Z]/.test(password)){
        score++;
    }else{
        tips.push("Add an uppercase letter.");
    }

    // Lowercase
    if(/[a-z]/.test(password)){
        score++;
    }else{
        tips.push("Add a lowercase letter.");
    }

    // Numbers
    if(/[0-9]/.test(password)){
        score++;
    }else{
        tips.push("Include at least one number.");
    }

    // Special Characters
    if(/[!@#$%^&*(),.?\":{}|<>]/.test(password)){
        score++;
    }else{
        tips.push("Include a special character.");
    }
    lengthCheck.textContent =
password.length >= 8 ? "✅ At least 8 characters" : "❌ At least 8 characters";

uppercaseCheck.textContent =
/[A-Z]/.test(password) ? "✅ Uppercase letter" : "❌ Uppercase letter";

lowercaseCheck.textContent =
/[a-z]/.test(password) ? "✅ Lowercase letter" : "❌ Lowercase letter";

numberCheck.textContent =
/[0-9]/.test(password) ? "✅ Number" : "❌ Number";

specialCheck.textContent =
/[!@#$%^&*(),.?\":{}|<>]/.test(password)
? "✅ Special character"
: "❌ Special character";

    updateUI(score, tips, password.length);

}

function updateUI(score, tips, length){

    let percent = (score / 5) * 100;

    strengthFill.style.width = percent + "%";

    if(score <= 2){

        strengthFill.style.background = "#ee0b1e";
        strengthText.textContent = "Strength: Weak";

    }
    else if(score <= 4){

        strengthFill.style.background = "#facc15";
        strengthText.textContent = "Strength: Medium";

    }
    else{

        strengthFill.style.background = "#22c55e";
        strengthText.textContent = "Strength: Strong";

    }

    suggestions.innerHTML = "";

    if(tips.length === 0){

        suggestions.innerHTML =
        "<li>Excellent! Your password follows good security practices.</li>";

    }else{

        tips.forEach(tip =>{

            const li = document.createElement("li");
            li.textContent = tip;
            suggestions.appendChild(li);

        });

    }

    // Crack Time Estimate

    if(length === 0){

        crackTime.textContent = " ⌛ —";

    }
    else if(length < 6){

        crackTime.textContent = " ⌛ A few seconds";

    }
    else if(length < 8){

        crackTime.textContent = " ⌛ A few minutes";

    }
    else if(length < 12){

        crackTime.textContent = " ⌛ Several hours";

    }
    else{

        crackTime.textContent = " ⌛ Years (depending on complexity)";

    }

}