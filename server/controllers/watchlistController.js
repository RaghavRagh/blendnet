import jwt from "jsonwebtoken";
import { fetchStockData } from "../alphaVantageService.js";
import Watchlist from "../models/watchList.js";
import dotenv from "dotenv";

dotenv.config();

// add watchlist item
const addWatchlistItem = async (req, res) => {
  const { userId, symbol } = req.body;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = extractUserIdFromToken(token);
    const watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      const newWatchlist = new Watchlist({ userId, symbols: [symbol] });
      await newWatchlist.save();
    } else {
      if (!watchlist.symbols.includes(symbol)) {
        watchlist.symbols.push(symbol);
        await watchlist.save();
      }
    }
    res.status(201).json({ message: "Watchlist item added successfully" });
  } catch (error) {
    console.error("Error adding watchlist item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// reomve watchlist item
const removeWatchlistItem = async (req, res) => {
  const { userId, symbol } = req.body;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = extractUserIdFromToken(token);
    const watchlist = await Watchlist.findOne({ userId });
    if (watchlist) {
      watchlist.symbols = watchlist.symbols.filter((s) => s !== symbol);
      await watchlist.save();
      res.json({ message: "Watchlist item removed successfully" });
    } else {
      res.status(404).json({ message: "Watchlist not found" });
    }
  } catch (error) {
    console.error("Error removing watchlist item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get user's watchlist
const getWatchlistWithStockData = async (userId) => {
  try {
    const watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      return null;
    }

    const promises = watchlist.symbols.map(async (symbol) => {
      const stockData = await fetchStockData(symbol);
      return { symbol, data: stockData };
    });

    const watchlistWithStockData = await Promise.all(promises);
    return watchlistWithStockData;
  } catch (error) {
    console.error("Error fetching watchlist with stock data:", error);
    throw error;
  }
};

// extracting userId from the token
const extractUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    return userId;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const getWatchlist = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = extractUserIdFromToken(token);
    const watchlistWithStockData = await getWatchlistWithStockData(userId);
    if (!watchlistWithStockData) {
      return res.status(404).json({ message: "Watchlist not found" });
    }
    res.json({ watchlist: watchlistWithStockData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// update user watchlist
const updateWatchlist = async (req, res) => {
  const { userId, symbols } = req.body;

  try {
    let watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      watchlist = new Watchlist({ userId, symbols });
    } else {
      watchlist.symbols = symbols;
    }
    await watchlist.save();
    res.json({ message: "Watchlist updated successfully" });
  } catch (error) {
    console.error("Error updating watchlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addWatchlistItem, removeWatchlistItem, getWatchlist, updateWatchlist };
