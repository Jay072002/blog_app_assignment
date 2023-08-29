const { infoLog, errorLog } = require("../helper/logHelper");
const { Article } = require("../models/Article");

const getArticles = async (req, res, next) => {
    try {
        const articles = await Article.find()
            .populate('author', 'username');

        res.status(200).json({ allArticles: true, data: articles }); // Fixed the response syntax here
    } catch (error) {
        infoLog("getArticles exit");
        errorLog("Error while fetching all articles");
        next();
    }
};

const createArticle = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const { id } = req.user;

        if (!title || !content) {
            infoLog("createArticle exit");
            res.status(400).json({ articleCreated: false, message: "Error while creating article" });
            return errorLog("parameter missing");
        }

        const newArticle = new Article({
            title,
            content,
            author: id
        });

        await newArticle.save(); // Save the new article to the database

        res.status(201).json({ articleCreated: true, data: newArticle }); // Respond with the created article
    } catch (error) {
        infoLog("createArticle exit");
        errorLog("Error while creating an article");
        next();
    }
};

const updateArticle = async (req, res, next) => {
    try {
        const updateBody = req.body;
        const { id } = req.user;
        const { id: articleId } = req.params;

        if (Object.keys(updateBody).length == 0) {
            infoLog("updateArticle exit")
            errorLog("Error while updating the article")
            return res.status(400).json({ articleUpdated: false, data: null });
        }

        const article = await Article.findById(articleId);

        if (!article) {
            infoLog("updateArticle exit")
            errorLog("Error while updating article")
            return res.status(404).json({ message: 'Article not found' });
        }

        // Check if the current user is the author of the article
        if (article.author.toString() !== id) {
            infoLog("updateArticle exit")
            errorLog("Error while updating the article")
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }

        const updatedArticle = await Article.findByIdAndUpdate(id, updateBody, { new: true });

        res.status(200).json({ articleUpdated: true, data: updatedArticle });

    } catch (error) {
        infoLog("updateArticle exit");
        errorLog("Error while updating an article");
        next();
    }
};

const getArticle = async (req, res, next) => {
    try {
        // Implement single article retrieval logic here
        const { id } = req.params;

        const article = await Article.findById(id).populate('author', 'username');

        res.status(200).json({ articleFetched: true, data: article });
    } catch (error) {
        infoLog("getArticle exit");
        errorLog("Error while getting single article");
        next();
    }
};

const deleteArticle = async (req, res, next) => {
    try {
        // Implement delete logic here
        const { id: articleId } = req.params;
        const { id } = req.user

        const article = await Article.findById(articleId);

        if (!article) {
            infoLog("deleteArticle exit")
            errorLog("Error while deleting article")
            return res.status(404).json({ message: 'Article not found' });
        }

        if (article.author.toString() != id) {
            infoLog("deleteArticle exit")
            errorLog("Error while deleting the article")
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }

        await Article.findByIdAndDelete(id);

        res.status(200).json({ articleDeleted: true });
    } catch (error) {
        infoLog("deleteArticle exit");
        errorLog("Error while deleting particular article");
        next();
    }
};

module.exports = {
    getArticle,
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle
};
