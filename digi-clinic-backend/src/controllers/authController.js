const authService = require('../services/authService');

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await authService.register(email, password);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, user } = await authService.login(email, password);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};