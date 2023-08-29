const { getArticles, updateArticle, deleteArticle, getArticle, createArticle, getUserArticles } = require("../controller/article");
const { verifyToken, verifyTokenAndUser } = require("../middleware/verifyToken");

// article related routes
const router = require("express").Router();

// get all articles 
router.get("/", getArticles);

// update article by id
router.put("/:id", verifyTokenAndUser, updateArticle);

// delete article by id
router.delete("/:id", verifyTokenAndUser, deleteArticle);

// get particular article by id
router.get("/:id", getArticle);

// create an article
router.post("/", verifyToken, createArticle)

// Get articles by user ID
router.get("/user/:userId", getUserArticles);

module.exports = router;