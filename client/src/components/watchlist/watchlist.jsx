import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import "./watchlist.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Watchlist = ({ data }) => {
  const [watchlist, setWatchlist] = useState(data);
  const navigate = useNavigate();

  const handelDeleteSymbol = async (symbol) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      const response = await axios.post(
        "http://localhost:3000/api/remove",
        {
          symbol,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        setWatchlist((prevWatchlist) =>
          prevWatchlist.filter((item) => item.symbol !== symbol)
        );
      }
    } catch (error) {
      console.error("Error deleting symbol", error);
    }
  };

  return (
    <div className="watchlistContainer">
      <Grid container spacing={2} my={4}>
        {data.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="watchlistCard">
              <CardContent>
                <div className="cardTopic">
                  <Typography variant="h5" component="div">
                    {item.symbol}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    style={{
                      maxWidth: "30px",
                      maxHeight: "30px",
                      minWidth: "30px",
                      minHeight: "30px",
                    }}
                    onClick={() => handelDeleteSymbol(item.symbol)}
                  >
                    <ClearIcon fontSize="small" />
                  </Button>
                </div>
                <Typography color="textSecondary" gutterBottom>
                  Last Refreshed: {item.lastRefreshed}
                </Typography>
                <Typography variant="body2">
                  Latest Time: {item.latestTime}
                </Typography>
                <Typography variant="body2">
                  Open: {item.latestData["1. open"]}
                </Typography>
                <Typography variant="body2">
                  High: {item.latestData["2. high"]}
                </Typography>
                <Typography variant="body2">
                  Low: {item.latestData["3. low"]}
                </Typography>
                <Typography variant="body2">
                  Close: {item.latestData["4. close"]}
                </Typography>
                <Typography variant="body2">
                  Volume: {item.latestData["5. volume"]}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );

  // I hardcode some data because that alpha vantage api limit is 25 request per day :/

  // return (
  //   <div className="watchlistContainer">
  //     <Grid container spacing={2} my={4}>
  //       <Grid item xs={12} sm={6} md={3}>
  //         <Card className="watchlistCard" style={{ borderRadius: 15 }}>
  //           <CardContent>
  //             <div className="cardTopic">
  //               <Typography variant="h5" component="div" mb={1}>
  //                 AAPL
  //               </Typography>
  //               <Button
  //                 variant="outlined"
  //                 color="error"
  //                 style={{
  //                   maxWidth: "30px",
  //                   maxHeight: "30px",
  //                   minWidth: "30px",
  //                   minHeight: "30px",
  //                 }}
  //                 onClick={handelDeleteSymbol}
  //               >
  //                 <ClearIcon fontSize="small" />
  //               </Button>
  //             </div>
  //             <Typography color="textSecondary" gutterBottom>
  //               Last Refreshed: 2024-05-14 19:55:00
  //             </Typography>
  //             <Typography variant="body2">
  //               Latest Time: 2024-05-14 19:55:00
  //             </Typography>
  //             <Typography variant="body2">Open: 167.4500</Typography>
  //             <Typography variant="body2">High: 167.4500</Typography>
  //             <Typography variant="body2">Low: 167.3800</Typography>
  //             <Typography variant="body2">Close: 167.3800</Typography>
  //             <Typography variant="body2">Volume: 6</Typography>
  //           </CardContent>
  //         </Card>
  //       </Grid>
  //       <Grid item xs={12} sm={6} md={3}>
  //         <Card className="watchlistCard" style={{ borderRadius: 15 }}>
  //           <CardContent>
  //             <div className="cardTopic">
  //               <Typography variant="h5" component="div" mb={1}>
  //                 GOOG
  //               </Typography>
  //               <Button
  //                 variant="outlined"
  //                 color="error"
  //                 style={{
  //                   maxWidth: "30px",
  //                   maxHeight: "30px",
  //                   minWidth: "30px",
  //                   minHeight: "30px",
  //                 }}
  //                 onClick={handelDeleteSymbol}
  //               >
  //                 <ClearIcon fontSize="small" />
  //               </Button>
  //             </div>
  //             <Typography color="textSecondary" gutterBottom>
  //               Last Refreshed: 2024-05-14 19:55:00
  //             </Typography>
  //             <Typography variant="body2">
  //               Latest Time: 2024-05-14 19:55:00
  //             </Typography>
  //             <Typography variant="body2">Open: 167.4500</Typography>
  //             <Typography variant="body2">High: 167.4500</Typography>
  //             <Typography variant="body2">Low: 167.3800</Typography>
  //             <Typography variant="body2">Close: 167.3800</Typography>
  //             <Typography variant="body2">Volume: 6</Typography>
  //           </CardContent>
  //         </Card>
  //       </Grid>
  //       <Grid item xs={12} sm={6} md={3}>
  //         <Card className="watchlistCard" style={{ borderRadius: 15 }}>
  //           <CardContent>
  //             <div className="cardTopic">
  //               <Typography variant="h5" component="div" mb={1}>
  //                 MRFT
  //               </Typography>
  //               <Button
  //                 variant="outlined"
  //                 color="error"
  //                 style={{
  //                   maxWidth: "30px",
  //                   maxHeight: "30px",
  //                   minWidth: "30px",
  //                   minHeight: "30px",
  //                 }}
  //                 onClick={handelDeleteSymbol}
  //               >
  //                 <ClearIcon fontSize="small" />
  //               </Button>
  //             </div>
  //             <Typography color="textSecondary" gutterBottom>
  //               Last Refreshed: 2024-05-14 19:55:00
  //             </Typography>
  //             <Typography variant="body2">
  //               Latest Time: 2024-05-14 19:55:00
  //             </Typography>
  //             <Typography variant="body2">Open: 167.4500</Typography>
  //             <Typography variant="body2">High: 167.4500</Typography>
  //             <Typography variant="body2">Low: 167.3800</Typography>
  //             <Typography variant="body2">Close: 167.3800</Typography>
  //             <Typography variant="body2">Volume: 6</Typography>
  //           </CardContent>
  //         </Card>
  //       </Grid>
  //       <Grid item xs={12} sm={6} md={3}>
  //         <Card className="watchlistCard" style={{ borderRadius: 15 }}>
  //           <CardContent>
  //             <div className="cardTopic">
  //               <Typography variant="h5" component="div" mb={1}>
  //                 BTCDN
  //               </Typography>
  //               <Button
  //                 variant="outlined"
  //                 color="error"
  //                 style={{
  //                   maxWidth: "30px",
  //                   maxHeight: "30px",
  //                   minWidth: "30px",
  //                   minHeight: "30px",
  //                 }}
  //                 onClick={handelDeleteSymbol}
  //               >
  //                 <ClearIcon fontSize="small" />
  //               </Button>
  //             </div>
  //             <Typography color="textSecondary" gutterBottom>
  //               Last Refreshed: 2024-05-14 19:55:00
  //             </Typography>
  //             <Typography variant="body2">
  //               Latest Time: 2024-05-14 19:55:00
  //             </Typography>
  //             <Typography variant="body2">Open: 167.4500</Typography>
  //             <Typography variant="body2">High: 167.4500</Typography>
  //             <Typography variant="body2">Low: 167.3800</Typography>
  //             <Typography variant="body2">Close: 167.3800</Typography>
  //             <Typography variant="body2">Volume: 6</Typography>
  //           </CardContent>
  //         </Card>
  //       </Grid>
  //       <Grid item xs={12} sm={6} md={3}>
  //         <Card className="watchlistCard" style={{ borderRadius: 15 }}>
  //           <CardContent>
  //             <div className="cardTopic">
  //               <Typography variant="h5" component="div" mb={1}>
  //                 GOOG
  //               </Typography>
  //               <Button
  //                 variant="outlined"
  //                 color="error"
  //                 style={{
  //                   maxWidth: "30px",
  //                   maxHeight: "30px",
  //                   minWidth: "30px",
  //                   minHeight: "30px",
  //                 }}
  //                 onClick={handelDeleteSymbol}
  //               >
  //                 <ClearIcon fontSize="small" />
  //               </Button>
  //             </div>
  //             <Typography color="textSecondary" gutterBottom>
  //               Last Refreshed: 2024-05-14 19:55:00
  //             </Typography>
  //             <Typography variant="body2">
  //               Latest Time: 2024-05-14 19:55:00
  //             </Typography>
  //             <Typography variant="body2">Open: 167.4500</Typography>
  //             <Typography variant="body2">High: 167.4500</Typography>
  //             <Typography variant="body2">Low: 167.3800</Typography>
  //             <Typography variant="body2">Close: 167.3800</Typography>
  //             <Typography variant="body2">Volume: 6</Typography>
  //           </CardContent>
  //         </Card>
  //       </Grid>
  //     </Grid>
  //   </div>
  // );
};

export default Watchlist;
