/*
===================================================================== 
*   VARIABLES
=====================================================================  
*/
var userPasswordCriteria; //For now!!

  //Object "cryptoPassword" with all password criteria
  var cryptoPassword = {
    validCriteria: false,
    hasVowels: false,
    hasConsonants: false,
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumbers: false,
    hasSpecialCharacters: false,
    maxLength: 0,

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
function setPasswordCriteria() {
  var passwordLength;
  var cryptoSpeaking = false;
  
  // ALERT - Crypto Intro 
  alert ( "Hi, there!! \nI am Crypto and I will be helping you generate a new password today. \nPlease, follow the steps and let's get cracking!" );
  
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
    {
      alert ( "I am sorry, but it looks like we have a little problem around here. This field only accepts numbers from 8 to 128. \nDon't worry, I am here for you. Let's try it again!" );
    }

  } while ( cryptoPassword.maxLength === 0 );

  console.log ( "Has Vowels = "             + cryptoPassword.hasVowels            );
  console.log ( "Has Consonants = "         + cryptoPassword.hasConsonants        );
  console.log ( "Has Lower Case Letters = " + cryptoPassword.hasLowerCase         );
  console.log ( "Has Upper Case Letters = " + cryptoPassword.hasUpperCase         );
  console.log ( "Has Numbers = "            + cryptoPassword.hasNumbers           );
  console.log ( "Has Special Characters = " + cryptoPassword.hasSpecialCharacters );
  console.log ( "Password Length = "        + cryptoPassword.maxLength            );

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
    {
      alert ( "Okay. You can definitely do this another time. \nHave a wonderful day. \nSee you soon!! =]" );
      return;
    }
  }
  else
    cryptoPassword.validCriteria = true; // This variable indicates that it is possible to generate a Password
}

function getCriteriaArray() {
  var criteriaArray = [];

  /*
  ===================================================================== 
  *   VOWELS
  =====================================================================  
  */
  //LowerCase
  if ( ( cryptoPassword.hasVowels ) && ( cryptoPassword.hasLowerCase ) )
    criteriaArray.push( cryptoPassword.alphabet.vowels.lowerVowelsArray );

    criteriaArray.sort(function(a, b) { return 0.5 - Math.random()});
    console.log ( "SHUFFLED Criteria Array Vowels L = " + criteriaArray );

  //UpperCase
  if ( ( cryptoPassword.hasVowels ) && ( cryptoPassword.hasUpperCase ) )
    criteriaArray.push( cryptoPassword.alphabet.vowels.upperVowelsArray );

  criteriaArray.sort(function(a, b) { return 0.5 - Math.random()});
  console.log ( "SHUFFLED Criteria Array Vowels U = " + criteriaArray );

  /*
  ===================================================================== 
  *   CONSONANTS
  =====================================================================  
  */
  //LowerCase
  if ( ( cryptoPassword.hasConsonants ) && ( cryptoPassword.hasLowerCase ) )
    criteriaArray.push( cryptoPassword.alphabet.consonants.lowerConsonantsArray );

    criteriaArray.sort(function(a, b) { return 0.5 - Math.random()});
  console.log ( "SHUFFLED Criteria Array Consonants L = " + criteriaArray );

  //UpperCase
  if ( ( cryptoPassword.hasConsonants ) && ( cryptoPassword.hasUpperCase ) )
    criteriaArray.push( cryptoPassword.alphabet.consonants.upperConsonantsArray ) ;

  criteriaArray.sort(function(a, b) { return 0.5 - Math.random()});
  console.log ( "SHUFFLED Criteria Array Consonants U = " + criteriaArray );

  /*
  ===================================================================== 
  *   NUMBERS
  =====================================================================  
  */
  if ( cryptoPassword.hasNumbers )
    criteriaArray.push( cryptoPassword.numbersArray );

  criteriaArray.sort(function(a, b) { return 0.5 - Math.random()});
  console.log ( "SHUFFLED Criteria Array Numbers = " + criteriaArray );
  
  /*
  ===================================================================== 
  *   SPECIAL CHARACTERS
  =====================================================================  
  */
  if ( cryptoPassword.hasSpecialCharacters )
    criteriaArray.push( cryptoPassword.specialCharactersArray );


  // console.log ( "Criteria Array = " + criteriaArray );

  criteriaArray.sort(function(a, b) { return 0.5 - Math.random()});

  console.log ( "SHUFFLED Criteria Array Final = " + criteriaArray );
  /*
    cryptoPassword.maxLength
  */

  return criteriaArray;
}


