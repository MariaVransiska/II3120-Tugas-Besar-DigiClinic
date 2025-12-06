const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// Dummy data untuk apoteker
const users = [
    { id: 1, email: 'apoteker@digiclinic.com', password: bcrypt.hashSync('password123', 10), role: 'apoteker' }
];

const authService = {
    register: async (email, password) => {
        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: users.length + 1, email, password: hashedPassword, role: 'apoteker' };
        users.push(newUser);
        return { id: newUser.id, email: newUser.email, role: newUser.role };
    },

    login: async (email, password) => {
        const user = users.find((user) => user.email === email);
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        return { token, user: { id: user.id, email: user.email, role: user.role } };
    },

    validateToken: (token) => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
};

module.exports = authService;