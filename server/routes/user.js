const { getProfile, deleteProfile } = require("../controller/user");
const { verifyToken, verifyTokenAndUser } = require("../middleware/verifyToken");

const router = require("express").Router()

// get profile by id

router.get("/:id", verifyToken, getProfile);

// delete profile
router.delete("/:id", verifyTokenAndUser, deleteProfile)

module.exports = router;