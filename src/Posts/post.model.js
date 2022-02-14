import mongoose from 'mongoose';
import Schema from 'mongoose';
const postSchema = new mongoose.Schema({
    title: String,
    Description: String,
    user_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }]
}, {
    timestamps: true
})

const postModel = new mongoose.model("Post", postSchema);
export default postModel;