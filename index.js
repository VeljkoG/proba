// Funkcija za učitavanje JSON fajla
function loadJSON(url, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', url, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

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

  // Postavi prethodno odabrane odgovore na osnovu lokalnog skladišta (local storage)
  for (var questionKey in quizData.quiz) {
    if (quizData.quiz.hasOwnProperty(questionKey)) {
      var selectedOption = localStorage.getItem(questionKey);
      if (selectedOption) {
        var radioInput = document.querySelector('input[name="' + questionKey + '"][value="' + selectedOption + '"]');
        if (radioInput) {
          radioInput.checked = true;
        }
      }
    }
  }
}

// Funkcija za čuvanje odgovora u local storage
function saveAnswer(questionKey, answer) {
  localStorage.setItem(questionKey, answer);
}

// Funkcija za predaju kviza (možete je prilagoditi svojim potrebama)
function submitQuiz() {
  // Ovde možete dodati logiku za proveru tačnih odgovora i prikaz rezultata
  // na osnovu odabranih opcija
  console.log('Quiz submitted!');
}

// Učitavanje JSON fajla i parsiranje
loadJSON('kviz.json', function (response) {
  var quizData = JSON.parse(response);
  generateQuizHTML(quizData);
});
