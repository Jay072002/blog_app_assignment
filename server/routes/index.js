const router = require("express").Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const articleRouter = require("./articles");

// auth related routes
router.use("/auth", authRouter);

// user related routes
router.use("/user", userRouter);

// article related routes
router.use("/article", articleRouter)

module.exports = router;