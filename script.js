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
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature, .step, .testimonial').forEach(el => {
        observer.observe(el);
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateContactForm()) {
            alert('Спасибо! Ваше сообщение отправлено. Мы ответим в течение 24 часов.');
            contactForm.reset();
            // Hide error messages
            document.querySelectorAll('.error').forEach(el => el.style.display = 'none');
        }
    });

    // Chat enter key support
    document.getElementById('message-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Check URL params for room
    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get('room');
    if (roomParam) {
        // Simulate joining room from URL
        setTimeout(() => {
            joinRoomFromUrl(roomParam);
        }, 500);
    }
});

// Update rooms display
function updateRoomsList(filteredRooms = roomsData) {
    const container = document.getElementById('movie-rooms');
    if (filteredRooms.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>Комнаты не найдены</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Попробуйте изменить запрос поиска</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredRooms.map(room => `
        <article class="room-card ${room.status}" 
                 onclick="joinRoom('${room.video}', '${room.title}')" 
                 tabindex="0" 
                 role="button" 
                 aria-label="Присоединиться к комнате ${room.title}">
            <img src="https://via.placeholder.com/300x180/${room.status === 'active' ? '4ecdc4' : 'ff6b6b'}/ffffff?text=${encodeURIComponent(room.title)}" 
                 alt="Постер ${room.title}" 
                 loading="lazy">
            <h4>${room.title}</h4>
