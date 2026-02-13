// Anniversary Date: March 29, 2022
const anniversary = new Date('2022-03-29T00:00:00');

// Music Logic
const musicBtn = document.getElementById('music-btn');
const audio = document.getElementById('bg-music');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Try to play automatically on load
window.addEventListener('load', () => {
    audio.play().then(() => {
        isPlaying = true;
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(error => {
        console.log("Autoplay blocked by browser. Waiting for interaction.");
        document.body.addEventListener('click', playOnFirstClick, { once: true });
    });
});

function playOnFirstClick() {
    audio.play();
    isPlaying = true;
    musicBtn.classList.add('playing');
    musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function updateCountdown() {
    const now = new Date();
    const diff = now - anniversary;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Scroll Animation for Timeline
const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.5 });

timelineItems.forEach(item => {
    observer.observe(item);
});





// --- LDR Map Logic ---
const myCoords = [13.064222437967713, 80.22334894234382]; // You
const gfCoords = [13.007388058898194, 77.69589338039606]; // GF

const map = L.map('map').setView(myCoords, 7);

// Standard OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Custom Marker (SVG for Reliability)


// Custom Marker (Inline SVG - Most Reliable Method)
// Custom Marker (Emoji - 100% Fail-Safe)
const heartIcon = L.divIcon({
    className: 'custom-heart-marker',
    html: '<div style="font-size: 48px; line-height: 48px; text-shadow: 0 2px 2px rgba(0,0,0,0.2);">❤️</div>',
    iconSize: [48, 48],
    iconAnchor: [24, 48], // Center, Bottom
    popupAnchor: [0, -50]
});

// Markers
L.marker(myCoords, { icon: heartIcon }).addTo(map).bindPopup("<b>Jagadeesh</b><br>Thinking of you!").openPopup();
L.marker(gfCoords, { icon: heartIcon }).addTo(map).bindPopup("<b>Divyadharshini</b><br>My Heart is here!");

// Connecting Line
const latlngs = [myCoords, gfCoords];
const polyline = L.polyline(latlngs, {
    color: '#c9184a',
    weight: 4,
    opacity: 0.7,
    dashArray: '10, 10',
    lineCap: 'round',
    className: 'heartbeat-line'
}).addTo(map);

map.fitBounds(polyline.getBounds(), { padding: [50, 50] });

// Create Background Floating Hearts
function createFloatingHearts() {
    const container = document.querySelector('.hearts-container');
    const heartCount = 20;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 3 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';

        container.appendChild(heart);
    }
}

createFloatingHearts();

// --- Extended Quiz Logic ---
const totalQuestions = 6;
let currentQuestion = 1;

function updateProgress() {
    // Current is 1 out of 6. Progress width = (current - 1) / total * 100? No, let's say step 1 is done when we move to 2.
    // Let's show progress AS we are on the question.
    const progress = ((currentQuestion - 1) / totalQuestions) * 100;
    document.getElementById('quiz-progress').style.width = progress + '%';
}

function nextQuestion(questionNumber) {
    // Hide current
    document.getElementById('q' + questionNumber).classList.remove('active');

    // Show next
    const nextQ = questionNumber + 1;
    if (nextQ <= totalQuestions) {
        document.getElementById('q' + nextQ).classList.add('active');
        currentQuestion = nextQ;
        updateProgress();
    }
}

function handleNoClick(btn) {
    const messages = [
        "Are you sure? 🥺",
        "Don't break my heart! 💔",
        "Wrong answer! Try again. 😉",
        "I'm gonna cry... 😭",
        "Just say YES already! ❤️",
        "Really? After all this effort? 😂",
        "Think again! 🧐"
    ];

    // Pick a random message
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    showModal(randomMsg);
}

function showModal(message) {
    document.getElementById('modal-text').innerText = message;
    document.getElementById('love-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('love-modal').classList.add('hidden');
}

// Close modal if clicked outside
window.onclick = function (event) {
    const modal = document.getElementById('love-modal');
    if (event.target == modal) {
        closeModal();
    }
}

function showFinalMessage() {
    // Hide default final message logic if replaced by success page
    // document.getElementById('q6').classList.remove('active');
    // document.getElementById('final-msg').classList.remove('hidden');

    // Show Success Page
    document.getElementById('success-page').classList.remove('hidden');
    startConfetti();
}

function startConfetti() {
    const colors = ['#ff4d6d', '#c9184a', '#ff8fa3', '#fff0f3'];

    for (let i = 0; i < 100; i++) {
        const conf = document.createElement('div');
        conf.classList.add('heart');
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.animationDuration = Math.random() * 3 + 2 + 's';
        conf.style.opacity = Math.random();
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        conf.style.width = '10px';
        conf.style.height = '10px';
        conf.style.position = 'fixed';
        conf.style.top = '-10px';
        conf.style.borderRadius = '50%';
        conf.style.zIndex = '1000';

        document.body.appendChild(conf);

        setTimeout(() => {
            conf.remove();
        }, 5000);
    }
}

// Initialize Daily Quote System
// Uses functions from quotes.js
if (typeof getDailyNotification === 'function') {
    // Slight delay to allow page to load visually first
    setTimeout(getDailyNotification, 2000);

    // SECRET TEST TRIGGER: Click the Footer Text to test the notification
    const footerText = document.querySelector('footer p');
    if (footerText) {
        footerText.style.cursor = 'pointer';
        footerText.title = "Click to Test Daily Notification";
        footerText.onclick = () => {
            if (typeof forceDailyNotification === 'function') {
                forceDailyNotification();
            }
        };
    }
}
