import mongoose from "mongoose"

const Schema = mongoose.Schema;

const article = new Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    createdat: {
        type: Date,
        required: true,
        default: Date.now
    },
    createdby: {
        type: String,
        required: true
    }
})


const Article = mongoose.model("Articles", article);

export default Article;