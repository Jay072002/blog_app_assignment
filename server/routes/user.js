const router = require("express").Router()

// get all users
router.get("/", getUsers);

// update user by id
router.put("/:id", updateUser);

// delete user by id
router.delete("/:id", deleteUser);

// get user by id
router.get("/:id", getUser);

module.exports = router;