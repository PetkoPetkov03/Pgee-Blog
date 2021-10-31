import express from "express";
import Articles from "../models/articleModel.js"
import PictureURL from "../models/pictureModel.js"
const router = express.Router();


router.get("/pictures", async(req, res) => {
    try {
        const pictures = await PictureURL.find({});

        res.json(pictures);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/pictures/:id", async(req, res) => {
    const id = req.params.id;

    try {
        const currentPicture = await PictureURL.findById(id);

        res.json(currentPicture);
    } catch (err) {
        res.json(err.message);
    }
});

router.delete("/pictures/:id", async(req, res) => {
    const id = req.params.id;

    try {
        await PictureURL.findByIdAndDelete(id);

        res.json("Deleted successfully");
    } catch (err) {
        res.json(err.message);
    }
});

router.post("/pictures/new", async(req,res) => {
    const body = req.body;

    try {
        const newPicture = new PictureURL({
            title:  body.title,
            url: body.url,
            addedby: body.addedby
        })

        await newPicture.save();

        res.json("Article created");
    } catch (err) {
        res.json(err.message);
    }
});

router.post("/articles/new", async(req, res) => {
    const body = req.body;

    const newArticle = new Articles({
        title: body.title,
        description: body.description,
        createdby: body.createdby,
    })

    try {
       const saveArticle = await newArticle.save();
       res.json(saveArticle); 
    } catch (err) {
        res.json(err.message);
    }
});

router.delete("/articles/:id", async(req, res) => {
    const id = req.params.id;
    try {
        const article = await Articles.findByIdAndDelete(id);

        res.json("Deleted successfully");
    } catch (err) {
        console.error(err.message);
    }
});

router.put("/articles/:id", async(req, res) => {
    const id = req.params.id;

    const body = req.body;
    
    try {
        const article = await Articles.findById({ _id: id });

        const process = article.overwrite({title: body.title, description: body.description, createdat: Date.now(), createdby: article.createdby});

        const updatedArticle = await process.save();
        res.json(updatedArticle);

    } catch (err) {
        console.error(err.message);
    }
});

router.get("/articles", async(req, res) => {
    try {
        const articles = await Articles.find({});
        res.json(articles);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/articles/:id", async(req, res) => {
    const id = req.params.id
    const article = await Articles.findById(id);

    if(article !== null){
        res.json(article);
    }else{
        res.json("article not found");
    }
});

export default router