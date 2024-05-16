import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Watchlist from "../components/watchlist/watchlist";
import { AuthContext } from "../context/AuthContext";

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchWatchlistData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api", {
          headers: { Authorization: `Bearer ${token}` },
        });

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
        console.error("Error fetching watchlist data:", error);
      }
    };

    fetchWatchlistData();
  }, [token]);

  return (
    <div>
      {/* {watchlist && watchlist.length > 0 ? (
        <Watchlist data={watchlist} />
      ) : (
        <p>Loading watchlist data...</p>
      )} */}
      <Watchlist data={watchlist} />
    </div>
  );
};

export default WatchlistPage;
