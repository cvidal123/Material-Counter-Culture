// Global State
let exhibitionData = [];
let currentRoom = null;
let expandedArtifact = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadExhibitionData();
    initializeEventListeners();
});

// Load exhibition data
async function loadExhibitionData() {
    try {
        const response = await fetch('data/exhibition.json');
        exhibitionData = await response.json();
        displayRooms();
    } catch (error) {
        console.error('Error loading exhibition data:', error);
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Entrance click to scroll
    document.querySelector('.entrance').addEventListener('click', (e) => {
        // Scroll to rooms section
        document.querySelector('.rooms-section').scrollIntoView({ behavior: 'smooth' });
    });

    // Back to home button
    document.getElementById('backToHome').addEventListener('click', () => {
        goHome();
    });

    // Keyboard - ESC to close expanded view
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && expandedArtifact) {
            closeExpandedView();
        }
    });

    // Close expanded view when clicking outside
    document.getElementById('expandedView').addEventListener('click', (e) => {
        if (e.target === document.getElementById('expandedView')) {
            closeExpandedView();
        }
    });
}

// Display rooms on homepage
function displayRooms() {
    const roomsList = document.getElementById('roomsList');
    roomsList.innerHTML = '';

    exhibitionData.forEach((room, index) => {
        const card = document.createElement('div');
        card.className = 'room-card';
        card.innerHTML = `
            <h4>${room.title}</h4>
            <p>${room.description}</p>
        `;
        card.addEventListener('click', () => enterRoom(index));
        roomsList.appendChild(card);
    });
}

// Enter a room
function enterRoom(roomIndex) {
    currentRoom = exhibitionData[roomIndex];
    expandedArtifact = null;

    // Update page
    document.getElementById('roomTitle').textContent = currentRoom.title;
    document.getElementById('roomDescription').textContent = currentRoom.description;

    // Display artifacts
    displayArtifacts();

    // Create room navigation
    displayRoomNavigation(roomIndex);

    // Switch page
    document.getElementById('homepage').classList.remove('active');
    document.getElementById('roomPage').classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

// Display artifacts in grid
function displayArtifacts() {
    const grid = document.getElementById('artifactGrid');
    grid.innerHTML = '';
    grid.classList.remove('has-expanded');

    currentRoom.artifacts.forEach((artifact, index) => {
        const item = document.createElement('div');
        item.className = 'artifact-item';
        item.dataset.index = index;
        item.innerHTML = `
            <img src="${artifact.image}" alt="${artifact.title}">
            <div class="artifact-label">
                <strong>${artifact.title}</strong>
                <small>${artifact.year}</small>
            </div>
        `;
        item.addEventListener('click', () => expandArtifact(index));
        grid.appendChild(item);
    });
}

// Expand artifact
function expandArtifact(artifactIndex) {
    expandedArtifact = currentRoom.artifacts[artifactIndex];

    // Update expanded view
    document.getElementById('expandedImage').src = expandedArtifact.image;
    document.getElementById('expandedTitle').textContent = expandedArtifact.title;
    document.getElementById('expandedYear').textContent = expandedArtifact.year;
    document.getElementById('expandedMaker').textContent = expandedArtifact.maker || 'Unknown';
    document.getElementById('expandedCategory').textContent = expandedArtifact.category || 'Uncategorized';
    document.getElementById('expandedMaterials').textContent = 
        (expandedArtifact.materials && expandedArtifact.materials.length > 0) 
            ? expandedArtifact.materials.join(', ') 
            : 'Not specified';
    document.getElementById('expandedDescription').textContent = expandedArtifact.description || 'No description available';

    // Show expanded view
    const expandedView = document.getElementById('expandedView');
    expandedView.classList.add('active');

    // Make other artifacts smaller
    const grid = document.getElementById('artifactGrid');
    grid.classList.add('has-expanded');

    document.querySelectorAll('.artifact-item').forEach((item, index) => {
        if (index !== artifactIndex) {
            item.classList.add('small');
        }
    });
}

// Close expanded view
function closeExpandedView() {
    expandedArtifact = null;

    // Hide expanded view
    document.getElementById('expandedView').classList.remove('active');

    // Restore grid
    const grid = document.getElementById('artifactGrid');
    grid.classList.remove('has-expanded');

    document.querySelectorAll('.artifact-item').forEach((item) => {
        item.classList.remove('small');
    });
}

// Display room navigation
function displayRoomNavigation(currentIndex) {
    const nav = document.getElementById('roomNav');
    nav.innerHTML = '';

    exhibitionData.forEach((room, index) => {
        if (index !== currentIndex) {
            const btn = document.createElement('button');
            btn.className = 'btn btn-room';
            btn.textContent = `→ ${room.title}`;
            btn.addEventListener('click', () => enterRoom(index));
            nav.appendChild(btn);
        }
    });
}

// Go home
function goHome() {
    expandedArtifact = null;
    currentRoom = null;

    // Hide expanded view
    document.getElementById('expandedView').classList.remove('active');

    // Reset artifact grid
    const grid = document.getElementById('artifactGrid');
    grid.classList.remove('has-expanded');

    // Switch page
    document.getElementById('roomPage').classList.remove('active');
    document.getElementById('homepage').classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}