const { filterArticles } = require("../controller/filter");

const router = require("express").Router();

// filter api to filter the articles according to category

router.post("/", filterArticles)



module.exports = router;