const Account = require('../models/Account');
const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require('../utils/jwt');

const saltRounds = 10;

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingAccount = await Account.findOne({ $or: [{ username }, { email }] });
    if (existingAccount) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newAccount = new Account({ username, email, password: hashedPassword });
    await newAccount.save();

    const token = generateToken({ accountId: newAccount._id });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const account = await Account.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
    if (!account) {
      return res.status(401).json({ message: 'Invalid username or email' });
    }

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken({ accountId: account._id });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAccount = async (req, res) => {
  // Update account logic
};

exports.deleteAccount = async (req, res) => {
  // Delete account logic
};
