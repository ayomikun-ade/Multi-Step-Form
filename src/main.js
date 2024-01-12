document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".step");
  const circleSteps = document.querySelectorAll(".circle");
  let currentStep = 1;
  let currentCircle = 1;

  function showStep(stepNumber) {
    steps.forEach((step) => {
      step.style.display = "none";
    });

    steps[stepNumber - 1].style.display = "flex";
  }

  function updateProgress() {
    circleSteps.forEach((circle, index) => {
      if (index < currentCircle) {
        circle.classList.add("active");
      } else {
        circle.classList.remove("active");
      }
    });
  }

  document.querySelectorAll(".next-step").forEach((nextBtn, index) => {
    nextBtn.addEventListener("click", function () {
      if (currentStep < steps.length) {
        currentStep++;
        currentCircle++;
        showStep(currentStep);
        updateProgress();
      }
    });
  });

  document.querySelectorAll(".prev-step").forEach((prevBtn) => {
    prevBtn.addEventListener("click", function () {
      if (currentStep > 1) {
        currentStep--;
        currentCircle--;
        showStep(currentStep);
        updateProgress();
      }
    });
  });

  // Prevent form submission on "Enter" key press
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
});
