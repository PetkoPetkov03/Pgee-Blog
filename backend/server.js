import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import session from "express-session";
import router from "./routes/router.js";
const app = express();

app.use(cors());
app.use(session({secret: "secret", resave:true, saveUninitialized: true}));
app.use(express.json());
app.use(express.urlencoded({  extended: true  }));
app.use("/", router);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));