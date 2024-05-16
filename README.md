# blendnet_Assignment

This application allows users to create and manage their own watchlists of stock symbols and view the latest stock values on their watchlist.

## Features

- User registration and authentication
- Get, remove, and update stock symbols on watchlist
- View latest stock values on my watchlist

## Setup Instructions

1. Clone the repository: `git clone <repository_url>`
2. Install dependencies: `npm install`
3. Configure environment variables:
   - I am providing the .env file with environment variables for MongoDB connection, JWT secret, and Alpha Vantage API key. (not putting in .gitignore file for your ease)
   - Create a `.env` file in the root directory if you want to update
4. Start the backend server: `npm run dev`
5. Start the frontend development server: `cd frontend && npm run dev`

## API Endpoints

### Authentication

- **POST /auth/register**:

  - Register a new user.
  - Request Body: `{ "email": "example@example.com", "password": "password123" }`
  - Response: `{ "message": "User registered successfully" }`

- **POST /auth/login**:
  - Login an existing user.
  - Request Body: `{ "email": "example@example.com", "password": "password123" }`
  - Response: `{ "token": "<JWT_TOKEN>" }`

### Watchlist Management

- **POST /api/watchlist/add**:

  - Add a new stock symbol to the user's watchlist.
  - Request Body: `{ "symbol": "AAPL" }`
  - Authorization Header: `Bearer <JWT_TOKEN>`
  - Response: `{ "message": "Symbol added to watchlist successfully" }`

- **DELETE /api/watchlist/remove**:

  - Remove a stock symbol from the user's watchlist.
  - Request Body: `{ "symbol": "AAPL" }`
  - Authorization Header: `Bearer <JWT_TOKEN>`
  - Response: `{ "message": "Symbol removed from watchlist successfully" }`

- **GET /api/watchlist**:
  - Get the user's watchlist with stock data.
  - Authorization Header: `Bearer <JWT_TOKEN>`
  - Response: `{ "watchlist": [{ "symbol": "AAPL", "data": { ... } }] }`

## Frontend Integration

To integrate the frontend with the backend:

- Update the API endpoint URLs in the frontend code to match your backend server's URL.
- Set up authentication using JWT tokens. Store the token in local storage after successful login and include it in the Authorization header for protected routes.

## Deployment

To deploy the application to a production environment:

1. Build the frontend: `cd frontend && npm run build`
2. Set up a production server (e.g., Heroku, AWS, etc.).
3. Configure environment variables for production.
4. Deploy the backend and frontend to the production server.
