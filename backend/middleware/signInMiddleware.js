const { zodSignIn } = require("../zod/zod");

function signInMiddleware(req, res, next){
    const { success } = zodSignIn.safeParse(req.body);
    if (!success) {
        res.status(200).json({
            message: "Incorrect inputs"
        });
        return;
    }
    next();
}

module.exports = signInMiddleware;