/*
===================================================================== 
*   MAIN PROCESS
=====================================================================  
*/
//Test
setPasswordCriteria();

// veritfy if it is possible to generate a Password
if ( cryptoPassword.validCriteria )
  userPasswordCriteria = getCriteriaArray();

            // var criteriaArray = cryptoPassword.alphabet.vowels.lowerVowelsArray.concat
            //                 (
            //                   cryptoPassword.alphabet.vowels.upperVowelsArray,
            //                   cryptoPassword.alphabet.consonants.lowerConsonantsArray,
            //                   cryptoPassword.alphabet.consonants.upperConsonantsArray
            //                 );
       



        

     


        // user to input a letter

        // // TO DO: Call the different car methods
        // if ( letter.length > 0 )
        // {
        //   if ( letter.toLowerCase() === "h" )// Function Honk
        //     car.honk();
        //   else if ( ( letter.toLowerCase() === "d" ) &&
        //             ( car.isWorking ) ) { // Function Drive To Work
        //       car.driveToWork();
        //   }
        //   else if ( ( letter.toLowerCase() === "w" ) &&
        //             ( car.isWorking ) ) { // Function Drive Around The World
        //       car.driveAroundWorld();
        //   }
        //   else if ( letter.toLowerCase() === "t" ) // Function Get Tune Up
        //     car.getTuneUp();
          
        //   reWriteStats();
        // }
        // else
        //   break;
      // }
/*
===================================================================== 
*   FUNCTIONS
=====================================================================  
*/
// userPassword = criteriaArray [ Math.floor( Math.random() * ( criteriaArray.length - 1 ) ];
      

      
      // Here we create a "Function" that allows us to "call" (run) the loop for any array we wish.
      // We pass in an array as an "argument".
      // function consoleInside(arr) {

      //   // We then loop through the selected array.
      //   for (var i = 0; i < arr.length; i++) {

      //     // Each time we print the value inside the array.
      //     console.log(arr[i]);
      //   }
      //   console.log("---------");
      // }


      // FUNCTION CALLS (Execution)
      // =======================================================================================

      // Here we call the function to run our for-loop code on each of the following arrays.
      // consoleInside(brands);





            // Create a Function called "isString" that takes three arguments (x, y, z).
      // "isString" determines if all three arguments are strings and logs an appropriate response to the console.
      // function isString (x, y, z){
      //   var checkValue = "";

      //   if (typeof x === 'string' || x instanceof String)
      //     checkValue += "X is a string | ";
      //   else
      //     checkValue +=  "X is something else | ";

      //   if (typeof y === 'string' || y instanceof String)
      //     checkValue += "Y is a string | ";
      //   else
      //     checkValue +=  "Y is something else | ";

      //   if (typeof z === 'string' || z instanceof String)
      //     checkValue += "Z is a string";
      //   else
      //     checkValue +=  "Z is something else";

      //   return checkValue;
      // }

      // Create a Function called "vowelChecker" that takes in a single argument (x).
      // "vowlChecker" logs whether or not the input is a vowel.
      // function vowelChecker(x){
      //   var vowels = ["a", "A", "e", "E", "i", "I", "o", "O", "u", "U"];

      //   for (let index = 0; index < vowels.length; index++) {
      //     if ( x === vowels[index] ) // x.toLowerCase().charAlt(0)
      //       return ("It's a vowel");  
      //   }
      //   return ("It's NOT a vowel");
      // }

      // var letter;

      // var car = {
      //   make: "Honda",
      //   model: "Fit",
      //   color: "Blue Raspberry",
      //   mileage: 3000,
      //   isWorking: true,

      //   driveToWork: function() {
      //     alert("Old Mileage: " + this.mileage);

      //     this.mileage = this.mileage + 8;

      //     alert("New mileage: " + this.mileage);
      //   },

      //   driveAroundWorld: function() {
      //     alert("Old Mileage: " + this.mileage);

      //     this.mileage = this.mileage + 24000;

      //     alert("New Mileage: " + this.mileage);
      //     alert("Car needs a tuneup!");

      //     this.isWorking = false;
      //   },

      //   getTuneUp: function() {
      //     alert("Car is ready to go!");
      //     this.isWorking = true;
      //   },

      //   honk: function() {
      //     alert("Honk! Honk!");
      //   }
      // };

      // FUNCTIONS
      // ==============================================================================

      // TO DO: Log all of our car's current stats to the console.
      // function reWriteStats() {
      //   console.log("Car Stats: \n\n" +
      //               "Make: "       + car.make      + "\n" +
      //               "Model: "      + car.model     + "\n" +
      //               "Color: "      + car.color     + "\n" +
      //               "Mileage: "    + car.mileage   + "\n" +
      //               "Is working: " + car.isWorking
      //              )
      // }

      // MAIN PROCESS
      // ==============================================================================

      // A while loop makes more sense here than a for loop, because we don't know how long the user will want to play the game
      // This loop will end when the user presses Cancel, thus setting the letter variable to "null"
      // while (letter !== null) {
      //   // Prompt user to input a letter
      //   letter = prompt("Type 'h' to honk, 'd' to drive to work, 'w' to drive around the world, or 't' to get a tuneup.");
        
      //   // TO DO: Call the different car methods
      //   if ( letter.length > 0 )
      //   {
      //     if ( letter.toLowerCase() === "h" )// Function Honk
      //       car.honk();
      //     else if ( ( letter.toLowerCase() === "d" ) &&
      //               ( car.isWorking ) ) { // Function Drive To Work
      //         car.driveToWork();
      //     }
      //     else if ( ( letter.toLowerCase() === "w" ) &&
      //               ( car.isWorking ) ) { // Function Drive Around The World
      //         car.driveAroundWorld();
      //     }
      //     else if ( letter.toLowerCase() === "t" ) // Function Get Tune Up
      //       car.getTuneUp();
          
      //     reWriteStats();
      //   }
      //   else
      //     break;
      // }

