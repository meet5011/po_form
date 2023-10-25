const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();
const routes = require("./routes/route");
const db = require("./db/connect");
const server = http.createServer(app);
require("dotenv");


app.use(cors());
app.use(express.json());

app.use("/",routes)


 app.listen(3001,(err,res)=>{
    console.log("app is running on port 3001");
 })

db.connect();

