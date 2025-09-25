

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player O starts

let winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Reset game state
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Add click event to all boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

// Disable all boxes
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Enable all boxes and clear content
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

// Show winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Show draw message
const draw = () => {
  msg.innerText = `It's a draw`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check for winner or draw
const checkWinner = () => {
  for (let pattern of winningPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        return; 
      }
    }
  }

  let allFilled = true;
  boxes.forEach((box) => {
    if (box.innerText === "") {
      allFilled = false;
    }
  });

  if (allFilled) {
    draw();
  }
};

// Button events
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
