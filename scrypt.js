// Particles.js configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: ['#ff6b6b', '#4ecdc4', '#45b7d1'] },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: { 
            enable: true, 
            distance: 150, 
            color: '#ff6b6b', 
            opacity: 0.2, 
            width: 1 
        },
        move: { enable: true, speed: 2, direction: 'none', random: true }
    },
    interactivity: { 
        detect_on: 'canvas', 
        events: { 
            onhover: { enable: true, mode: 'grab' }, 
            onclick: { enable: true, mode: 'push' } 
        } 
    },
    retina_detect: true
});

// Room data
const roomsData = [
    { title: 'Interstellar', viewers: 12, status: 'active', video: 'https://www.youtube.com/embed/zSWdZVtXT7E' },
    { title: 'Inception', viewers: 8, status: 'active', video: 'https://www.youtube.com/embed/YoHD9XEInc0' },
    { title: 'The Dark Knight', viewers: 15, status: 'active', video: 'https://www.youtube.com/embed/EXeTwQWrcwY' },
    { title: 'Pulp Fiction', viewers: 5, status: 'waiting', video: 'https://www.youtube.com/embed/s7EdQ4FqBHU' },
    { title: 'The Matrix', viewers: 9, status: 'active', video: 'https://www.youtube.com/embed/vKQi3bBA1y8' },
    { title: 'Fight Club', viewers: 7, status: 'active', video: 'https://www.youtube.com/embed/Sux_wAhCR9U' }
];

let messages = [];
let currentRoomId = null;
let messageInterval = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Load rooms
    updateRoomsList();
    
    // Search functionality
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        const filteredRooms = roomsData.filter(room => 
            room.title.toLowerCase().includes(query)
        );
        updateRoomsList(filteredRooms);
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature, .step').forEach(el => {
        observer.observe(el);
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validateForm();
    });
});

// Update rooms list
function updateRoomsList(rooms = roomsData) {
    const roomsContainer = document.getElementById('movie-rooms');
    roomsContainer.innerHTML = '';
    
    rooms.forEach((room, index) => {
        const roomCard = document.createElement('div');
        roomCard.className = `room-card ${room.status}`;
        roomCard.innerHTML = `
            <img src="https://via.placeholder.com/300x180/${room.status === 'active' ? '4ecdc4' : 'ff6b6b'}/ffffff?text=${encodeURIComponent(room.title)}" alt="${room.title}">
            <h4>${room.title}</h4>
            <div class="viewers">${room.viewers} зрителей</div>
            <div class="room-status">${room.status === 'active' ? 'Сеанс идет' : 'Ожидание'}</div>
        `;
        roomCard.addEventListener('click', () => joinRoom(index));
        roomsContainer.appendChild(roomCard);
    });
}

// Toggle FAQ
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = element.nextElementSibling;
    const isActive = faqItem.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const ans = item.querySelector('.faq-answer');
        ans.style.maxHeight = null;
    });
    
    if (!isActive) {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    }
}

// Form validation
function validateForm() {
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const message = document.getElementById('contact-message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    let isValid = true;
    
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    messageError.style.display = 'none';
    
    if (!name.value.trim()) {
        nameError.textContent = 'Пожалуйста, введите ваше имя';
        nameError.style.display = 'block';
        isValid = false;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        emailError.textContent = 'Пожалуйста, введите корректный email';
        emailError.style.display = 'block';
        isValid = false;
    }
    
    if (!message.value.trim()) {
        messageError.textContent = 'Пожалуйста, введите сообщение';
        messageError.style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        alert('Сообщение отправлено!');
        document.querySelector('.contact-form').reset();
    }
}

// Download modal
function showDownloadModal(event) {
    event.preventDefault();
    const modal = document.getElementById('download-modal');
    const progress = document
