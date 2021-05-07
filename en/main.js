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

    $("#score").text( "Score: " + ((numCorrect/slides.length) * 100).toFixed(1) + "% (" + numCorrect + " out of " + slides.length + ")");
  }

  function showSlide(n) {
    no.innerText = "Question " + (n + 1) + " out of " + slides.length;
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
      question: "Why can't we wash a car in a lake?",
      answers: {
        a: "Beacuse the water can destroy our car. ",
        b: "Because we can disturb other people on the beach.",
        c: "Because we will pollute the water.",
      },
      correctAnswer: "c",
    },
    {
      question: "We can save water if...",
      answers: {
        a: "we take a shower twice a week.",
        b: "we take a bath.",
        c: "we take a quick shower for 2 minutes every day.",
      },
      correctAnswer: "c",
    },
    {
      question: "Which one of these actions is ecological?",
      answers: {
        a: "Buying clothes on sale.",
        b: "Buying clothes in chain stores.",
        c: "Buying clothes in second-hand stores.",
      },
      correctAnswer: "c",
    },

    {
      question: "Which action is NOT ecological?",
      answers: {
        a: "Using leftover water from washing vegetables to water plants.",
        b: "Collecting rainwater.",
        c: "Buying water in plastic bottles.",
      },
      correctAnswer: "c",
    },

    {
      question: "What should you NOT do with leftovers?",
      answers: {
        a: "Cook meals with them.",
        b: "Throw them away.",
        c: "Freeze them.",
      },
      correctAnswer: "b",
    },

    {
      question: "Which energy class of AGD products should you buy?",
      answers: {
        a: "A+++",
        b: "A++++",
        c: "C",
      },
      correctAnswer: "a",
    },

    {
      question: "How long does a plastic bag decompose?",
      answers: {
        a: "400 years",
        b: "150 years",
        c: "5 years",
      },
      correctAnswer: "a",
    },

    {
      question: "What type of shopping bag should you use?",
      answers: {
        a: "Plastic",
        b: "Multiple Use",
        c: "Foil",
      },
      correctAnswer: "b",
    },

    {
      question: "What is processing waste called?",
      answers: {
        a: "Recycling",
        b: "Composting",
        c: "Utilization",
      },
      correctAnswer: "a",
    },

    {
      question: "What should you do with used frying oil?",
      answers: {
        a: "Put it in a jar and throw in the mixed waste container",
        b: "Dispose of it in the forest",
        c: "Put it in a jar and throw in the glass waste container",
      },
      correctAnswer: "a",
    },

    {
      question: "What do acid rains cause?",
      answers: {
        a: "Soil acidfication, and destruction of monuments.",
        b: "Cleansing rivers, and lakes of microbes.",
        c: "Global warming.",
      },
      correctAnswer: "a",
    },

    {
      question: "The symbol of the League of Nature Conservation is:",
      answers: {
        a: "Moose",
        b: "European Bison",
        c: "Goat",
      },
      correctAnswer: "d",
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
