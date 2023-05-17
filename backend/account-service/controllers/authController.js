const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Account = require('../models/Account');
const { JWT_SECRET } = process.env;

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let account = await Account.findOne({ email });
        if (account) {
            return res.status(400).json({ msg: "Account already exists" });
        }
        account = new Account({ username, email, password });
        const salt = await bcrypt.genSalt(10);
        account.password = await bcrypt.hash(password, salt);
        await account.save();
        const payload = {
            account: {
                id: account.id,
            },
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let account = await Account.findOne({ email });
        if (!account) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const payload = {
            account: {
                id: account.id,
            },
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

exports.logout = async (req, res) => {
    req.account = null;
    res.status(200).json({ msg: "Logged out successfully" });
};