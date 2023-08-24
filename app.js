document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  const width = 4;
  let squares = [];
  let score = 0;
  //create a 4*4 grid using a loop
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      cell = document.createElement("div");
      cell.innerHTML = 0;
      gridDisplay.appendChild(cell);
      squares.push(cell);
    }
    generate();
    generate();
  }
  createBoard();

  //generate a random number
  function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      noZero();
    } else {
      generate();
    }
  }

  //swipe right
  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 == 0) {
        let totalOne = squares[i].innerHTML;

        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        //we need strings rather than numbers so we store using different format
        // let row = { totalOne, totalTwo, totalThree, totalFour };

        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        //console.log(row);
        let filteredRow = row.filter((num) => num);
        //console.log(filteredRow);
        let zeros = Array(4 - filteredRow.length).fill(0);
        //console.log(zeros);
        let newRow = zeros.concat(filteredRow);
        //console.log(newRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }
  //moveRight();

  //swipe left
  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 == 0) {
        let totalOne = squares[i].innerHTML;

        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        //we need strings rather than numbers so we store using different format
        // let row = { totalOne, totalTwo, totalThree, totalFour };

        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        //console.log(row);
        let filteredRow = row.filter((num) => num);
        //console.log(filteredRow);
        let zeros = Array(4 - filteredRow.length).fill(0);
        //console.log(zeros);
        let newRow = filteredRow.concat(zeros);
        //console.log(newRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  //moveLeft();

  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i + 1].innerHTML = combinedTotal;
        squares[i].innerHTML = 0;
        score = score + combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }

    check();
  }

  // swipe down
  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + 4].innerHTML;
      let totalThree = squares[i + 8].innerHTML;
      let totalFour = squares[i + 12].innerHTML;

      let col = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      //console.log(col);
      let filteredCol = col.filter((num) => num);
      //console.log(filteredCol);
      let zeroes = Array(4 - filteredCol.length).fill(0);
      let newCol = zeroes.concat(filteredCol);
      //console.log(newCol);
      squares[i].innerHTML = newCol[0];
      squares[i + 4].innerHTML = newCol[1];
      squares[i + 8].innerHTML = newCol[2];
      squares[i + 12].innerHTML = newCol[3];
    }
  }
  //moveDown();
  // swipe up
  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + 4].innerHTML;
      let totalThree = squares[i + 8].innerHTML;
      let totalFour = squares[i + 12].innerHTML;

      let col = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      //console.log(col);
      let filteredCol = col.filter((num) => num);
      //console.log(filteredCol);
      let zeroes = Array(4 - filteredCol.length).fill(0);
      let newCol = filteredCol.concat(zeroes);
      //console.log(newCol);
      squares[i].innerHTML = newCol[0];
      squares[i + 4].innerHTML = newCol[1];
      squares[i + 8].innerHTML = newCol[2];
      squares[i + 12].innerHTML = newCol[3];
    }
  }
  //moveUp();
  function combineCol() {
    for (let i = 0; i <= 11; i++) {
      if (squares[i].innerHTML === squares[i + 4].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 4].innerHTML);
        squares[i + 4].innerHTML = combinedTotal;
        squares[i].innerHTML = 0;
        score = score + combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }

    check();
  }

  //assign keycodes
  function control(e) {
    if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 38) {
      keyUp();
    } else if (e.keyCode === 40) {
      keyDown();
    }
  }
  document.addEventListener("keyup", control);
  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generate();
  }
  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generate();
  }
  function keyUp() {
    moveUp();
    combineCol();
    moveUp();
    generate();
  }
  function keyDown() {
    moveDown();
    combineCol();
    moveDown();
    generate();
  }

  //check for 2048

  function check() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] == 16) {
        resultDisplay.innerHTML = "WIN";
        document.removeEventListener("keyup", control);
      }
    }
  }

  //check for no zeros (loss)
  function noZero() {
    let counter = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        counter++;
      }
    }
    if (counter == 0) {
      resultDisplay.innerHTML = "try again";
      document.removeEventListener("keyup", control);
    }
  }
});
