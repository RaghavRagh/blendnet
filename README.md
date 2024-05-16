# blendnet_Assignment

# API Endpoints
Authentication
POST /auth/register: Register a new user.

Request Body: { "email": "example@example.com", "password": "password123" }
Response: { "message": "User registered successfully" }
POST /auth/login: Login an existing user.

Request Body: { "email": "example@example.com", "password": "password123" }
Response: { "token": "<JWT_TOKEN>" }
Watchlist Management
POST /api/watchlist/add: Add a new stock symbol to the user's watchlist.

Request Body: { "symbol": "AAPL" }
Authorization Header: Bearer <JWT_TOKEN>
Response: { "message": "Symbol added to watchlist successfully" }
DELETE /api/watchlist/remove: Remove a stock symbol from the user's watchlist.

Request Body: { "symbol": "AAPL" }
Authorization Header: Bearer <JWT_TOKEN>
Response: { "message": "Symbol removed from watchlist successfully" }
GET /api/watchlist: Get the user's watchlist with stock data.

Authorization Header: Bearer <JWT_TOKEN>
Response: { "watchlist": [{ "symbol": "AAPL", "data": { ... } }] }
