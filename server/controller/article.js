const { infoLog, errorLog, successLog } = require("../helper/logHelper");
const Article = require("../models/Article");

const getArticles = async (req, res, next) => {
    infoLog("getArticles entry")
    try {
        const articles = await Article.find()
            .populate('author', 'username');

        infoLog("getArticles exit")
        successLog("Successfully fetched articles")
        res.status(200).json({ allArticles: true, data: articles }); // Fixed the response syntax here
    } catch (error) {
        infoLog("getArticles exit");
        errorLog("Error while fetching all articles");
        next();
    }
};

const createArticle = async (req, res, next) => {
    infoLog("createArticle entry")

    console.log(req.body);
    try {
        const { title, content, category } = req.body;
        const { id } = req.user;

        if (!title || !content || !category) {
            infoLog("createArticle exit");
            res.status(400).json({ articleCreated: false, message: "Error while creating article" });
            return errorLog("parameter missing");
        }

        const newArticle = new Article({
            title,
            content,
            category,
            author: id
        });

        await newArticle.save(); // Save the new article to the database

        infoLog("createArticle exit")
        successLog("Successfully created article")

        res.status(201).json({ articleCreated: true, data: newArticle }); // Respond with the created article
    } catch (error) {
        console.log(error);
        infoLog("createArticle exit");
        errorLog("Error while creating an article");
        next();
    }
};

const updateArticle = async (req, res, next) => {
    infoLog("updateArticle entry")
    try {
        const updateBody = req.body;
        const { id } = req.user;
        const { id: articleId } = req.params;

        if (Object.keys(updateBody).length == 0) {
            infoLog("updateArticle exit")
            errorLog("Error while updating the article")
            return res.status(400).json({ articleUpdated: false, data: null });
        }


        const updatedArticle = await Article.findByIdAndUpdate(articleId, updateBody);

        infoLog("updateArticle exit")
        successLog("Successfully updated article")

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

    infoLog("deleteArticle entry")

    try {
        // Implement delete logic here
        const { id: articleId } = req.params;
        const { id } = req.user

        await Article.findByIdAndDelete(articleId);

        infoLog("deleteArticle entry")
        successLog("Successfully deleted article")

        res.status(200).json({ articleDeleted: true });
    } catch (error) {
        infoLog("deleteArticle exit");
        errorLog("Error while deleting particular article");
        next();
    }
};

// Get articles by user ID
const getUserArticles = async (req, res, next) => {
    infoLog("getUserArticles entry")

    const userId = req.params.userId;

    try {
        const articles = await Article.find({ author: userId });

        infoLog("getUserArticles exit")
        successLog("Successfullt fetched user's articles")
        res.status(200).json({ fetchedUsersArticles: true, data: articles });
    } catch (error) {
        infoLog("getUserArticles exit")
        errorLog("Error while fetching user's articles")
        next()
    }
};


module.exports = {
    getArticle,
    getArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    getUserArticles
};
