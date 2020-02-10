/*
=====================================================================
*   RMG v1.0 Password Generator Javascript
*   02-05-2020
=====================================================================
*/

/*
===================================================================== 
*   VARIABLES
=====================================================================  
*/
// Referencing my button to generate the Crypto Password 
var cryptoPasswordBtn = document.querySelector( "#generateCrypto" );

//Object "cryptoPassword" with all password's criteria
var cryptoPassword = {
  validCriteria:        false,
  hasVowels:            false,
  hasConsonants:        false,
  hasLowerCase:         false,
  hasUpperCase:         false,
  hasNumbers:           false,
  hasSpecialCharacters: false,
  maxLength:                0,

  "alphabet": {
    "vowels": {
      lowerVowelsArray: [
        "a","e", "i", "o", "u"
      ],

      upperVowelsArray: [
        "A", "E", "I", "O", "U"
      ]
    },

    "consonants": {
      lowerConsonantsArray: [
        "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"
      ],

      upperConsonantsArray: [
        "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"
      ]
    }
  },

  "numbersArray": [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
  ],

  "specialCharactersArray": [
    "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "}", "[", "]", "|", "<", ">", "?", "/"
  ],
}


/*
===================================================================== 
*   FUNCTIONS
=====================================================================  
*/
// This function clear all the criteria variables
function clearCriteria() {
  cryptoPassword.validCriteria        = false;
  cryptoPassword.hasVowels            = false;
  cryptoPassword.hasConsonants        = false;
  cryptoPassword.hasLowerCase         = false;
  cryptoPassword.hasUpperCase         = false;
  cryptoPassword.hasNumbers           = false;
  cryptoPassword.hasSpecialCharacters = false;
  cryptoPassword.maxLength            = 0;
}

// This function set all the criteria features that the user wants to
function setPasswordCriteria() {
  var passwordLength = 0;
  var cryptoSpeaking = false;

  clearCriteria();
  
  // ALERT - Crypto Intro 
  alert ( "Hi, there!! \nI'm Crypto and I will be helping you generate a new password today. \nPlease, follow the steps and let's get started!" );
  
  // ALERT - Ask if user wants Password WITH Vowels
  if ( confirm ( "Would you like your password to have vowels? \n( Example: a, e, i, o, u )" ) ) {
    cryptoPassword.hasVowels = true;
  }

  // ALERT - Ask if user wants Password WITH Consonants
  if ( confirm ( "Would you like your password to have consonants? \n( Example: b, c, d, f, ... )" ) ) {
    cryptoPassword.hasConsonants = true;
  }

  // ALERT - Ask if user wants Password WITH Lower Case and Capital Letters, only if their password has Vowels and/or Consonants
  if ( ( cryptoPassword.hasVowels ) || ( cryptoPassword.hasConsonants ) ) {
    var lowerExample = ( ( cryptoPassword.hasVowels ) && ( cryptoPassword.hasConsonants ) ) ? "a, b, c, d, e" : ( cryptoPassword.hasVowels ? "a, e, i" : "b, c, d" );
    var upperExample = ( ( cryptoPassword.hasVowels ) && ( cryptoPassword.hasConsonants ) ) ? "A, B, C, D, E" : ( cryptoPassword.hasVowels ? "A, E, I" : "B, C, D" );
 
    do {
      //Lower Case
      if ( confirm ( "Would you like your password to have Lower Case Letters? \n( Example: " + lowerExample + ", ... )" ) ) {
        cryptoPassword.hasLowerCase = true;
      }

      //Upper Case
      if ( confirm ( "Would you like your password to have Capital Letters? \n( Example: " + upperExample + ", ... )" ) ) {
        cryptoPassword.hasUpperCase = true;
      }

      // Verify if user chose an option
      if ( ( !cryptoPassword.hasLowerCase ) && ( !cryptoPassword.hasUpperCase ) )
      {
        alert ( "Hey, Crypto here!! \nIt seems you did not choose an option in this field. Let's try it again, okay?" );
        cryptoSpeaking = true;
      }
    } while ( ( !cryptoPassword.hasLowerCase ) && ( !cryptoPassword.hasUpperCase ) )
  }

  // ALERT - Ask if user wants Password WITH Numbers
  if ( confirm ( "Would you like your password to have Numbers? \n( Example: 1, 2, 3, 4, ... )" ) ) {
    cryptoPassword.hasNumbers = true;
  }

  // ALERT - Ask if user wants Password WITH Special Characters
  if ( confirm ( "Would you like your password to have Special Characters? \n( Example: @, #, $, %, ... )" ) ) {
    cryptoPassword.hasSpecialCharacters = true;
  }

  // ALERT - Ask the length of user Password (at least 8 characters and no more than 128 characters)
  do {
    passwordLength = parseInt ( prompt ( "Type the length of your password bellow. ( Your password should have at least 8 characters and no more than 128 characters )? \n[*] MUST be a number." ) );
    
    if ( Number.isInteger ( passwordLength ) )
      cryptoPassword.maxLength = ( passwordLength > 7 ) && ( passwordLength < 129 ) ? passwordLength : 0;

    // Verify if user type a valid number  
    if ( cryptoPassword.maxLength === 0 )
      alert ( "I'm sorry, but it looks like we have a little problem around here. This field only accepts numbers from 8 to 128. \nDon't worry, I'm here for you. Let's try it again!" );

  } while ( cryptoPassword.maxLength === 0 );


  // Verify if none of the options were selected
  if ( 
        ( !cryptoPassword.hasVowels            ) &&    
        ( !cryptoPassword.hasConsonants        ) &&
        ( !cryptoPassword.hasLowerCase         ) &&
        ( !cryptoPassword.hasUpperCase         ) &&
        ( !cryptoPassword.hasNumbers           ) &&
        ( !cryptoPassword.hasSpecialCharacters )
      ) 
  {
    var cryptoMsg = !cryptoSpeaking ? "Hey, Crypto here!! \n" : "Hey, it's Crypto again!! \n";

    // Ask if user wants to continue (start the fucntion all over) or not (terminate function)
    if ( confirm ( cryptoMsg + "I have noticed that you did not choose any criteria to your new password. " +
                               "And for that reason, I was not able to move foward with it. \nWould you like to start again?" ) )
      setPasswordCriteria();
    else
      alert ( "Okay. You can definitely do this another time. \nHave a wonderful day! \nSee you soon!! =]" );
  }
  else
    cryptoPassword.validCriteria = true; // This variable indicates that it is possible to generate a Password
}

