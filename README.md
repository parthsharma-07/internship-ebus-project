# Ebus Management Based Current Location System

This project is an intelligent transportation system designed to provide real-time location tracking for public buses, aiming to reduce passenger wait times and improve satisfaction, as per the requirements of the Unified Mentor program.

---

## 🚀 Features

*   **Real-Time Location Tracking:** Users can see the live location of all active buses on an interactive map.
*   **Role-Based User Authentication:** A secure login and registration system that differentiates between three roles: User, Driver, and Admin.
*   **User/Passenger Module:**
    *   Can register and log in.
    *   Automatically redirected to the map dashboard.
    *   Can view bus details (Registration Number, Type, Contact) by clicking on its map marker.
*   **Driver Module:**
    *   Can only be created by an Admin.
    *   Automatically redirected to the driver dashboard after login.
    *   Can save and update their bus information.
    *   Their location is automatically broadcast to the database every 10 seconds.
*   **Admin Module:**
    *   A secure dashboard accessible only to users with the 'admin' role.
    *   Can promote any registered user to the 'driver' role.

---

## 🛠️ Technologies Used

*   **Frontend:** HTML5, CSS3, JavaScript
*   **Backend & Database:** Google Firebase
    *   **Firebase Authentication:** For handling user registration and login.
    *   **Cloud Firestore:** A NoSQL database for storing user roles, bus details, and real-time GPS locations.
*   **Mapping Library:** Leaflet.js (An open-source library for interactive maps)
*   **Deployment:** Firebase Hosting

---

## ⚙️ How to Set Up and Run This Project

To run this project on your local machine, follow these steps:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/YOUR-USERNAME/ebus-management-system.git
    ```
    *(Note: Replace `YOUR-USERNAME` with your actual GitHub username.)*

2.  **Create a Firebase Project:**
    *   Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
    *   In your new project, enable **Authentication** (with the "Email/Password" provider) and **Cloud Firestore** (start in test mode).

3.  **Configure the Project:**
### 3. Configure the Project:
*   In your Firebase project settings, add a new "Web App".
*   Firebase will give you a `firebaseConfig` object. Copy this entire object.
*   In the project code, go to the `js/` folder. You will see a file named `firebase-config.example.js`.
*   Create a **copy** of this file and rename the copy to `firebase-config.js`.
*   Now, open the new `firebase-config.js` and paste your `firebaseConfig` object into it. **This file is ignored by Git and will not be uploaded.**
4.  **Run the Application:**
    *   Open the project folder in a code editor like VS Code.
    *   Use a local server extension (like **Live Server** or **Live Preview**) to run the `index.html` file.
    *   The application will now be running in your browser.