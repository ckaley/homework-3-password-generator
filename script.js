// Assignment Code
var generateBtn = document.querySelector("#generate");

// Variables to hold password selection critieria
var lowerCase = false; //initialize lower case selection to false
var upperCase = false; //initialize upper case selection to false
var numeric = false; //initialize tnumeric selection to false
var specialChars = false;
var passwordSelectionArray = []; //initialize array for final password selection characters.

// Populate Arrays
// Array of special characters to be included in password
var specialCharacters = [
  "@",
  "%",
  "+",
  "\\",
  "/",
  "'",
  "!",
  "#",
  "$",
  "^",
  "?",
  ":",
  ",",
  ")",
  "(",
  "}",
  "{",
  "]",
  "[",
  "~",
  "-",
  "_",
  ".",
];
// Array of numeric characters to be included in password
var numericCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function getPasswordLength() {
  var passwordPrompt = "Choose a password length between 8 and 128 characters";
  var validPassword = null;

  // Use a do-while loop since we want to go throguh the prompt at least once
  do {
    //prompt for password length
    var passwordLengthInput = prompt(passwordPrompt);

    //Convert string input to integer
    passwordLength = parseInt(passwordLengthInput);

    // Check for valid input of password length
    if (
      Number.isInteger(passwordLength) &&
      passwordLength >= 8 &&
      passwordLength <= 128
    ) {
      validPassword = true;
    } else {
      passwordPrompt =
        "Invalid password entry.  Please choose a password length between 8 and 128 characters";
      validPassword = false;
    }
  } while (!validPassword);
  return passwordLength;
}

function getPasswordSelections() {
  var charTypeSelected = 0; // initialize selections to 0
  var passSelect = [];

  do {
    lowerCase = confirm(
      "Would you like to utilize lowercase characters in your password?  OK = Yes, Cancel = No"
    );
    if (lowerCase) {
      charTypeSelected++;
      passSelect[0] = true;
    } else {
      passSelect[0] = false;
    }

    upperCase = confirm(
      "Would you like to utilize uppercase characters in your password?  OK = Yes, Cancel = No"
    );

    if (upperCase) {
      charTypeSelected++;
      passSelect[1] = true;
    } else {
      passSelect[1] = false;
    }

    numeric = confirm(
      "Would you like to utilize numbers in your password?  OK = Yes, Cancel = No"
    );
    if (numeric) {
      charTypeSelected++;
      passSelect[2] = true;
    } else {
      passSelect[2] = false;
    }

    specialChars = confirm(
      "Would you like to utilize special characters in your password?  OK = Yes, Cancel = No"
    );
    if (specialChars) {
      charTypeSelected++;
      passSelect[3] = true;
    } else {
      passSelect[3] = false;
    }

    if ((charTypeSelected = 0)) {
      alert(
        "You did not select any character types to include in your password.  You will need to select at least one character type to include in your passord."
      );
      charTypeSelected = 0; // Reset to 0 for the next loop through the character type prompts.
    }
  } while ((charTypeSelected = 0));
  return passSelect; // Return selection array
}

function populatePasswordArray(SelectArray) {
  // Based upon response, populate the password selected array
  // Clear the passwrodSelectionArray is there was anything from a previous run
  passwordSelectionArray = [];

  if (SelectArray[0]) {
    passwordSelectionArray = passwordSelectionArray.concat(
      lowerCasedCharacters
    );
  }
  if (SelectArray[1]) {
    passwordSelectionArray = passwordSelectionArray.concat(
      upperCasedCharacters
    );
  }
  if (SelectArray[2]) {
    passwordSelectionArray = passwordSelectionArray.concat(numericCharacters);
  }
  if (SelectArray[3]) {
    passwordSelectionArray = passwordSelectionArray.concat(specialCharacters);
  }
}

//function to generate random number from 0 to upper limit
function randomNumberGenerate(upper) {
  return Math.floor(Math.random() * upper);
}

function generatePassword() {
  var passwordLength = getPasswordLength();
  var passSelections = getPasswordSelections();
  populatePasswordArray(passSelections);
  var password = "";

  for (var i = 0; i < passwordLength; i++) {
    var random = randomNumberGenerate(passwordSelectionArray.length);
    password = password.concat(passwordSelectionArray[random]);
  }
  console.log(password);
  return password;
}

// Write password to the #password input
function writePassword() {
  var password = ""; // Initialize passord to not have any characters
  password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
