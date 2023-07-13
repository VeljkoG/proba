// Funkcija za generisanje HTML koda kviz-pitanja
function generateQuizHTML(quizData) {
  var quizContainer = document.getElementById("quiz-container");
  var html = "";

  // Iteriraj kroz kviz-pitanja
  for (var questionKey in quizData.quiz) {
    if (quizData.quiz.hasOwnProperty(questionKey)) {
      var question = quizData.quiz[questionKey];
      html += '<div class="question">' + question.question + '</div>';

      // Generiši opcije za odgovor
      for (var i = 0; i < question.options.length; i++) {
        var option = question.options[i];
        var isChecked = localStorage.getItem(questionKey) === option ? 'checked' : '';
        html += '<label>';
        html += '<input type="radio" name="' + questionKey + '" value="' + option + '" ' + isChecked + '>' + option;
        html += '</label>';
      }

      html += '<br><br>';
    }
  }

  // Dodaj dugme za predaju kviza
  html += '<button onclick="submitQuiz()">Submit</button>';

  // Prikaz HTML koda u kontejneru
  quizContainer.innerHTML = html;

  // Postavi event listenere na radio input elemente kako bismo pratili promene odgovora
  var radioInputs = quizContainer.querySelectorAll('input[type="radio"]');
  radioInputs.forEach(function (radioInput) {
    radioInput.addEventListener('change', function (event) {
      var questionKey = event.target.name;
      var selectedAnswer = event.target.value;
      saveAnswer(questionKey, selectedAnswer);
    });
  });

  // Postavi prethodno odabrane odgovore na osnovu lokalnog skladišta (local storage)
  for (var questionKey in quizData.quiz) {
    if (quizData.quiz.hasOwnProperty(questionKey)) {
      var selectedOption = localStorage.getItem(questionKey);
      if (selectedOption) {
        var radioInput = quizContainer.querySelector('input[name="' + questionKey + '"][value="' + selectedOption + '"]');
        if (radioInput) {
          radioInput.checked = true;
        }
      }
    }
  }
}
