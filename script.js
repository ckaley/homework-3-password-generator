// Assignment Code
var generateBtn = document.querySelector("#generate");

// Define a Global arracy that will hold the finalized list of characters to generate the password
var passwordSelectionArray = []; //initialize array for final password selection characters.

// Populate Arrays standard arrays
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

//function to prompt, validate and return the password length desired by the user
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
  var passSelect = []; // Utilize an array to pass the selection criteria for the password

  do {
    passSelect[0] = confirm(
      "Would you like to utilize lowercase characters in your password?  OK = Yes, Cancel = No"
    );
    if (passSelect[0]) {
      charTypeSelected++;
      passSelect[0] = true;
    } else {
      passSelect[0] = false;
    }

    passSelect[1] = confirm(
      "Would you like to utilize uppercase characters in your password?  OK = Yes, Cancel = No"
    );
    if (passSelect[1]) {
      charTypeSelected++;
      passSelect[1] = true;
    } else {
      passSelect[1] = false;
    }

    passSelect[2] = confirm(
      "Would you like to utilize numbers in your password?  OK = Yes, Cancel = No"
    );
    if (passSelect[2]) {
      charTypeSelected++;
      passSelect[2] = true;
    } else {
      passSelect[2] = false;
    }

    passSelect[3] = confirm(
      "Would you like to utilize special characters in your password?  OK = Yes, Cancel = No"
    );
    if (passSelect[3]) {
      charTypeSelected++;
      passSelect[3] = true;
    } else {
      passSelect[3] = false;
    }

    if (charTypeSelected == 0) {
      alert(
        "You did not select any character types to include in your password.  You will need to select at least one character type to include in your passord."
      );
      charTypeSelected = 0; // Reset to 0 for the next loop through the character type prompts.
    }
  } while (charTypeSelected < 1);

  return passSelect; // Return selection array
}

function populatePasswordArray(SelectArray) {
  // Based upon responses in the passed array, populate the password selected array
  passwordSelectionArray = []; // Clear the passwrodSelectionArray if there was anything from a previous run

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

function generatePassword() {
  var password = ""; // clear password
  var passwordLength = getPasswordLength(); // Get password length from the user
  var passSelections = getPasswordSelections(); // Get password criteria from the user
  populatePasswordArray(passSelections); // Populate the final array for generating the password

  // Generate password by adding a random charater to the password using a loop that is based upon the desired password length
  for (var i = 0; i < passwordLength; i++) {
    password = password.concat(
      passwordSelectionArray[
        Math.floor(Math.random() * passwordSelectionArray.length)
      ]
    );
  }
  return password;
}

// Write password to the #password input
function writePassword() {
  var password = ""; // Initialize passord to not have any characters
  var passwordText = document.querySelector("#password"); // set variable to the element display field

  password = generatePassword(); // Generate the password

  passwordText.value = password; // Display password to the screen
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
