// article related routes
const router = require("express").Router();

// get all articles
router.get("/", getArticles);

// update article by id
router.put("/:id", updateArticle);

// delete article by id
router.delete("/:id", deleteArticle);

// get particular article by id
router.get("/:id", getArticle);

// create an article
router.post("/", createArticle)

module.exports = router;