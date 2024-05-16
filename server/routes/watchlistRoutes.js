import express from "express";
import { addWatchlistItem, getWatchlist, removeWatchlistItem, updateWatchlist } from "../controllers/watchlistController.js";

const router = express.Router();

router.post("/add", addWatchlistItem);
router.post('/remove', removeWatchlistItem);
router.get('/', getWatchlist);
router.put('/update', updateWatchlist);

export default router;