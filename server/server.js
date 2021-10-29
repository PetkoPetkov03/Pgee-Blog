import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import mongoose from "mongoose"

await mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(express.urlencoded({    extended:false   }));

app.use("/", router);
app.use(cors({
    origin: '*',
    methods: "GET, POST, PUT, DELETE",
    optionsSuccessStatus: 200
}));



app.get("/", (req, res) => {
    res.json("Petko");
});

app.listen(PORT, console.log(`server runs at port: ${PORT}`));