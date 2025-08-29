// js/admin.js

const auth = firebase.auth();
const db = firebase.firestore();

// --- Security Check ---
// This is the most important part of the admin page.
// It checks if the currently logged-in user is an admin.
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in. Now check their role.
        db.collection('users').doc(user.uid).get().then(doc => {
            if (doc.exists && doc.data().role === 'admin') {
                // User is an admin. Allow them to stay on the page.
                console.log("Admin access granted.");
            } else {
                // User is not an admin. Kick them out.
                console.log("Access denied. User is not an admin.");
                alert("You do not have permission to view this page.");
                window.location.href = 'index.html';
            }
        });
    } else {
        // No user is signed in. Kick them out.
        console.log("No user signed in. Redirecting.");
        window.location.href = 'index.html';
    }
});


// --- Create Driver Functionality ---
const createDriverBtn = document.getElementById('create-driver-btn');

createDriverBtn.addEventListener('click', () => {
    const email = document.getElementById('driver-email').value;
    const password = document.getElementById('driver-password').value;

    if (!email || !password) {
        alert("Please enter email and password for the new driver.");
        return;
    }

    // This is a tricky part. We can't directly create a user with email/password
    // while we are logged in as admin. We need a more advanced method, but for this
    // "Easy" project, we'll use a simplified workaround. We will create the user document
    // in Firestore first, and instruct the admin on the next step.
    // NOTE: A production app would use Firebase Functions for this.
    
    alert("IMPORTANT: This is a simplified function for this project.\n\nCreating a driver is a 2-step process:\n1. The user must first REGISTER on the main page like a normal user.\n2. You can then enter their email here to PROMOTE them to a driver.");

    const userRef = db.collection('users').where('email', '==', email);

    userRef.get().then(snapshot => {
        if (snapshot.empty) {
            alert('Error: No user found with this email. Please ask them to register first.');
            return;
        }

        let userId;
        snapshot.forEach(doc => {
            userId = doc.id;
        });

        // Now, update the user's role to 'driver'
        db.collection('users').doc(userId).update({
            role: 'driver'
        })
        .then(() => {
             writeLog('Admin promoted user to driver.', { adminId: auth.currentUser.uid, promotedEmail: email });
            alert(`Success! The user ${email} has been promoted to a driver.`);
            document.getElementById('driver-email').value = '';
            document.getElementById('driver-password').value = '';
        })
        .catch(error => {
            console.error("Error promoting user: ", error);
            alert("An error occurred. Could not promote user.");
        });

    });
});


// --- Logout Functionality ---
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = "index.html";
    });
});