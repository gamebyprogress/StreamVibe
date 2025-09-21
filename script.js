// Particles.js configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: ['#ff6b6b', '#4ecdc4', '#45b7d1'] },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true, anim: { enable: false } },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.2, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// FAQ toggle function with debugging
function toggleFAQ(element) {
    console.log('toggleFAQ called for:', element); // Debug
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.icon');
    if (answer && icon) {
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        icon.classList.toggle('fa-plus');
        icon.classList.toggle('fa-minus');
    } else {
        console.error('FAQ answer or icon not found for:', element);
    }
}

// Download modal simulation
function showDownloadModal(event) {
    event.preventDefault();
    console.log('showDownloadModal called'); // Debug
    const modal = document.getElementById('download-modal');
    const progress = document.getElementById('progress');
    if (modal && progress) {
        modal.style.display = 'flex';
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    modal.style.display = 'none';
                    alert('Скачивание завершено! Пароль архива: 3987');
                }, 500);
            } else {
                width += 1;
                progress.style.width = width + '%';
            }
        }, 50);
    } else {
        console.error('Modal or progress bar not found');
    }
}

// Smooth scroll for navigation
function setupSmoothScroll() {
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.error('Target element not found for ID:', targetId);
            }
        });
    });
}

// Sample data for movie rooms
const roomsData = [
    { title: 'Interstellar', viewers: 12, status: 'active' },
    { title: 'Inception', viewers: 8, status: 'active' },
    { title: 'The Dark Knight', viewers: 15, status: 'active' },
    { title: 'Pulp Fiction', viewers: 5, status: 'waiting' },
    { title: 'The Matrix', viewers: 9, status: 'active' },
    { title: 'Fight Club', viewers: 7, status: 'active' }
];

// Update movie rooms list
function updateRoomsList(rooms = roomsData) {
    console.log('updateRoomsList called with:', rooms); // Debug
    const roomsContainer = document.getElementById('movie-rooms');
    if (!roomsContainer) {
        console.error('movie-rooms container not found');
        return;
    }
    roomsContainer.innerHTML = '';
    
    rooms.forEach((room, index) => {
        const roomCard = document.createElement('div');
        roomCard.className = `room-card ${room.status}`;
        
        const img = document.createElement('img');
        img.src = `mimg${index + 1}.jpg`;
        img.alt = room.title;
        
        const title = document.createElement('h4');
        title.textContent = room.title;
        
        const viewers = document.createElement('div');
        viewers.className = 'viewers';
        viewers.textContent = `${room.viewers} зрителей`;
        
        const status = document.createElement('div');
        status.className = 'room-status';
        status.textContent = room.status === 'active' ? 'Сеанс идет' : 'Ожидание';
        
        roomCard.appendChild(img);
        roomCard.appendChild(title);
        roomCard.appendChild(viewers);
        roomCard.appendChild(status);
        
        roomCard.addEventListener('click', () => joinRoom(index));
        roomsContainer.appendChild(roomCard);
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredRooms = roomsData.filter(room => room.title.toLowerCase().includes(searchTerm));
            updateRoomsList(filteredRooms);
        });
    } else {
        console.error('Search input not found');
    }
}

// Room functions
function createRoom() {
    console.log('createRoom called'); // Debug
    const roomId = Math.random().toString(36).substring(2, 10);
    alert(`Комната создана! ID: ${roomId}`);
    joinRoom(roomId);
}

function joinRoom(roomIndex) {
    console.log('joinRoom called for index:', roomIndex); // Debug
    const room = roomsData[roomIndex];
    const roomIdElement = document.getElementById('room-id');
    const videoPlayer = document.getElementById('video-player');
    if (room && roomIdElement && videoPlayer) {
        roomIdElement.textContent = room.title;
        videoPlayer.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
        updateUsersList();
    } else {
        console.error('Room or elements not found for index:', roomIndex);
    }
}

function shareRoom() {
    console.log('shareRoom called'); // Debug
    const roomId = document.getElementById('room-id').textContent;
    const shareText = `Присоединяйся к просмотру ${roomId} на StreamVibe!`;
    navigator.clipboard.writeText(shareText).then(() => {
        alert('Ссылка на комнату скопирована!');
    });
}

function leaveRoom() {
    console.log('leaveRoom called'); // Debug
    const roomIdElement = document.getElementById('room-id');
    const videoPlayer = document.getElementById('video-player');
    const messages = document.getElementById('messages');
    const usersList = document.getElementById('users-list');
    if (roomIdElement && videoPlayer && messages && usersList) {
        roomIdElement.textContent = 'Loading...';
        videoPlayer.src = '';
        messages.innerHTML = '';
        usersList.innerHTML = '';
    } else {
        console.error('Room elements not found');
    }
}

// Chat functionality
function sendMessage() {
    console.log('sendMessage called'); // Debug
    const input = document.getElementById('message-input');
    const messages = document.getElementById('messages');
    if (input && messages) {
        const message = input.value.trim();
        if (message) {
            const li = document.createElement('li');
            li.textContent = `Вы: ${message}`;
            messages.appendChild(li);
            input.value = '';
            messages.scrollTop = messages.scrollHeight;
        }
    } else {
        console.error('Message input or messages container not found');
    }
}

// Sample users list
function updateUsersList() {
    console.log('updateUsersList called'); // Debug
    const usersList = document.getElementById('users-list');
    if (usersList) {
        usersList.innerHTML = '';
        const users = ['Анна (хост)', 'Максим', 'Екатерина'];
        users.forEach(user => {
            const div = document.createElement('div');
            div.className = 'user';
            div.textContent = user;
            usersList.appendChild(div);
        });
    } else {
        console.error('Users list container not found');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired'); // Debug
    updateRoomsList();
    setupSearch();
    setupSmoothScroll();
    document.getElementById('download-btn').addEventListener('click', showDownloadModal);
    document.getElementById('create-room-btn').addEventListener('click', createRoom);
});
