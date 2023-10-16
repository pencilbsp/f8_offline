const activeClass = "show";
const startBtn = document.querySelector(".start-btn");
startBtn.addEventListener("click", async function () {
  this.classList.remove(activeClass);
  const quiz = new Quiz();
  quiz.start();
});

const setAttribute = (elm, attributes) => {
  Object.keys(attributes).forEach((key) => {
    elm.setAttribute(key, attributes[key]);
  });
};

const delay = (time) => new Promise((r) => setTimeout(r, time));
const showLoading = (show) =>
  document.querySelector(".overlay").classList[show ? "add" : "remove"]("show");

class Quiz {
  constructor() {
    this.score = 0;
    this.questions = [];
    this.interval = null;
    this.needCheck = true;
    this.currentQuestionId = null;
    this.currentIndex = 1;
    this.currentQuestionAnswerIds = null;
    this.countDownElm = document.querySelector(".count-down");
    this.quizContent = document.querySelector(".quiz-content");
    this.progessBar = document.querySelector(".progress-bar");
    this.answerResult = this.quizContent.querySelector(".answer-result");
  }

  startTimer(time = 15000) {
    this.progessBar.style.display = "block";
    let t = 0;
    this.interval = setInterval(() => {
      if (t === time) {
        this.stopTimer();
        this.needCheck && this.checkAnswer();
        return;
      }
      const percent = Math.ceil((t / time) * 100);
      this.progessBar.children[0].style.width = percent + "%";
      t += 100;
    }, 100);
  }

  stopTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.progessBar.style.display = "none";
    }
  }

  async startCountDown(time) {
    return new Promise((resolve) => {
      this.countDownElm.children[0].textContent = time;
      this.countDownElm.classList.add(activeClass);
      const interval = setInterval(() => {
        if (time === 0) {
          clearInterval(interval);
          this.countDownElm.remove();
          this.countDownElm = null;
          return resolve();
        }

        time = time - 1 === 0 ? "Go!" : time - 1;
        this.countDownElm.children[0].textContent = time;

        if (typeof time !== "number") {
          time = 0;
        }
      }, 1000);
    });
  }

  startQuiz(initIndex = this.currentIndex) {
    this.quizContent.querySelector(".total").textContent =
      this.questions.length;

    this.quizContent.classList.add(activeClass);
    this.nextQuiz(initIndex);
  }

  nextQuiz(index) {
    const q = this.questions[index - 1];
    this.currentQuestionId = q.id;
    this.currentQuestionAnswerIds = [];
    this.answerResult.classList.remove("correct");
    this.answerResult.classList.remove("incorrect");
    const optionElm = this.quizContent.querySelector(".options");
    this.quizContent.querySelector(".current").textContent = index;
    this.quizContent.querySelector(".question>p").textContent = q.question;

    setAttribute(optionElm, { qId: q.id, qAnswers: q.answers });

    const optionElms = q.options.map((option, index) => {
      const container = document.createElement("div");
      setAttribute(container, { answerId: option.id });

      const input = document.createElement("input");
      const label = document.createElement("label");

      const inputId = `answer-${index + 1}`;
      setAttribute(input, {
        hidden: true,
        id: inputId,
        type: "checkbox",
        name: "answer",
        value: option.id,
      });

      label.textContent = option.value;
      setAttribute(label, { for: inputId });
      container.append(input, label);

      label.addEventListener("click", (e) => {
        e.preventDefault();

        input.checked = !input.checked;
        if (input.checked) {
          container.setAttribute("checked", "true");
          this.currentQuestionAnswerIds.push(option.id);
        } else {
          container.setAttribute("checked", "false");
          this.currentQuestionAnswerIds = this.currentQuestionAnswerIds.filter(
            (id) => id !== option.id
          );
        }

        if (this.currentQuestionAnswerIds.length === q.answerCount) {
          this.needCheck = false;
          this.stopTimer();
          this.checkAnswer();
        }
      });

      return container;
    });
    optionElm.innerHTML = "";
    optionElm.append(...optionElms);
    this.startTimer();
  }

  async checkAnswer() {
    showLoading(true);
    await delay(500);
    const res = await fetch("https://f8.pendev.cc/api/question", {
      method: "POST",
      body: JSON.stringify({
        action: "answer",
        questionId: this.currentQuestionId,
        answerIds: this.currentQuestionAnswerIds,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    const { isCorrect, correctAnswerIds } = await res.json();
    const answerElms = this.quizContent.querySelector(".options").children;

    this.score += isCorrect ? 1 : 0;
    this.quizContent.querySelector(".scores>span").textContent = this.score;
    this.answerResult.classList.add(isCorrect ? "correct" : "incorrect");

    Array.from(answerElms).forEach((answerElm) => {
      const answerId = Number(answerElm.getAttribute("answerid"));
      const checked = answerElm.getAttribute("checked") === "true";

      if (correctAnswerIds.includes(answerId)) {
        answerElm.classList.add("correct");
      } else if (checked && !correctAnswerIds.includes(answerId)) {
        answerElm.classList.add("incorrect");
      } else {
        // answerElm.classList.add("hide");
      }
    });
    showLoading(false);

    this.currentIndex = this.currentIndex + 1;
    setTimeout(() => this.nextQuiz(this.currentIndex), 3000);
  }

  async start() {
    await this.startCountDown(3);

    const res = await fetch("https://f8.pendev.cc/api/questions");
    this.questions = await res.json();
    this.startQuiz();
  }
}
