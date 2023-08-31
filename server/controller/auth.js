const User = require("../models/User");
const { errorLog, successLog, infoLog } = require("../helper/logHelper");
const { hashPassword, comparePassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/JWT.js");

const registerUser = async (req, res, next) => {
    infoLog("registerUser entry");
    try {
        const { username, email, password, confirmpassword } = req.body;

        if (
            !username ||
            !email ||
            !password ||
            !confirmpassword
        ) {
            infoLog("registerUser exit");
            res.status(400).json({ isRegister: false, message: "missing required fields" });
            return errorLog("Invalid Details");
        }

        if (password !== confirmpassword) {
            infoLog("registerUser exit");

            res.status(400).json({ isRegister: false, message: "Password Not Matched" });
            return errorLog("Password Not Matched");
        }

        // check for the existance if already exist then dont allow to register

        const isRegistered = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (isRegistered) {
            infoLog("registerUser exit");

            res.json({ isRegister: false });
            errorLog("User Already Exist!");
            return;
        }

        const hashPass = await hashPassword(password);

        const newUser = new User({
            username,
            email,
            password: hashPass,
        });

        await newUser.save();

        successLog("Successfully Registered!");
        infoLog("registerUser exit");
        return res.status(201).json({ isRegister: true });
    } catch (error) {
        console.log(error);
        infoLog("registerUser exit");
        errorLog("Error While Registration!");
        next();
    }
};

const loginUser = async (req, res, next) => {
    infoLog("loginUser entry");

    const { username, password } = req.body;

    if (!username || !password) {
        infoLog("loginUser exit");
        res.status(400).json({ isLogin: false, message: "Missing Required Fileds!" });
        return errorLog("Invalid Details");
    }

    try {
        // check if the user logged in or not

        const isRegistered = await User.findOne({
            $or: [{ username: username }, { email: username }],
        });

        if (!isRegistered) {
            infoLog("loginUser exit");
            res.status(401).json({ isLogin: false, message: "User is not registerd!" });
            return errorLog("Unauthorized User Trying To Login");
        }

        const isMatch = await comparePassword(password, isRegistered?.password);

        if (!isMatch) {
            infoLog("loginUser exit");
            res.status(401).json({ isLogin: false, message: "Incorrect Password!" });
            return errorLog("Authentication Failed");
        }

        const token = generateToken({
            id: isRegistered._id,
            username: isRegistered.username,
            email: isRegistered.email,
        });
        res.cookie("token", token, { maxAge: 60 * 60 * 24 * 1000 });

        successLog("Successfully LoggedIn!");
        infoLog("loginUser exit");
        return res.status(200).json({ isLogin: true, token: token, user: isRegistered });
    } catch (error) {
        console.log(error);
        errorLog("error while login the user");
        next()
    }
};

module.exports = {
    registerUser,
    loginUser,
};
