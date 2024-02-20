const express = require('express');
const { User, Accounts } = require('./../db/db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const signInMiddleware = require('../middleware/signInMiddleware');
const signUpMiddleware = require('../middleware/signUpMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { zodUpdateUser } = require('../zod/zod');

const userRouter = express.Router();

userRouter.post('/signup', signUpMiddleware, async (req, res) => {
    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });

    const userId = user._id;

    await Accounts.create({
        userId,
        balance: 1 + Math.random() * 10000
    });
    
    const token = jwt.sign({
        userId,
    }, JWT_SECRET);

    res.status(211).json({
        message: "User created successfully",
        token
    });
});

userRouter.post('/signin', signInMiddleware, async (req, res) => {
    const response = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    const userId = response._id;
    if (response){
        const token = jwt.sign({
            userId
        }, JWT_SECRET);
        res.status(200).json({
            token
        });
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    });
});

userRouter.put('/', authMiddleware, async (req, res) => {
    const { success } = zodUpdateUser.safeParse(req.body);
    if (!success){
        res.status(411).json({
            message: "Error while updating information"
        });
    }

    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userId = req.userId;

    await User.updateOne({
        _id: userId
    },{
        password,
        firstName,
        lastName
    });

    res.status(200).json({
        message: "Updated successfully"
    })
});

userRouter.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = userRouter;