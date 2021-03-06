function doStuff() {
  $(window).resize(function () {
    $(".question-img").css("width", $(".slide.active-slide .question").width());
  });

  // Functions
  function buildQuiz() {
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<br><label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label> <br>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div><br>
            <img class="question-img" src="img/` +
          (questionNumber + 1) +
          `.jpg "/>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");

    var numCorrect = 0;

    const answerContainer = answerContainers[currentSlide];
    var selector = `input[name=question${currentSlide}]:checked`;
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;
    if (userAnswer != null) {
      // gather answer containers from our quiz

      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {})
          .value;

        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
          // add to the number of correct answers
          numCorrect++;
        }

      });
    } else {
      $("#warning").css("opacity", "100");
    }

    if (numCorrect === slides.length) {
      $(".overlay").css("display", "block");
      $(".pane.winner").css("display", "block");
    }

    else
    {
      $(".overlay").css("display", "block");
      $(".pane.loser").css("display", "block");
    }

    $("#score").text( "Wynik: " + ((numCorrect/slides.length) * 100).toFixed(1) + "% (" + numCorrect + " z " + slides.length + ")");
  }

  function showSlide(n) {
    no.innerText = "Pytanie " + (n + 1) + " z " + slides.length;
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }

    $(".question-img").css("width", $(".slide.active-slide .question").width());
    $(".container").css("height", $(".slide.active-slide").height());
    $("#warning").css("opacity", "0");
  }

  function showNextSlide() {
    var answerContainers = quizContainer.querySelectorAll(".answers");
    const answerContainer = answerContainers[currentSlide];
    var selector = `input[name=question${currentSlide}]:checked`;
    var userAnswer = (answerContainer.querySelector(selector) || {}).value;
    if (userAnswer != null) {
      showSlide(currentSlide + 1);
    } else {
      $("#warning").css("opacity", "100");
    }
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById("quiz");
  const warning = document.getElementById("warning");
  const no = document.getElementById("no");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "Dlaczego nie mo??na umy?? samochodu w jeziorze?",
      answers: {
        a: "Poniewa?? woda z jeziora mo??e zniszczy?? samoch??d.",
        b: "Mo??e to przeszkadza?? pla??owiczom.",
        c: "Zatrujemy wod?? w jeziorze.",
      },
      correctAnswer: "c",
    },
    {
      question: "Oszcz??dzamy wod?? gdy...",
      answers: {
        a: "k??piemy si?? dwa razy w tygodniu.",
        b: "k??piemy si?? w wannie.",
        c: "bierzemy kr??tki prysznic do 2 minut codziennie.",
      },
      correctAnswer: "c",
    },
    {
      question: "Kt??ra z tych czynno??ci jest ekologiczna?",
      answers: {
        a: "Kupowanie ubra?? na wyprzeda??y.",
        b: "Kupowanie ubra?? w sieci??wce.",
        c: "Kupowanie ubra?? w sklepach z odzie???? u??ywan??.",
      },
      correctAnswer: "c",
    },

    {
      question: "Kt??re post??powanie NIE jest ekologiczne?",
      answers: {
        a: "U??ywanie wody z mycia warzyw i owoc??w do podlewania ro??lin.",
        b: "Zbieranie deszcz??wki.",
        c: "Kupowanie wody w plastikowych butelkach.",
      },
      correctAnswer: "c",
    },

    {
      question: "Czego NIE nale??y robi?? z resztkami jedzenia?",
      answers: {
        a: "Gotowa?? z nich potraw.",
        b: "Wyrzuca??.",
        c: "Mrozi??.",
      },
      correctAnswer: "b",
    },

    {
      question:  "Jakiej klasy energetycznej urz??dzenia AGD najlepiej kupowa???",
      answers: {
        a: "A+++",
        b: "A++++",
        c: "C",
      },
      correctAnswer: "a",
    },

    {
      question: "Ile rozk??ada si?? plastikowa torebka?",
      answers: {
        a: "400 lat",
        b: "150 lat",
        c: "5 lat",
      },
      correctAnswer: "a",
    },

    {
      question: "Jakich toreb na zakupy powiniene?? u??ywa?? by by?? eko?",
      answers: {
        a: "Plastikowych",
        b: "Wielokrotnego u??ytku",
        c: "Foliowych",
      },
      correctAnswer: "b",
    },

    {
      question: "Jak nazywa si?? proces przetwarzania odpad??w? ",
      answers: {
        a: "Recykling",
        b: "Kompostowanie",
        c: "Utylizacja",
      },
      correctAnswer: "a",
    },

    {
      question: "Co nale??y zrobi?? z zu??ytym olejem do sma??enia?",
      answers: {
        a: "Zamkn???? w s??oiku I wyrzuci?? do odpad??w mieszanych.",
        b: "Wyla?? do lasu.",
        c: "Zamkn???? w s??oiku I wyrzuci?? do odpad??w szklanych.",
      },
      correctAnswer: "a",
    },

    {
      question: "Co powoduj?? kwa??ne deszcze? ",
      answers: {
        a: "Zakwaszanie gleb I niszczenie zabytk??w.",
        b: "Oczyszczanie rzek I jezior z drobnoustroj??w",
        c: "Ocieplenie klimatu",
      },
      correctAnswer: "a",
    },

    {
      question: "Symbolem Ligi Ochrony przyrody jest:",
      answers: {
        a: "Lo??",
        b: "??ubr",
        c: "Kozica",
      },
      correctAnswer: "b",
    },
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
}

window.onload = doStuff;