function getCryptoPasswordArray() {
  // Cleaning variables before using
  var criteriaArray = "";
  var userPassword  = "";

  /* ============================ VOWELS =========================== */ 
  // LowerCase
  if ( ( cryptoPassword.hasVowels ) && ( cryptoPassword.hasLowerCase ) )
    criteriaArray += cryptoPassword.alphabet.vowels.lowerVowelsArray.join('');

  // UpperCase
  if ( ( cryptoPassword.hasVowels ) && ( cryptoPassword.hasUpperCase ) )
    criteriaArray += cryptoPassword.alphabet.vowels.upperVowelsArray.join('');

  /* =========================== CONSONANTS ========================= */ 
  // LowerCase
  if ( ( cryptoPassword.hasConsonants ) && ( cryptoPassword.hasLowerCase ) ) 
    criteriaArray += cryptoPassword.alphabet.consonants.lowerConsonantsArray.join('');

  // UpperCase
  if ( ( cryptoPassword.hasConsonants ) && ( cryptoPassword.hasUpperCase ) ) 
    criteriaArray += cryptoPassword.alphabet.consonants.upperConsonantsArray.join('');

  /* ============================ NUMBERS ========================== */ 
  if ( cryptoPassword.hasNumbers ) 
    criteriaArray += cryptoPassword.numbersArray.join('');
  
  /* ====================== SPECIAL CHARACTERS ===================== */
  if ( cryptoPassword.hasSpecialCharacters )
    criteriaArray += cryptoPassword.specialCharactersArray.join('');


  // Takes the Maximum Length chosen by user to generate the password
  for ( let index = 0; index < cryptoPassword.maxLength; index++ ) {
    userPassword += criteriaArray [ Math.floor( Math.random() * criteriaArray.length ) ];
  }


  return userPassword;
}

function generateCryptoPassword() {
  // Initializes by setting all the variables in the object "cryptoPassword"
  setPasswordCriteria();

  // Veritfy if it is possible to generate a Password and if user didn't give up of doing so
  if ( cryptoPassword.validCriteria ) {
    let userPasswordCriteria = getCryptoPasswordArray();
    let cryptoTextArea       = document.querySelector ( "#cryptoPasswordText" ); 

    cryptoTextArea.value     = userPasswordCriteria;
  }
}


/*
===================================================================== 
*   MAIN PROCESS
=====================================================================  
*/
// Add event listener to generate Crypto Password
cryptoPasswordBtn.addEventListener( "click", () => generateCryptoPassword() ); // or (another way to code): cryptoPasswordBtn.addEventListener( "click", generateCryptoPassword );