// from class...

// Create your HTML Page via DOM Methods here!

// var myElement = document.createElement( "h1" );
// var myText = document.createTextNode("Hello World");

// myElement.setAttribute( "style", "color: red; text-align: center; text-decoration: underline" );
// myElement.appendChild(myText);

// document.body.appendChild( myElement );


// var pTags = document.querySelectorAll("p");
// var divTags = document.querySelectorAll("div");
// var aTags = document.querySelectorAll("a");
// var imgEl = document.querySelectorAll("img");
// var changeP = document.querySelector("#change2");

// console.log(pTags);

// pTags[0].setAttribute("style", "font-size: 65px;");
// changeP.setAttribute("style", "color:blue; border:2px solid black;");
// aTags[0].setAttribute("href", "https://github.com");
// imgEl[0].setAttribute("src", "images/image_1.jpg");
// imgEl[0].setAttribute("style", "width:500px; height:200px;");

// for (var i = 0; i < divTags.length; i++) {
//   divTags[i].setAttribute("style", "text-decoration:underline; color:red;");
// }

// Change its font size to `50px`
// console.log ( "firstDiv: ", firstDiv.style.fontSize = "50px" );

// // Change its first childs, last child to have a font color of `blue`.
// console.log ( "firstDiv: ", firstDiv.children[0].firstElementChild.style.color = "red" );
// console.log ( "firstDiv: ", firstDiv.children[0].lastElementChild.style.color = "red" );

// console.log ( "firstDiv: ", firstDiv.previousElementSibling.style.background = "black" );


// var divMain = document.getElementById ( "main" );

// console.log ( "MainDiv = ", divMain.childNodes[1].style.textDecoration = "underline" );
// console.log ( "MainDiv = ", divMain.lastElementChild.style.fontSize = "50px" );
// console.log ( "MainDiv = ", divMain.firstElementChild.style.color = "orange" );



// ==============================================================================
// ==============================================================================

// Assignment Code
// var generateBtn = document.querySelector("#generate");

// Write password to the #password input
// function writePassword() {
//   var password = generatePassword();
//   var passwordText = document.querySelector("#password");

//   passwordText.value = password;

// }

// Add event listener to generate button
// generateBtn.addEventListener("click", writePassword);
