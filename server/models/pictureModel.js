import mongoose from "mongoose"

const Schema = mongoose.Schema;

const urlPicture = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    addedby: {
        type: String,
        required: true
    }
})

export default mongoose.model("PictureURL", urlPicture)