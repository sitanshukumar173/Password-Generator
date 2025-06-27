// ========== Main Input & Copy ========== //
const passwordScreen = document.getElementById("password-screen");
const copyButton = document.getElementById("copy-button");

// ========== Range Slider ========== //
const rangeInput = document.getElementById("length");
const rangeValue = document.getElementById("length-value");

// ========== Option Checkboxes ========== //
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

// ========== Generate Button ========== //
const generateButton = document.querySelector(".button-password");

// ========== Password Strength ========== //
const strengthText = document.getElementById("strength-text");
const progressBar = document.querySelector(".progress-bar");

// ========== Optional Extra Containers  ========== //
const mainContainer = document.querySelector(".main-container");
const passwordBox = document.querySelector(".password-box");
const copyBox = document.querySelector(".copy-box");
const optionBox = document.querySelector(".option-box");
const allOptions = document.querySelectorAll(".option");
const rangeContainer = document.querySelector(".range-container");
const strengthContainer = document.querySelector(".strength-container");
const progressContainer = document.querySelector(".progress-container");


//--------- Character sets -------
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";


rangeInput.addEventListener("input",()=>{
    rangeValue.textContent=rangeInput.value;
});

generateButton.addEventListener("click",generatePasswordCharactors);


//generate all the possible charactors according checkbox preference
function generatePasswordCharactors(){
  let charPool = "";

  if (uppercaseCheckbox.checked) charPool += uppercaseLetters;
  if (lowercaseCheckbox.checked) charPool += lowercaseLetters;
  if (numbersCheckbox.checked) charPool += numberCharacters;
  if (symbolsCheckbox.checked) charPool += symbolCharacters;
    if(charPool.length===0) {
        alert("PLEASE SELECT AT LEAST ONE OPTION !");
        return;
    }

    generatePasswordActual(charPool);
}


//choose randomly charactor=password length given
function generatePasswordActual(charAll){
    let password="";
    for(let i=0;i<Number(rangeInput.value);i++){
        const index=Math.floor(Math.random()*charAll.length);
        password+=charAll[index];
    }
    
    passwordScreen.value=password;

    updateStrengthMeter(password);
}

//when ever the page relodes it generates password
window.onload =generatePasswordCharactors;

//updating progress bar and weak-strong-medium : strength of passwiord
function updateStrengthMeter(password) {
  const passwordLength = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);
 
   let strengthScore = 0;

     // here the .min will get the minimum value
  // but this will make sure that "at maximum" you would get 40
  strengthScore += Math.min(passwordLength * 2, 40);

  if (hasUppercase) strengthScore += 5;
  if (hasLowercase) strengthScore += 15;
  if (hasNumbers) strengthScore += 20;
  if (hasSymbols) strengthScore += 20;

  // enforce minimum score for every short password
  if (passwordLength < 8) {
    strengthScore = Math.min(strengthScore, 40);
  }

  // ensure the width of the strength bar is a valid percentage
  const safeScore = Math.max(5, Math.min(100, strengthScore));
  //updating strength bar length css
  progressBar.style.width = safeScore + "%";


  //applying css acoordengly to progressbar color and text
  let strengthLabelText = "";
  let barColor = "";

  if (strengthScore <=50) {
    // weak password
    barColor = "#fc8181";
    strengthLabelText = "Weak";
  } else if (strengthScore < 70) {
    // Medium password
    barColor = "#fbd38d"; // Yellow
    strengthLabelText = "Medium";
  } else {
    // Strong password
    barColor = "#68d391"; // Green
    strengthLabelText = "Strong";
  }

  progressBar.style.backgroundColor = barColor;
  strengthText.textContent = strengthLabelText;

}


//makes copying the password
//copy to clipboard
copyButton.addEventListener("click",copyText);

//copy to clipboard
function copyText(){
    const text=passwordScreen.value;

    //prebuit thing of method- to copy to clipboard -this only works with http pages
     navigator.clipboard
            .writeText(text)
            .then(() => showCopySuccess())
            .catch((error) => console.log("Could not copy:", error));
}

function showCopySuccess(){
    
      //  Save the original src path
  const originalSrc = copyButton.src;

  // Replace with your downloaded tick image path
copyButton.src = "./assets/accept.png"; // 🔁 Change path if different

   // After 1.5s, restore original copy icon
  setTimeout(() => {
   copyButton.src = originalSrc;
  }, 1500);
}



