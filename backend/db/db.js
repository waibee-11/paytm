const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin:nI4PpT3NUtTjIdML@cluster0.s1bp51g.mongodb.net/paytm")
.then(()=>{console.log("Mongoose server has started")})
.catch((err)=>{
    console.error(err)
})

const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
const Accounts = mongoose.model('Accounts', accountSchema);

module.exports = ({
    User,
    Accounts
});