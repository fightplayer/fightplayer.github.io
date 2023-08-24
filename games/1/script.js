var window = document.getElementById("window");
var ball = document.getElementById("ball");
var blocks = document.getElementById("blocks").getElementsByClassName("block");

var velocityX = 5;
var velocityY = 5;

function update() {
  ball.style.left = ball.offsetLeft + velocityX;
  ball.style.top = ball.offsetTop + velocityY;

  // 壁に当たったら反射する
  if (ball.offsetLeft < 0 || ball.offsetLeft > window.offsetWidth) {
    velocityX = -velocityX;
  }
  if (ball.offsetTop < 0 || ball.offsetTop > window.offsetHeight) {
    velocityY = -velocityY;
  }

  // ブロックに当たったら破壊する
  for (var i = 0; i < blocks.length; i++) {
    if (ball.getBoundingClientRect().intersects(blocks[i].getBoundingClientRect())) {
      blocks[i].remove();
    }
  }
}

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 38) {
    velocityY = -10;
  } else if (event.keyCode === 40) {
    velocityY = 10;
  }
});

setInterval(update, 1000 / 60);
