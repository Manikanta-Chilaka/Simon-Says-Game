let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let btns = ["red", "yellow", "blue", "green"];

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    console.log("Game started");
    levelUp();
  }
  
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `level ${level}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
//   console.log(gameSeq);
  btnFlash(randBtn);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
  btn.addEventListener("click", btnPress);
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}
// Used to check the answers are correct or not if not correct resets
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over Your Score was ${level-1} <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 500);
    highScore();
    reset();
  }
}

function reset() {
  gameSeq = [];
  started = false;
  userSeq = [];
  level = 0;
}

function highScore() {
  let hs = 0;
  if (hs <= level) {
    hs = level-1;
    document.querySelector("h3").innerHTML = `Highest Score is <b>${hs}</b>`;
  } else {
    document.querySelector("h3").innerHTML = `Highest Score is <b>${hs}</b>`;
  }
}
