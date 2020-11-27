export default class BaseballGame {
  constructor() {
    this.answerNumbers = this.getComputerNumbers();
    this.result = document.getElementById("result");
    this.submit = document.getElementById("submit");
    this.submit.addEventListener("click", this.handleSubmit.bind(this));
    this.isGameEnd = false;
  }

  getRandomIntInclusive() {
    return Math.floor(Math.random() * 9) + 1;
  }

  getComputerNumbers() {
    const numberList = [];
    while (numberList.length < 3) {
      const getRandomNumber = this.getRandomIntInclusive();
      if (!numberList.includes(getRandomNumber))
        numberList.push(getRandomNumber);
    }
    return numberList.join("");
  }

  isCorrectNumberOfDigits(input) {
    if (input[0] === input[1] || input[1] === input[2] || input[0] === input[2])
      return true;
    return false;
  }

  isValuedInputNumber(input) {
    const inputNumber = Number(input);
    if (
      Number.isNaN(inputNumber) ||
      input.includes("0") ||
      inputNumber < 123 ||
      inputNumber > 987 ||
      this.isCorrectNumberOfDigits(input)
    )
      return false;

    return true;
  }

  handleSubmit(e) {
    const userInput = document.getElementById("user-input").value.trim();
    document.getElementById("user-input").value = "";

    if (this.isGameEnd) return;
    if (!this.isValuedInputNumber(userInput))
      return alert("잘못된 입력값 입니다");

    this.render(this.play(this.answerNumbers, userInput), userInput);
  }

  play(computerInputNumbers, userInputNumbers) {
    if (computerInputNumbers === userInputNumbers) return this.correctAnswer();

    let ballCount = 0;
    let strikeCount = 0;

    for (let i = 0; i < 3; i++) {
      if (computerInputNumbers[i] === userInputNumbers[i]) {
        strikeCount++;
        continue;
      }
      if (computerInputNumbers.includes(userInputNumbers[i])) ballCount++;
    }

    return this.incorrectAnswer(ballCount, strikeCount);
  }

  correctAnswer() {
    return `🎉 정답을 맞추셨습니다 🎉<br>게임을 새로 시작하시겠습니까? <button id="game-restart-button">게임 재시작</button>`;
  }

  incorrectAnswer(ballCount, strikeCount) {
    if (ballCount === 0 && strikeCount === 0) return "낫싱";
    if (ballCount !== 0 && strikeCount === 0) return `${ballCount}볼`;
    if (ballCount === 0 && strikeCount !== 0) return `${strikeCount}스트라이크`;
    return `${ballCount}볼 ${strikeCount}스트라이크`;
  }

  render(resultValue, inputNumbers) {
    const newDiv = document.createElement("div");
    newDiv.className = "result-box";
    newDiv.innerHTML = `
        <hr align=left width=200/>
        <input type="text" value="${inputNumbers}" />
        <button id="submit">확인</button>
        <h3>📄 결과</h3>
        <p>
          ${resultValue}
        </p>
        `;
    this.result.appendChild(newDiv);
    this.gameRestartButton();
  }

  gameRestartButton() {
    const restartBtn = document.getElementById("game-restart-button");
    if (restartBtn !== null) {
      this.isGameEnd = true;
      restartBtn.addEventListener("click", this.reset.bind(this));
    }
  }

  reset(e) {
    this.result.innerHTML = "";
    this.answerNumbers = this.getComputerNumbers();
    this.isGameEnd = false;
  }
}

new BaseballGame();
