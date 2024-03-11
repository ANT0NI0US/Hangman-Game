/* hangMan Game */

// // words
// const words = {
//   programming: [
//     "php",
//     "javascript",
//     "go",
//     "scala",
//     "fortran",
//     "r",
//     "mysql",
//     "python",
//   ],
//   movies: [
//     "Prestige",
//     "Inception",
//     "Parasite",
//     "Interstellar",
//     "Whiplash",
//     "Memento",
//     "Coco",
//     "Up",
//   ],
//   people: [
//     "Albert Einstein",
//     "Hitchcock",
//     "Alexander",
//     "Cleopatra",
//     "Mahatma Ghandi",
//   ],
//   countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
// };

// // get the keys from the object
// let randomKeys = Object.keys(words);

// // get random number from the keys
// let randomNum = Math.floor(Math.random() * randomKeys.length);

// // get the keys name from the random number
// let keysName = randomKeys[randomNum];

// // add the [keysName] to the word From
// let category = document.querySelector(".category span");
// category.textContent = keysName;

// // get random number from the chosen array key
// let randomNumberFromTheRandomKeys = Math.floor(
//   Math.random() * Object.values(words)[randomNum].length
// );

// // get the random name from the random array random key
// let theTextForTheGame =
//   Object.values(words)[randomNum][randomNumberFromTheRandomKeys];

// // add spans with the array lenght
// let letterGuess = document.querySelector(".letters-guess");
// let theTextForTheGameArray = [...theTextForTheGame];
// for (let i = 0; i < theTextForTheGameArray.length; i++) {
//   let span = document.createElement("span");
//   if (theTextForTheGameArray[i] === " ") {
//     span.classList.add("with-space");
//   }
//   letterGuess.append(span);
// }

// // fill the letters with a javaScript function
// let allLetters = document.querySelector(".letters");
// for (let i = 65; i <= 90; i++) {
//   let letterBox = document.createElement("span");
//   letterBox.classList.add("letter-box");
//   letterBox.textContent = String.fromCharCode(i);
//   allLetters.append(letterBox);
// }

// let theStatus = false;
// let wrongAttempts = 0;
// let rightAttempts = 0;
// if (theTextForTheGame.includes(" "))
// {
//   rightAttempts = 1 ;
// }
// document.body.addEventListener("click", (e) => {
//   if (e.target.className === "letter-box") {
//     e.target.classList.add("clicked");
//     let allspansInLetterGuess = document.querySelectorAll(
//       ".letters-guess span"
//     );
//     if (theTextForTheGame.toLowerCase().includes(e.target.textContent.toLowerCase())) {
//       theStatus = true;
//       for (let j = 0; j < theTextForTheGame.length; j++) {
//         if (theTextForTheGame[j].toUpperCase() === e.target.textContent) {
//           allspansInLetterGuess[j].textContent = e.target.textContent;
//           rightAttempts++;
//         }
//       }
//     } else {
//       theStatus = false;
//       wrongAttempts++;
//     }

//     let hangManDraw = document.querySelector(".hangman-draw");
//     let success = document.querySelector(`[id="success"]`);
//     let fail = document.querySelector(`[id="fail"]`);

//     if (theStatus === true) {
//       success.play();
//       if (rightAttempts === theTextForTheGame.length) {
//         Swal.fire({
//           title: "Correct",
//           icon: "success",
//           confirmButtonText: "Try Again",
//           confirmButtonColor: 'red',
//         }).then((result)=>{
//           if (result.isConfirmed)
//           {
//             location.reload();
//           }
//         });
//       }
//     } else {
//       hangManDraw.classList.add(`wrong-${wrongAttempts}`);
//       fail.play();
//       if (wrongAttempts === 8) {
//         Swal.fire({
//           title: "wrong",
//           icon: "error",
//           text: `The Correct Answer Is ${theTextForTheGame}!!`,
//           confirmButtonText: "Try Again",
//           confirmButtonColor: 'red',
//         }).then((result)=>{
//           if (result.isConfirmed)
//           {
//             location.reload();
//           }
//         });
//       }
//     }
//   }
// });

/* another solution */

window.onload = function () {
  document.querySelector(".letters-guess").innerHTML = "";

  fetch("./hangManGame.json")
    .then((result) => {
      return result.json();
    })
    .then((words) => {
      // get the keys from the object
      let randomKeys = Object.keys(words);

      // get random number from the keys
      let randomNum = Math.floor(Math.random() * randomKeys.length);

      // get the keys name from the random number
      let keysName = randomKeys[randomNum];

      // add the [keysName] to the word From
      let category = document.querySelector(".category span");
      category.textContent = keysName;

      // get random number from the chosen array key
      let randomNumberFromTheRandomKeys = Math.floor(
        Math.random() * Object.values(words)[randomNum].length
      );

      // get the random name from the random array random key
      let theTextForTheGame =
        Object.values(words)[randomNum][randomNumberFromTheRandomKeys];

      localStorage.setItem("theTextForTheGame", theTextForTheGame);

      // add spans with the array lenght
      let letterGuess = document.querySelector(".letters-guess");
      let theTextForTheGameArray = [...theTextForTheGame];
      for (let i = 0; i < theTextForTheGameArray.length; i++) {
        let span = document.createElement("span");
        if (theTextForTheGameArray[i] === " ") {
          span.classList.add("with-space");
        }
        letterGuess.append(span);
      }
    });
};
// fill the letters with a javaScript function
let allLetters = document.querySelector(".letters");
for (let i = 65; i <= 90; i++) {
  let letterBox = document.createElement("span");
  letterBox.classList.add("letter-box");
  letterBox.textContent = String.fromCharCode(i);
  allLetters.append(letterBox);
}

let theStatus = false;
let wrongAttempts = 0;
let rightAttempts = 0;
document.body.addEventListener("click", (e) => {
  let theTextForTheGame = localStorage.getItem("theTextForTheGame");
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    let allspansInLetterGuess = document.querySelectorAll(
      ".letters-guess span"
    );
    if (
      theTextForTheGame
        .toLowerCase()
        .includes(e.target.textContent.toLowerCase())
    ) {
      theStatus = true;
      for (let j = 0; j < theTextForTheGame.length; j++) {
        if (theTextForTheGame[j].toUpperCase() === e.target.textContent) {
          allspansInLetterGuess[j].textContent = e.target.textContent;
          rightAttempts++;
        }
      }
    } else {
      theStatus = false;
      wrongAttempts++;
    }

    let hangManDraw = document.querySelector(".hangman-draw");
    let success = document.querySelector(`[id="success"]`);
    let fail = document.querySelector(`[id="fail"]`);

    if (theStatus === true) {
      success.play();
      if (rightAttempts === theTextForTheGame.split(" ").join("").length) {
        Swal.fire({
          title: "Correct",
          icon: "success",
          confirmButtonText: "Try Again",
          confirmButtonColor: "red",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      }
    } else {
      hangManDraw.classList.add(`wrong-${wrongAttempts}`);
      fail.play();
      if (wrongAttempts === 8) {
        Swal.fire({
          title: "wrong",
          icon: "error",
          text: `The Correct Answer Is ${theTextForTheGame}!!`,
          confirmButtonText: "Try Again",
          confirmButtonColor: "red",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          }
        });
      }
    }
  }
});
