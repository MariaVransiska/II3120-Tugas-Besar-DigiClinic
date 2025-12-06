// Dummy data untuk users
const users = [
    { id: 1, name: 'Apoteker', email: 'apoteker@digiclinic.com', role: 'admin' }
];

// Dummy data untuk medicines
const medicines = [
    { id: 1, name: 'Paracetamol', stock: 5, price: 5000 },
    { id: 2, name: 'Amoxicillin', stock: 20, price: 15000 },
    { id: 3, name: 'Omeprazole', stock: 8, price: 25000 },
    { id: 4, name: 'Cetirizine', stock: 50, price: 8000 },
    { id: 5, name: 'Metformin', stock: 3, price: 12000 }
];

exports.getDashboardData = (req, res) => {
    try {
        const userId = req.user?.id || 1; 
        const user = users.find((u) => u.id === userId);

        res.status(200).json({
            user,
            medicines
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving dashboard data', error });
    }
};

exports.getLowStockMedicines = (req, res) => {
    try {
        const lowStockThreshold = 5; 
        const lowStockMedicines = medicines.filter((medicine) => medicine.stock < lowStockThreshold);

        res.status(200).json(lowStockMedicines);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving low stock medicines', error });
    }
};