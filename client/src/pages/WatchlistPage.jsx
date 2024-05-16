import { useState, useEffect } from "react";
import axios from "axios";
import Watchlist from "../components/watchlist/watchlist";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [newSymbol, setNewSymbol] = useState("");
  const [status, setStatus] = useState(200);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlistData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 404) {
          setStatus(404);
        }

        const watchlistData = response.data.watchlist.map((item) => {
          const symbol = item.symbol;
          const metaData = item.data["Meta Data"];
          const timeSeries = item.data["Time Series (5min)"];
          const latestTime = Object.keys(timeSeries)[0];
          const latestData = timeSeries[latestTime];

          return {
            symbol,
            lastRefreshed: metaData["3. Last Refreshed"],
            latestTime,
            latestData,
          };
        });

        setWatchlist(watchlistData);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          navigate("/login");
        } else {
          console.error("Error fetching watchlist data:", error);
        }
      }
    };

    fetchWatchlistData();
  }, [navigate]);

  const handleAddSymbol = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }

      const response = await axios.post(
        "http://localhost:3000/api/add",
        { symbol: newSymbol },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        const addedSymbol = response.data.symbolData;
        setWatchlist((prevWatchlist) => [[...prevWatchlist, addedSymbol]]);
        setNewSymbol("");
      }
    } catch (error) {
      console.error("Error adding symbol", error);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="watchlistContainer">
      <div className="watchlistHeader">
        <div className="myWatchlist">
          <Typography variant="h4" my={2} mx={1} sx={{ fontWeight: "bold" }}>
            My Watchlist
          </Typography>
          <Button onClick={logout} variant="contained" color="secondary">
            Logout
          </Button>
        </div>
        <div className="wGroup">
          <TextField
            id="outlined-basic"
            label="Add"
            variant="outlined"
            size="small"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
          />
          <Button variant={"contained"} size="medium" onClick={handleAddSymbol}>
            <AddIcon />
          </Button>
        </div>
      </div>

      {/* {watchlist && watchlist.length === 0 && <p>No watchlist found</p>} */}

      {watchlist && watchlist.length > 0 ? (
        <Watchlist data={watchlist} />
      ) : (
        status !== 404 && <p>Loading watchlist data...</p>
      )}
      
      {/* <Watchlist data={watchlist} /> */}
    </div>
  );
};

export default WatchlistPage;
