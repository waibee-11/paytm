const { User } = require("../db/db");
const { zodUser } = require("../zod/zod");

async function signUpMiddleware(req, res, next){
    const { success } = zodUser.safeParse(req.body);
    if (!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    const response = await User.findOne({
        username: req.body.username,
    });

    if (response){
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    next();
};

module.exports = signUpMiddleware;