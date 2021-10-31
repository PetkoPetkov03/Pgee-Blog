import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import mongoose from "mongoose"

await mongoose.connect("mongodb+srv://petko:56R2pkMoT1KVGpKx@pgee.ik5lg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const db = mongoose.connection;

const app = express();

const PORT = process.env.PORT || 8000;


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({    extended:false   }));

app.use("/", router);



app.get("/", (req, res) => {
    res.json("Petko");
});

app.listen(PORT, console.log(`server runs at port: ${PORT}`));