
# 📦 Tickitz Backend  

This is API services that created with **Express.js, TypeScript, and Sequelize**

---

## ✨ Features
- ⚡ [**Express.js**](https://expressjs.com/) as the backend framework
- 📋 [**Swagger**](https://swagger.io/docs/) for API documentations
- 🛠 [**Typescript**](https://www.typescriptlang.org/docs/) for strong type support
- 📄 **Linting** with [**ESlint**](https://eslint.org/docs/latest/) and [**Prettier**](https://prettier.io/docs/en/)

---

## 🚀 Prerequisite

Make sure you have installed the following tools:

- **Node.js** >= v18.x.x  
- **npm**

---

## 📥 Installation

1. Clone repository:

   ```bash
   git clone https://github.com/pius706975/
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create `.env.development` to store the environment configuration:

   ```bash
   .env.development
   ```

4. Fill the `.env.development` file based on your requirements:

   ```
   PORT = 
   NODE_ENV = 
   BASE_URL = 

   DB_PORT = 
   DB_USERNAME = 
   DB_PASSWORD = 
   DB_NAME = 
   DB_HOST = 
   DB_DIALECT = 

   JWT_ACCESS_TOKEN_SECRET = 
   JWT_REFRESH_TOKEN_SECRET = 

   FIREBASE_API_KEY = 
   FIREBASE_AUTH_DOMAIN = 
   FIREBASE_PROJECT_ID = 
   FIREBASE_STORAGE_BUCKET = 
   FIREBASE_MESSAGING_SENDER_ID = 
   FIREBASE_APP_ID = 

   FIREBASE_TYPE = 
   FIREBASE_PRIVATE_KEY_ID = 
   FIREBASE_PRIVATE_KEY = 
   FIREBASE_CLIENT_EMAIL = 
   FIREBASE_CLIENT_ID = 
   FIREBASE_AUTH_URI = 
   FIREBASE_TOKEN_URI = 
   FIREBASE_AUTH_PROVIDER_CERT_URL = 
   FIREBASE_CLIENT_CERT_URL = 
   FIREBASE_UNIVERSE_DOMAIN = 
   ```

## 🏃 Run the server

Run the server in the development mode:

```bash
npm run dev
```

Or in the production mode

```bash
npm start
```

---

## 🛠 Additional

- **Linting and code formatting:**

  ```bash
  npm run lint      # Linting check
  npm run lint:fix  # Formatting code with prettier
  ```

- **Creating DB table:**

  ```bash
  npm run migration:generate --name "create-table-name"
  ```
---

## 📚 API Documentation

Access swagger documentations: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

Swagger will automatically return the documentations based on route file annotation.

---

## 📂 Project structure

Let's have a look at this structure:

```
├── /node_modules
├── /src                 
│   ├── /config          # Base configuration such as .env key and sequelize-cli configuration
│   ├── /database
│   │   ├── /migrations  # DB migration files to migrate our DB tables
│   │   └── /models      # DB model files that will be used in the development
│   ├── /docs            # Swagger documentations
│   ├── /interfaces      # Interfaces
│   ├── /logs            # Access logs
│   ├── /middleware      # App middlewares
│   ├── /modules         # App modules
│   │   ├── /auth        #    
│   │   ├── /user        # These module directories will store repo, service, controller, routes, and validator files.
│   │   └── /etc         #
│   ├── /routes          # Main route file that store all of the module routes 
│   ├── /types           # typescript support
│   ├── /utils           # Utils
│   └── server.js        # Entry point of the app
├── .env.local           # Development environment variables
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

---

## 🔗 The example of API Request

**POST** a request to `/api/example`:

```bash
curl --request POST   --url http://localhost:5000/api/auth/signup
```

Response:

```json
{
    "message": "Successfully signed up"
}
```

---

## 👨‍💻 Contributor

- Pius Restiantoro - [GitHub](https://github.com/pius706975)
