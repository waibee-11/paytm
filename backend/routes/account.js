const express = require('express');
const { default: mongoose } = require('mongoose');
const { Accounts } = require('../db/db');
const authMiddleware = require('../middleware/authMiddleware');

const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, async (req, res) => {
    const userId = req.userId;
    try{
        const response = await Accounts.findOne({
            userId
        });
        if (!response){
            res.status(411).json({
                message: "User not found"
            });
            return;
        }
        res.status(200).json({
            balance: response.balance
        });
    } catch (e) {
        console.log("ERRRROROROROROROR");
    }
});

accountRouter.post('/send', authMiddleware, async (req, res) => {
    // const to = req.body.to;
    // const amount = req.body.amount;
    // const userId = req.userId;

    // const account = Accounts.findOne({
    //     userId
    // });

    // if (account.balance < amount) {
    //     res.status(400).json({
    //         message: "Insufficient balance"
    //     })
    //     return;
    // }

    // const toAccount = Accounts.findOne({
    //     userId: to
    // });

    // if (!toAccount) {
    //     res.status(400).json({
    //         message: "Invalid account"
    //     });
    //     return;
    // }

    // await Accounts.updateOne({
    //     userId: to
    // },{
    //     $inc: {
    //         balance: amount
    //     }
    // });

    // await Accounts.updateOne({
    //     userId
    // },{
    //     $inc: {
    //         balance: -amount
    //     }
    // });

    // res.status(200).json({
    //     message: "Transaction successful"
    // });
    try{
        const session = await mongoose.startSession();
        session.startTransaction();

        const {to, amount} = req.body;
        const account = await Accounts.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount){
            session.abortTransaction();
            res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Accounts.findOne({ userId: to }).session(session);
        if (!toAccount){
            session.abortTransaction();
            res.status(400).json({
                message: "Account not found"
            });
        }

        await Accounts.updateOne({ userId: req.userId }, { $inc: { balance: -amount }}).session(session);
        await Accounts.updateOne({ userId: to }, { $inc: { balance: amount }}).session(session);

        await session.commitTransaction();

        res.json({
            message: "Transaction completed"
        });
    } catch (e) {
        console.log("ERPROROROROOROROORR");
    }
});

module.exports = accountRouter;