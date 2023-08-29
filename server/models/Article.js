const { Schema, default: mongoose } = require("mongoose");

const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        // ref to the user table
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: Date,
    }
)

const Article = mongoose.model("Article", articleSchema);

module.exports = Article