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

// FAQ toggle function
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.icon');
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    icon.classList.toggle('fa-plus');
    icon.classList.toggle('fa-minus');
}

// Download modal simulation
function showDownloadModal(event) {
    event.preventDefault();
    const modal = document.getElementById('download-modal');
    const progress = document.getElementById('progress');
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
    const roomsContainer = document.getElementById('movie-rooms');
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
document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredRooms = roomsData.filter(room => room.title.toLowerCase().includes(searchTerm));
    updateRoomsList(filteredRooms);
});

// Room functions
function createRoom() {
    const roomId = Math.random().toString(36).substring(2, 10);
    alert(`Комната создана! ID: ${roomId}`);
    joinRoom(roomId);
}

function joinRoom(roomIndex) {
    const room = roomsData[roomIndex];
    document.getElementById('room-id').textContent = room.title;
    document.getElementById('video-player').src = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    updateUsersList();
}

function shareRoom() {
    const roomId = document.getElementById('room-id').textContent;
    const shareText = `Присоединяйся к просмотру ${roomId} на StreamVibe!`;
    navigator.clipboard.writeText(shareText).then(() => {
        alert('Ссылка на комнату скопирована!');
    });
}

function leaveRoom() {
    document.getElementById('room-id').textContent = 'Loading...';
    document.getElementById('video-player').src = '';
    document.getElementById('messages').innerHTML = '';
    document.getElementById('users-list').innerHTML = '';
}

// Chat functionality
function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    if (message) {
        const messages = document.getElementById('messages');
        const li = document.createElement('li');
        li.textContent = `Вы: ${message}`;
        messages.appendChild(li);
        input.value = '';
        messages.scrollTop = messages.scrollHeight;
    }
}

// Sample users list
function updateUsersList() {
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = '';
    const users = ['Анна (хост)', 'Максим', 'Екатерина'];
    users.forEach(user => {
        const div = document.createElement('div');
        div.className = 'user';
        div.textContent = user;
        usersList.appendChild(div);
    });
}

// Initialize rooms and event listeners on page load
document.addEventListener('DOMContentLoaded', () => {
    updateRoomsList();
    document.getElementById('download-btn').addEventListener('click', showDownloadModal);
});
