const { default: mongoose } = require("mongoose");
const Article = require("./Article")

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

const User = mongoose.model("User", userSchema);


userSchema.pre('remove', async function (next) {
    try {
        console.log(this._id);
        await Article.deleteMany({ author: this._id });
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = User