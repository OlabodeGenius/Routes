# BodShop - Angular Firebase Authentication Demo

A modern, responsive Angular application demonstrating robust authentication flows using **Firebase Authentication** and **Angular Material**.

![Angular](https://img.shields.io/badge/Angular-20.3.0-DD0031?style=for-the-badge&logo=angular)
![Firebase](https://img.shields.io/badge/Firebase-12.6.0-FFCA28?style=for-the-badge&logo=firebase)
![Angular Material](https://img.shields.io/badge/Material-20.2.12-3F51B5?style=for-the-badge&logo=angular)

## 🚀 Features

*   **🔐 Secure Authentication**: Full Email/Password login and signup flows powered by Firebase Auth.
*   **🛡️ Route Guards**: Protected `/profile` route that redirects unauthenticated users.
*   **👤 User Profile**: Dedicated profile page displaying user information (Email, UID).
*   **🧭 Dynamic Navigation**: Navbar that adapts to authentication state (Login/Signup vs Profile/Logout).
*   **🎨 Modern UI**: Built with Angular Material for a sleek, accessible, and responsive design.
*   **⚡ Reactive Forms**: Robust form handling with validation (required fields, email format, password matching).
*   **🔄 State Management**: Real-time authentication state tracking using `RxJS` observables.

## 🛠️ Tech Stack

*   **Framework**: [Angular v20](https://angular.io/) (Standalone Components)
*   **Backend/Auth**: [Firebase Authentication](https://firebase.google.com/docs/auth)
*   **UI Library**: [Angular Material](https://material.angular.io/)
*   **Styling**: SCSS
*   **Routing**: Angular Router

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
*   **Node.js** (LTS version recommended)
*   **npm** (Node Package Manager)
*   **Angular CLI**: `npm install -g @angular/cli`

## 🏃‍♂️ Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/OlabodeGenius/Route.git
    cd angular-routes
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Firebase Setup**
    *   Create a project in the [Firebase Console](https://console.firebase.google.com/).
    *   Enable **Authentication** and turn on the **Email/Password** sign-in provider.
    *   Get your web app configuration object from Project Settings.
    *   Update `src/environments/environment.ts` with your config:
        ```typescript
        export const environment = {
          firebase: {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID"
          }
        };
        ```

4.  **Run the Application**
    ```bash
    npm start
    ```
    Navigate to `http://localhost:4200/`.

## 📂 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/       # Login page with reactive forms
│   │   ├── signup/      # Signup page with password validation
│   │   ├── profile/     # Protected user profile page
│   │   └── ...
│   ├── guards/
│   │   └── auth.guard.ts # Route guard for protection
│   ├── services/
│   │   └── auth.service.ts # Firebase auth logic
│   ├── shared/
│   │   └── navbar/      # Dynamic navigation bar
│   ├── app.routes.ts    # Application routing config
│   └── app.config.ts    # App configuration & providers
└── environments/        # Firebase configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/OlabodeGenius/Route/issues).

## 📝 License

This project is [MIT](LICENSE) licensed.
