
let currentSlideNo = 0;
let slides = [];

// Get HTML elements
let textArea = document.getElementById('editor');
let btnLeft = document.getElementById('btn-left');
let btnRight = document.getElementById('btn-right');
let btnFullscreen = document.getElementById('btn-fullscreen');
let btnSave = document.getElementById('btn-save');
let btnPresent = document.getElementById('btn-present');
let presentationScreen = document.getElementById('presentation-screen');
let presentationSlide = document.getElementById('presentation-slide');
let presentLeft = document.getElementById('present-left');
let presentRight = document.getElementById('present-right');
let presentFullscreen = document.getElementById('present-fullscreen');
let btnExitPresent = document.getElementById('btn-exit-present');

// Load saved slides
function loadFromLocalStorage() {
    let data = localStorage.getItem('slides');

    if (data !== null) {
        textArea.value = data;
    }
    slides = textArea.value.split(/^[ \t]*---[ \t]*$/m);
    renderContent();
    updateCounter();
    updateButtons();
}

window.addEventListener('load', loadFromLocalStorage);
// Show the current slide
function renderContent() {
    let text = slides[currentSlideNo] || '';
    let lines = text.split('\n');
    let html = '';

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line.startsWith('## ')) {
            html += '<h2>' + line.substring(3) + '</h2>';
        }
        else if (line.startsWith('# ')) {
            html += '<h1>' + line.substring(2) + '</h1>';
        }
        else if (line.startsWith('- ')) {
            html += '<p>•' + line.substring(2) + '</p>';
        }
        else {
            html += '<p>' + line + '</p>';
        }
    }

    document.getElementById('preview').innerHTML = html;
    presentationSlide.innerHTML = html;
}

// Update slide numbers
function updateCounter() {
    document.getElementById('current-slide').textContent = currentSlideNo + 1;
    document.getElementById('total-slides').textContent = slides.length;
    document.getElementById('present-current-slide').textContent = currentSlideNo + 1;
    document.getElementById('present-total-slides').textContent = slides.length;
}

// Enable and disable buttons
function updateButtons() {
    btnLeft.disabled = currentSlideNo === 0;
    btnRight.disabled = currentSlideNo === slides.length - 1;
    presentLeft.disabled = currentSlideNo === 0;
    presentRight.disabled = currentSlideNo === slides.length - 1;
}

// Update preview and save changes
textArea.addEventListener('input', function () {
    slides = textArea.value.split(/^[\t]*---[\t]*$/m);
    currentSlideNo = 0;
    localStorage.setItem('slides', textArea.value);
    renderContent();
    updateCounter();
    updateButtons();
});

// Go to the previous slide
btnLeft.addEventListener('click', function () {
    if (currentSlideNo > 0) {
        currentSlideNo--;
        renderContent();
        updateCounter();
        updateButtons();
    }
});

// Go to the next slide
btnRight.addEventListener('click', function () {
    if (currentSlideNo < slides.length - 1) {
        currentSlideNo++;
        renderContent();
        updateCounter();
        updateButtons();
    }
});

// Save slides
btnSave.addEventListener('click', function () {
    localStorage.setItem('slides', textArea.value);
    alert('Slides saved!');
});

// Open presentation screen
btnPresent.addEventListener('click', function () {
    document.querySelector('.main-container').hidden = true;
    presentationScreen.hidden = false;

    renderContent();
});

// Return to editor
btnExitPresent.addEventListener('click', function () {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    presentationScreen.hidden = true;
    document.querySelector('.main-container').hidden = false;
});

// Previous slide in presentation
presentLeft.addEventListener('click', function () {
    btnLeft.click();
});

// Next slide in presentation
presentRight.addEventListener('click', function () {
    btnRight.click();
});

// Fullscreen for preview
btnFullscreen.addEventListener('click', function () {
    let preview = document.querySelector('.preview-container');

    if (document.fullscreenElement === preview) {
        document.exitFullscreen();
    }
    else if (!document.fullscreenElement) {
        preview.requestFullscreen();
    }
});

// Fullscreen for presentation
presentFullscreen.addEventListener('click', function () {
    if (document.fullscreenElement === presentationScreen) {
        document.exitFullscreen();
    }
    else if (!document.fullscreenElement) {
        presentationScreen.requestFullscreen();
    }
});

// Change fullscreen button text
document.addEventListener('fullscreenchange', function () {
    btnFullscreen.textContent =
        document.fullscreenElement ===
        document.querySelector('.preview-container')
        ? 'Exit Fullscreen' : 'Fullscreen';

    presentFullscreen.textContent =
        document.fullscreenElement === presentationScreen
        ? 'Exit Fullscreen' : 'Fullscreen';
});

// Keyboard controls
document.addEventListener('keydown', function (event) {
    if (document.activeElement === textArea &&
        (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        return;
    }
    if (event.key === 'ArrowLeft') {
        btnLeft.click();
    }
    else if (event.key === 'ArrowRight') {
        btnRight.click();
    }
    else if (event.ctrlKey && event.key.toLowerCase() === 's') {
        event.preventDefault();
        btnSave.click();
    }
    else if (event.key === 'F11') {
        event.preventDefault();
        
        if (!presentationScreen.hidden) {
            presentFullscreen.click();
        }
        else {
            btnFullscreen.click();
        }
    }
});
