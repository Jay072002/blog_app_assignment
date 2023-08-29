const jwt = require("jsonwebtoken");
const { errorLog } = require("../helper/logHelper");
const Article = require("../models/Article");

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        errorLog("No Token");
        return res.status(400).json({ isToken: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        req.user = decoded;

        return next();
    } catch (error) {
        errorLog("Invalid Token");
        return res.status(401).json({ isToken: false });
    }
};

const verifyTokenAndUser = async (req, res, next) => {
    verifyToken(req, res, async () => {

        const isUserPath = req.originalUrl.includes('/user/');

        if (isUserPath) {

            const userId = req.params.id

            if (userId !== req?.user?.id) {
                return res.status(403).json({ message: 'Access denied. You do not have permission to perform this action.' });
            } else {
                return next()
            }

        } else {
            const article = await Article.findById(req.params.id);

            if (!article) {
                return res.status(404).json({ message: 'Article not found.' });
            }

            // Check if the authenticated user is the owner of the article
            if (req.user.id.toString() !== article.author.toString()) {
                return res.status(403).json({ message: 'Access denied. You do not have permission to perform this action.' });
            } else {
                return next()
            }
        }


    });
};


module.exports = {
    verifyToken,
    verifyTokenAndUser
}
