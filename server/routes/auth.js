const router = require("express").Router();


// register router

router.post("/register", registerUser);

// login route

router.post("/login", loginUser);


module.exports = router;