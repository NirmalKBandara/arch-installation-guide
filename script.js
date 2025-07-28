let currentStep = 0;
const totalSteps = 14;
let completedSteps = new Set();

function showOverview() {
    hideAllSteps();
    document.getElementById('overview').classList.add('active');
    updateNavButtons();
    currentStep = 0;
    updateProgressBar();
}

function showStep(stepNumber) {
    hideAllSteps();
    document.getElementById(`step${stepNumber}`).classList.add('active');
    currentStep = stepNumber;
    updateNavButtons();
    updateProgressBar();
    updateStepCounter();
}

function showRemoval() {
    hideAllSteps();
    document.getElementById('removal').classList.add('active');
    updateNavButtons();
    currentStep = 'removal';
    updateProgressBar();
}

function hideAllSteps() {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.classList.remove('active'));
    
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
}

function nextStep() {
    if (currentStep === 0) {
        showStep(1);
    } else if (currentStep < totalSteps) {
        showStep(currentStep + 1);
    }
}

function previousStep() {
    if (currentStep === 1) {
        showOverview();
    } else if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (currentStep === 0 || currentStep === 'removal') {
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    } else if (currentStep === 1) {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        prevBtn.textContent = 'Back to Overview';
        nextBtn.textContent = 'Next Step';
    } else if (currentStep === totalSteps) {
        prevBtn.disabled = false;
        nextBtn.disabled = true;
        prevBtn.textContent = 'Previous Step';
        nextBtn.textContent = 'Completed!';
    } else {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        prevBtn.textContent = 'Previous Step';
        nextBtn.textContent = 'Next Step';
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    let progress = 0;
    
    if (currentStep === 0 || currentStep === 'removal') {
        progress = 0;
    } else {
        progress = (currentStep / totalSteps) * 100;
    }
    
    progressFill.style.width = progress + '%';
}

function updateStepCounter() {
    const stepCounter = document.getElementById('stepCounter');
    if (currentStep === 0) {
        stepCounter.textContent = 'Overview';
    } else if (currentStep === 'removal') {
        stepCounter.textContent = 'Removal Guide';
    } else {
        stepCounter.textContent = `Step ${currentStep} of ${totalSteps}`;
    }
}

function updateProgress() {
    // This function is called when checkboxes are checked
    // You can add logic here to track completion if needed
    const currentStepElement = document.querySelector('.step.active');
    const checkboxes = currentStepElement.querySelectorAll('input[type="checkbox"]');
    const checkedBoxes = currentStepElement.querySelectorAll('input[type="checkbox"]:checked');
    
    // Add visual feedback or enable next button based on completion
    if (checkboxes.length > 0 && checkedBoxes.length === checkboxes.length) {
        completedSteps.add(currentStep);
        // Could add visual indication of completion here
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' && !document.getElementById('prevBtn').disabled) {
        previousStep();
    } else if (e.key === 'ArrowRight' && !document.getElementById('nextBtn').disabled) {
        nextStep();
    }
});

// Initialize
updateNavButtons();
updateProgressBar();
updateStepCounter();

// Add smooth scroll behavior for better UX
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});