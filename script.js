let step = 0;
let locationData = null;

// Questions & images
const questions = [
  "Which cat feels closest to home?",
  "Which cat feels more familiar?",
  "Which cat would you trust?",
  "Final choice. Follow your instincts."
];

const imagePairs = [
  [
    "https://images.unsplash.com/photo-1579168765467-3b235f938439?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzAzMTc5MTl8&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1699337247018-2f34d2389f7b?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzAzMTc5ODd8&ixlib=rb-4.1.0&q=85"
  ],
  [
    "https://images.unsplash.com/photo-1612532276780-14ed318a03e0?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzAzMTc5ODd8&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1472053092455-ee16a8b358b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzAzMTgwNzh8&ixlib=rb-4.1.0&q=85"
  ],
  [
    "https://images.unsplash.com/photo-1573865526739-10659fec78a5?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzAzMTgwNzh8&ixlib=rb-4.1.0&q=85",
    "https://www.rd.com/wp-content/uploads/2019/11/cat-10-e1573844975155-scaled.jpg"
  ],
  [
    "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzAzMTgxNzN8&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1581898262339-10bac03c5818?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzAzMTgyMTB8&ixlib=rb-4.1.0&q=85"
  ]
];

// Load cat step
function loadStep() {
  const left = document.getElementById("leftCat");
  const right = document.getElementById("rightCat");

  left.style.opacity = 0;
  right.style.opacity = 0;

  setTimeout(() => {
    document.getElementById("question").textContent = questions[step];
    left.src = imagePairs[step][0];
    right.src = imagePairs[step][1];
    left.style.opacity = 1;
    right.style.opacity = 1;
  }, 300);
}

// Answer click
function answer() {
  if (!locationData) {
    document.getElementById("question").textContent =
      "Whiskers analyzing cat energy... 🐱";

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        locationData = data;
        reveal();
      })
      .catch(() => {
        document.getElementById("result").textContent =
          "Whiskers brain empty 😿";
      });
  } else {
    reveal();
  }
}

// Reveal step
function reveal() {
  if (step === 0) {
    document.getElementById(
      "result"
    ).textContent = `Whiskers thinks you are in ${locationData.country_name}...`;
  } else if (step === 1) {
    document.getElementById(
      "result"
    ).textContent = `Whiskers narrowing it down to ${locationData.region}...`;
  } else if (step === 2) {
    document.getElementById("result").textContent =
      "Whiskers almost certain now...";
  } else if (step === 3) {
    document.getElementById(
      "result"
    ).textContent = `Final answer: ${locationData.city}, ${locationData.region}, ${locationData.country_name} 😼`;
    showFeedback();
    return;
  }

  step++;
  setTimeout(loadStep, 800);
}

// Feedback
function showFeedback() {
  document.getElementById("feedback").style.display = "block";
}

function submitFeedback(correct) {
  document.getElementById("feedbackResponse").textContent = correct
    ? "Thanks for confirming! Whiskers is happy 😸"
    : "Thanks for your honesty! Whiskers will try harder 😿";
}

// Privacy Modal
document.getElementById("acceptPrivacy").addEventListener("click", () => {
  document.getElementById("privacyModal").style.display = "none";
  loadStep(); // Start the cat quiz only after they accept
});
