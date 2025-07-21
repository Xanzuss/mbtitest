// Sample questions: we’ll expand this with real cognitive function mappings
const questions = [
  {
    text: "I often think about the future in abstract ways.",
    function: "Ni"
  },
  {
    text: "I enjoy trying new things without planning ahead.",
    function: "Ne"
  }
  // Add more questions here
];

const options = [
  "Strongly agree",
  "Agree",
  "Slightly agree",
  "Neutral",
  "Slightly disagree",
  "Disagree",
  "Strongly disagree"
];

let currentQuestion = 0;
let answers = [];

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question-text").innerText = q.text;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  options.forEach((label, index) => {
    const value = 3 - index; // +3 to -3
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = value;
    if (answers[currentQuestion] == value) input.checked = true;

    const optionLabel = document.createElement("label");
    optionLabel.appendChild(input);
    optionLabel.appendChild(document.createTextNode(label));

    const br = document.createElement("br");
    optionsDiv.appendChild(optionLabel);
    optionsDiv.appendChild(br);
  });

  document.getElementById("backBtn").style.display = currentQuestion > 0 ? "inline" : "none";
  document.getElementById("nextBtn").style.display = currentQuestion < questions.length - 1 ? "inline" : "none";
  document.getElementById("submitBtn").style.display = currentQuestion === questions.length - 1 ? "inline" : "none";
}

function nextQuestion() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Please select an answer.");
    return;
  }

  answers[currentQuestion] = parseInt(selected.value);
  currentQuestion++;
  showQuestion();
}

function prevQuestion() {
  currentQuestion--;
  showQuestion();
}

function submitQuiz() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Please select an answer.");
    return;
  }
  answers[currentQuestion] = parseInt(selected.value);

  // For now just show answers — we’ll later calculate function strengths and MBTI
  document.getElementById("question-container").style.display = "none";
  document.querySelector(".navigation").style.display = "none";
  document.getElementById("result").innerText = "Thanks! Your answers: " + JSON.stringify(answers);
}

showQuestion();
