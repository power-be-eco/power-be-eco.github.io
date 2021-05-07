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
      question: "Dlaczego nie można umyć samochodu w jeziorze?",
      answers: {
        a: "Ponieważ woda z jeziora może zniszczyć samochód.",
        b: "Może to przeszkadzać plażowiczom.",
        c: "Zatrujemy wodę w jeziorze.",
      },
      correctAnswer: "c",
    },
    {
      question: "Oszczędzamy wodę gdy...",
      answers: {
        a: "kąpiemy się dwa razy w tygodniu.",
        b: "kąpiemy się w wannie.",
        c: "bierzemy krótki prysznic do 2 minut codziennie.",
      },
      correctAnswer: "c",
    },
    {
      question: "Która z tych czynności jest ekologiczna?",
      answers: {
        a: "Kupowanie ubrań na wyprzedaży.",
        b: "Kupowanie ubrań w sieciówce.",
        c: "Kupowanie ubrań w sklepach z odzieżą używaną.",
      },
      correctAnswer: "c",
    },

    {
      question: "Które postępowanie NIE jest ekologiczne?",
      answers: {
        a: "Używanie wody z mycia warzyw i owoców do podlewania roślin.",
        b: "Zbieranie deszczówki.",
        c: "Kupowanie wody w plastikowych butelkach.",
      },
      correctAnswer: "c",
    },

    {
      question: "Czego NIE należy robić z resztkami jedzenia?",
      answers: {
        a: "Gotować z nich potraw.",
        b: "Wyrzucać.",
        c: "Mrozić.",
      },
      correctAnswer: "b",
    },

    {
      question:  "Jakiej klasy energetycznej urządzenia AGD najlepiej kupować?",
      answers: {
        a: "A+++",
        b: "A++++",
        c: "C",
      },
      correctAnswer: "a",
    },

    {
      question: "Ile rozkłada się plastikowa torebka?",
      answers: {
        a: "400 lat",
        b: "150 lat",
        c: "5 lat",
      },
      correctAnswer: "a",
    },

    {
      question: "Jakich toreb na zakupy powinieneś używać by być eko?",
      answers: {
        a: "Plastikowych",
        b: "Wielokrotnego użytku",
        c: "Foliowych",
      },
      correctAnswer: "b",
    },

    {
      question: "Jak nazywa się proces przetwarzania odpadów? ",
      answers: {
        a: "Recykling",
        b: "Kompostowanie",
        c: "Utylizacja",
      },
      correctAnswer: "a",
    },

    {
      question: "Co należy zrobić z zużytym olejem do smażenia?",
      answers: {
        a: "Zamknąć w słoiku I wyrzucić do odpadów mieszanych.",
        b: "Wylać do lasu.",
        c: "Zamknąć w słoiku I wyrzucić do odpadów szklanych.",
      },
      correctAnswer: "a",
    },

    {
      question: "Co powodują kwaśne deszcze? ",
      answers: {
        a: "Zakwaszanie gleb I niszczenie zabytków.",
        b: "Oczyszczanie rzek I jezior z drobnoustrojów",
        c: "Ocieplenie klimatu",
      },
      correctAnswer: "a",
    },

    {
      question: "Symbolem Ligi Ochrony przyrody jest:",
      answers: {
        a: "Loś",
        b: "Żubr",
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
