// js/driver.js

const auth = firebase.auth();
const db = firebase.firestore();

// Check if a user is logged in
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("Driver is logged in:", user.uid);
        
        // Start updating the location every 10 seconds
        setInterval(updateBusLocation, 10000); 

    } else {
        // If no user is logged in, redirect to the login page
        console.log("No driver logged in, redirecting...");
        window.location.href = "index.html";
    }
});

function updateBusLocation() {
    // Check if the browser supports Geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const busId = auth.currentUser.uid; // Use the driver's unique ID as the Bus ID

            console.log(`Updating location for Bus ID ${busId}: ${lat}, ${lng}`);

            // Send the data to Firestore
            db.collection('buses').doc(busId).set({
                // Use a GeoPoint for efficient location queries in Firestore
                location: new firebase.firestore.GeoPoint(lat, lng),
                lastUpdate: firebase.firestore.FieldValue.serverTimestamp() // Record the time
            })
            .then(() => {
                console.log("Location successfully updated!");
            })
            .catch(error => {
                writeLog('Error: Location update failed.', { driverId: busId, error: error.message }); // ADD THIS LINE
                console.error("Error writing document: ", error);
            });

        }, () => {
            alert('Could not get your location. Please enable location services in your browser.');
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Logout functionality
document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    });
});