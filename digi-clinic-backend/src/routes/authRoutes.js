const express = require('express');
const authService = require('../services/authService');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = await authService.register(email, password);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const { token, user } = await authService.login(email, password);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;