// js/auth.js - NEW AND COMPLETE CODE

const auth = firebase.auth();
const db = firebase.firestore();

// --- Get the HTML elements ---
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');


// --- Register functionality ---
registerBtn.addEventListener('click', () => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // User is created in Authentication, now add them to Firestore
            const user = userCredential.user;
            console.log('User registered in Auth:', user.uid);

            // Create a new document in the 'users' collection with the user's ID
            db.collection('users').doc(user.uid).set({
                email: user.email,
                role: 'user' // Assign the role of 'user' by default
            })
            //...
.then(() => {
    writeLog('New user registered.', { email: user.email }); // ADD THIS LINE
    alert('Registration successful! You can now log in.');
})
//...
            .catch((error) => {
                console.error("Error adding user to Firestore: ", error);
                alert("Registration failed. Please try again.");
            });
        })
        .catch((error) => {
            alert(error.message);
        });
});


// --- Login functionality ---
loginBtn.addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User logged in:', user.uid);

            // Go find this user's document in the 'users' collection
            const userDocRef = db.collection('users').doc(user.uid);
// js/auth.js - Update this section

userDocRef.get().then((doc) => {
    if (doc.exists) {
        const userData = doc.data();
 writeLog('User logged in successfully.', { email: userData.email, role: userData.role }); 

        // Check the role and redirect
        if (userData.role === 'admin') { // <-- ADD THIS BLOCK
            alert('Admin login successful! Redirecting to admin dashboard...');
            window.location.href = 'admin.html';
        } else if (userData.role === 'driver') {
            alert('Driver login successful! Redirecting to driver dashboard...');
            window.location.href = 'driver.html';
        } else if (userData.role === 'user') {
            alert('User login successful! Redirecting to map...');
            window.location.href = 'user.html';
        } else {
            alert('Login successful!');
        }
    } else {
        // ... (rest of the code is the same)                    console.error("No such user document in Firestore!");
                    alert("Login failed: User data not found.");
                }
            }).catch((error) => {
                console.error("Error getting user document:", error);
                alert("Login failed. Please try again.");
            });
        })
        .catch((error) => {
            alert(error.message);
        });
});