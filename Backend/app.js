import express from "express";
import userroute from "./routes/userroute.js";
import scheduleroute from "./routes/scheduleroute.js";
const app = express();
const port = 3000;
const host = "localhost";

app.use(express.json());
app.use(userroute);
app.use(scheduleroute);

app.listen(port, host, () => {
  console.log(`Server Berjalan Pada http://${host}:${port}`);
});
