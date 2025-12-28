// Language Management
let currentLanguage = 'no';

function setLanguage(lang) {
    currentLanguage = lang;

    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById('btn-' + lang).classList.add('active');

    // Hide all language elements
    document.querySelectorAll('.lang-no, .lang-en').forEach(el => {
        el.classList.add('hidden');
    });

    // Show selected language elements
    document.querySelectorAll('.lang-' + lang).forEach(el => {
        el.classList.remove('hidden');
    });

    // Save preference
    localStorage.setItem('preferredLanguage', lang);
}

// Load saved language preference
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        setLanguage(savedLang);
    }

    // Initialize checklist if on checkout page
    if (document.querySelector('.checklist-checkbox')) {
        initChecklist();
    }
});

// Checklist Management
function initChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');

    // Load saved state
    loadChecklistState();

    // Add event listeners
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function() {
            saveChecklistState();
            updateProgress();
            checkCompletion();
        });
    });

    // Initial progress update
    updateProgress();
    checkCompletion();
}

function updateProgress() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    const checked = document.querySelectorAll('.checklist-checkbox:checked').length;
    const total = checkboxes.length;
    const percentage = Math.round((checked / total) * 100);

    const progressFill = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');

    if (progressFill && progressText) {
        progressFill.style.width = percentage + '%';
        progressText.textContent = percentage + '%';
    }
}

function checkCompletion() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    const checked = document.querySelectorAll('.checklist-checkbox:checked').length;
    const completionMessage = document.getElementById('completion-message');

    if (completionMessage) {
        if (checked === checkboxes.length && checkboxes.length > 0) {
            completionMessage.classList.add('show');
        } else {
            completionMessage.classList.remove('show');
        }
    }
}

function saveChecklistState() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    const state = Array.from(checkboxes).map(cb => cb.checked);
    localStorage.setItem('checklistState', JSON.stringify(state));
}

function loadChecklistState() {
    const savedState = localStorage.getItem('checklistState');
    if (savedState) {
        const state = JSON.parse(savedState);
        const checkboxes = document.querySelectorAll('.checklist-checkbox');
        checkboxes.forEach((checkbox, index) => {
            if (state[index]) {
                checkbox.checked = true;
            }
        });
    }
}

function resetChecklist() {
    const message = currentLanguage === 'no'
        ? 'Er du sikker på at du vil tilbakestille sjekklisten?'
        : 'Are you sure you want to reset the checklist?';

    if (confirm(message)) {
        const checkboxes = document.querySelectorAll('.checklist-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        localStorage.removeItem('checklistState');
        updateProgress();
        checkCompletion();
    }
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
