const { infoLog, errorLog, successLog } = require("../helper/logHelper");
const Article = require("../models/Article");

const filterArticles = async (req, res, next) => {

    infoLog("filterArticles entry")

    try {
        const searchTerm = req.body;

        const filteredArticles = await Article.find({
            category: { $regex: `^${searchTerm}`, $options: 'i' },
        });

        infoLog("filterArticles exit")
        successLog("Successfully filtered the articles")
        res.status(200).json({ articleFiltered: true, data: filteredArticles })

    } catch (error) {
        infoLog("filterArticles exit")
        errorLog("Error while filtereing the articles")
        next()
    }
}


module.exports = {
    filterArticles
}