// js/user.js

const auth = firebase.auth();
const db = firebase.firestore();

// An object to hold all our bus markers on the map
const busMarkers = {};

// Check if a user is logged in
auth.onAuthStateChanged(user => {
    if (user) {
        initializeMap();
        trackBuses();
    } else {
        window.location.href = "index.html";
    }
});

function initializeMap() {
    // Initialize the map and set its view to a default location and zoom
    const map = L.map('map').setView([34.0522, -118.2437], 13); // Centered on Los Angeles

    // Add a tile layer to the map (the actual map images)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Make the map globally accessible
    window.map = map;
}

function trackBuses() {
    const busesRef = db.collection('buses');

    // Listen for real-time updates from the 'buses' collection
    busesRef.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
            const busId = change.doc.id;
            const busData = change.doc.data();
            const position = [busData.location.latitude, busData.location.longitude];

            if (change.type === 'added' || change.type === 'modified') {
                // If the bus marker already exists, update its position
                if (busMarkers[busId]) {
                    busMarkers[busId].setLatLng(position);
                    console.log(`Updated position for bus ${busId}`);
                } else {
                    // If the marker doesn't exist, create a new one
                    busMarkers[busId] = L.marker(position).addTo(window.map)
                        .bindPopup(`Bus ID: ${busId}`); // Add a popup
                    console.log(`Added marker for bus ${busId}`);
                }
            } else if (change.type === 'removed') {
                // If a bus document is removed, remove its marker from the map
                if (busMarkers[busId]) {
                    window.map.removeLayer(busMarkers[busId]);
                    delete busMarkers[busId];
                }
            }
        });
    });
}

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    });
});