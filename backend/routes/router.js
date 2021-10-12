import e from "express";
import express, { json } from "express";
import pool from "../database/Pool.js";
const router = express.Router();

let sess;

router.get("/", (req, res) => {
    res.json({
        name: "Petko"
    });
});

router.post("/articles/new", async(req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const createdAt = await Date.now();
    const createdBy = await sess.username;

    try {
        const newArticle = await pool.query("INSERT INTO articles (title, description, createdAt, createdBy) VALUES($1, $2, $3, $4)", [title, description, createdAt, createdBy]);
        res.json({
            message: "Successful",
            user: sess.username 
        });
    } catch (err) {
        res.json({
            message: err.message,
            user: sess.username
        });
    }
    
    
});

router.get("/articles/:id", async(req, res) => {
    const id = req.params.id;
    try {
        const article = await pool.query("SELECT * FROM articles WHERE article_id=$1", [id]);
        if(article.rows[0] == null){
            throw new Error({
                pass: "File not existent!"
            })
        }else{
            res.json(article.rows[0]);
        }
    } catch (err) {
        res.json({
            status: "Error || article is non existing",
            message: err.message
        });
    }
});

router.put("/articles/edit/:id", async(req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;

    try {
        const editArticle = await pool.query("UPDATE articles SET title=$1, description=$2", [title, description]);
        res.json({
            status: "Success",
            message: "Article Updated"
        });
    } catch (err) {
        res.json({
            status: "Error",
            message: "Cant get to article"
        });
    }
});

router.delete("/articles/delete/:id", async(req, res) => {
    const id = req.params.id;

    try {
        const deleteArticle = await pool.query("DELETE FROM articles WHERE article_id=$1", [id]);
        res.json({
            status: "Success",
            message: "Article Deleted"
        });
    } catch (err) {
        res.json({
            status: "Error",
            message: "Article deletion Error"
        })
    }
});

router.get("/articles", async(req, res) => {
    try {
        const allArticles = await pool.query("SELECT * FROM articles");
        res.json(allArticles);
    } catch (err) {
        console.error(err.message);
    }
});


router.get('/profile', (req, res) => {
    res.json(sess);
});

router.post("/user/loading", async (req, res) => {
    const email = req.body.email;
    const pwd = req.body.pwd;
    sess=req.session;
    sess.err=false;
    try {
        const {rows} = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

        if(rows[0].pwd === pwd){
            sess.user_id = rows[0].user_id;
            sess.email=rows[0].email;
            sess.username=rows[0].username;
            sess.uid=rows[0].user_uid;
            res.json(sess);
        }else{
            sess.err=true;
        }
    } catch (err) {
        console.error(err.message);
    }
});

router.post("/user", async (req, res) => {
    try {
        const email = req.body.email;
        const username = req.body.username;
        const uid = req.body.uid;
        const pwd = req.body.pwd;
        const newUser = await pool.query("INSERT INTO users (email, username, user_uid, pwd) VALUES($1, $2, $3, $4)", [email, username, uid, pwd]);
        const response = json(newUser.rows);
        res.json(response);
    } catch (err) {
        console.error(err.message);
    }
});

export default router;