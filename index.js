function generateQuizHTML(quizData) {
  var quizContainer = document.getElementById("quiz-container");
  var html = "";

  for (var questionKey in quizData.quiz) {
    if (quizData.quiz.hasOwnProperty(questionKey)) {
      var question = quizData.quiz[questionKey];
      html += '<div class="question">' + question.question + '</div>';
      html += '<div class="options">';

      for (var i = 0; i < question.options.length; i++) {
        var option = question.options[i];
        var isChecked = localStorage.getItem(questionKey) === option ? 'checked' : '';
        html += '<label>';
        html += '<input type="radio" name="' + questionKey + '" value="' + option + '" ' + isChecked + '>' + option;
        html += '</label>';
      }

      html += '</div><br>';
    }
  }

  html += '<button class="submit-button" onclick="submitQuiz()">Submit</button>';

  quizContainer.innerHTML = html;

  var radioInputs = quizContainer.querySelectorAll('input[type="radio"]');
  radioInputs.forEach(function (radioInput) {
    radioInput.addEventListener('change', function (event) {
      var questionKey = event.target.name;
      var selectedAnswer = event.target.value;
      saveAnswer(questionKey, selectedAnswer);
    });
  });

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

function saveAnswer(questionKey, selectedAnswer) {
  localStorage.setItem(questionKey, selectedAnswer);
}

function submitQuiz() {
  var userAnswers = {};

  for (var questionKey in quizData.quiz) {
    if (quizData.quiz.hasOwnProperty(questionKey)) {
      var selectedOption = localStorage.getItem(questionKey);
      userAnswers[questionKey] = selectedOption;
    }
  }

  
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

 
}



function loadQuizData(callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", "kviz.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var quizData = JSON.parse(xhr.responseText);
      callback(quizData);
    }
  };
  xhr.send(null);
}



loadQuizData(function (quizData) {
  generateQuizHTML(quizData);
});
