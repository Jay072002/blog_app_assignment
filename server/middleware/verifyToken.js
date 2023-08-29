const jwt = require("jsonwebtoken");
const { errorLog } = require("../helper/logHelper");

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        errorLog("No Token");
        return res.status(400).json({ isToken: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        req.user = decoded;

        return next();
    } catch (error) {
        errorLog("Invalid Token");
        return res.status(401).json({ isToken: false });
    }
};

module.exports = {
    verifyToken
}
