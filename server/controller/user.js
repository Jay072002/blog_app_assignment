const { infoLog, errorLog, successLog } = require("../helper/logHelper");
const Article = require("../models/Article");
const User = require("../models/User");

// get user profile

const getProfile = async (req, res, next) => {

    infoLog("getProfile entry")

    try {
        const { id: userId } = req.params;

        const userProfile = await User.findById(userId);

        infoLog("getProfile exit")
        successLog("Successfully fetched user profile")

        res.status(200).json({ getUserProfile: true, data: userProfile })

    } catch (error) {
        infoLog("getProfile exit")
        errorLog("Error while fetching user profile")
        next()
    }
}


// delete user profile 

const deleteProfile = async (req, res, next) => {

    infoLog("deleteProfile entry")

    try {
        const { id: userId } = req.params;

        // Find articles belonging to the user
        const articlesToDelete = await Article.find({ author: userId });

        console.log(articlesToDelete);

        // Delete articles concurrently using Promise.all
        await Promise.all(
            articlesToDelete.map(async article => {
                await Article.deleteOne({ _id: article._id });
                console.log(`Article ${article._id} deleted.`);
            })
        );


        // Delete the user
        await User.findByIdAndDelete(userId);

        res.status(200).json({ isProfileDeleted: true })

    } catch (error) {
        console.log(error);
        infoLog("deleteProfile exit")
        errorLog("Error while deleting the user profile")
        next()
    }
}

module.exports = {
    getProfile,
    deleteProfile
}