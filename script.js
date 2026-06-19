let currentStep = 0;

function toggleIngredients() {

    const ingredients = document.getElementById("ingredients");

    ingredients.classList.toggle("hidden");
}

function startCooking() {

    const steps = document.querySelectorAll(".step");

    steps.forEach(step => {

        step.classList.remove("active");
    });

    currentStep = 0;

    steps[currentStep].classList.add("active");

    updateProgress();
}

function nextStep() {

    const steps = document.querySelectorAll(".step");

    if (currentStep < steps.length - 1) {

        steps[currentStep].classList.remove("active");

        currentStep++;

        steps[currentStep].classList.add("active");

        updateProgress();
    }
    else {

        updateProgress();

        document.getElementById("party").classList.remove("hidden");
    }
}

function updateProgress() {

    const progress = document.querySelector(".progress");

    const steps = document.querySelectorAll(".step");

    const percentage = ((currentStep + 1) / steps.length) * 100;

    progress.style.width = percentage + "%";

    progress.innerHTML = Math.floor(percentage) + "%";
}