# iShop Project

## Overview

iShop is an e-commerce web application built using React, Redux Toolkit, and Firebase. It allows users to browse products, manage their carts, and make secure transactions.

## Features
- User authentication with Firebase
- Product listing and filtering
- Shopping cart management
- Secure checkout process
- Responsive UI with Bootstrap
- Form validation using Formik and Yup
- Toast notifications with React Hot Toast

## Tech Stack
- **Frontend**: React, Redux Toolkit, React Router, Bootstrap
- **Backend**: Hosted on Render (proxy: `https://i-shop-server.onrender.com`)
- **Authentication**: Firebase
- **State Management**: Redux Toolkit
- **Form Handling**: Formik & Yup
- **HTTP Requests**: Axios
- **Environment Variables**: Dotenv

## Installation

### Prerequisites
- Node.js (latest LTS version recommended)
- npm or yarn

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/ishop-project.git
   cd ishop-project
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add Firebase API keys:
   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## Build and Deploy
To create a production build:
```sh
npm run build
```

## Running Tests
To run tests:
```sh
npm test
```

## Contributing
Feel free to fork the repository and submit pull requests. Make sure to follow best coding practices.

## License
This project is licensed under the MIT License.

