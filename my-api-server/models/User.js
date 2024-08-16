const mongoose = require('../db');

const userSchema = new mongoose.Schema({
    id: Number,
    username: String,
    fullname: String,
    password: String,
    email: String,
    phone: String,
    address: String,
}, {
    timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;

