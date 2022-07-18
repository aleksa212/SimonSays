const buttons = document.querySelectorAll(".button");
const startBtn = document.querySelector(".button-start");
const levelNumber = document.querySelector(".number");
const yourTurnText = document.querySelector(".your-turn");

let order = [];
let userOrder = [];
let level = 0;

buttons.forEach((button) => (button.disabled = true));

function startSequence() {
  startBtn.classList.add('hide');
  if (level === 0) {
    for (let i = 0; i < level + 3; i++) {
      const random = Math.floor(Math.random() * 4);
      order.push(random);
    }
  } else {
    const random = Math.floor(Math.random() * 4);
    order.push(random);
  }

  order.forEach((item, index) => {
    setTimeout(() => {
      turnOnAndOff(item);
    }, 1000 * (index + 1));
  });

  setTimeout(yourTurn, order.length * 1000 + 500);
}

function yourTurn() {
  buttons.forEach((button) => (button.disabled = false));
  yourTurnText.classList.remove("hide");
}

function handleUserClick(event) {
  const buttonIndex = +event.target.id;
  userOrder.push(buttonIndex);
  turnOnAndOff(buttonIndex);
  check();
}

function turnOnAndOff(index) {
  buttons[index].classList.remove("blur");
  setTimeout(() => {
    buttons[index].classList.add("blur");
  }, 300);
}

function check() {
  const lastIndex = userOrder.length - 1;

  if (order[lastIndex] !== userOrder[lastIndex]) {
    alert("you lose");
    level = 0;
    reset();
    order = [];
  } else if (order.length === userOrder.length) {
    alert("you win");
    level++;
    reset();
  }
}

function reset() {
  startBtn.classList.remove('hide');
  userOrder = [];
  yourTurnText.classList.add("hide");
  levelNumber.textContent = level;
  buttons.forEach((button) => (button.disabled = true));
}

startBtn.addEventListener("click", startSequence);
buttons.forEach((button) => {
  button.addEventListener("click", handleUserClick);
});
