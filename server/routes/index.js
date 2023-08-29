const router = require("express").Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const articleRouter = require("./articles");

router.use("/auth", authRouter);

router.use("/user", userRouter);

router.use("/article", articleRouter)

module.exports = router;