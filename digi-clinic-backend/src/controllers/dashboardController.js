const users = [
    { id: 1, name: 'Apoteker', email: 'apoteker@digiclinic.com', role: 'admin' }
];

// Dummy data untuk medicines
const medicines = [
    { id: 1, name: 'Paracetamol', stock: 99, price: 5000 },
    { id: 2, name: 'Amoxicillin', stock: 125, price: 15000 },
    { id: 3, name: 'Omeprazole', stock: 1000, price: 25000 },
    { id: 4, name: 'Cetirizine', stock: 1000, price: 8000 },
    { id: 5, name: 'Metformin', stock: 1000, price: 12000 }
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
        const lowStockThreshold = 100; 
        const lowStockMedicines = medicines.filter((medicine) => medicine.stock < lowStockThreshold);

        res.status(200).json(lowStockMedicines);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving low stock medicines', error });
    }
};

exports.takeMedicine = (req, res) => {
    const { id, qty } = req.body;
    const medicine = medicines.find(m => m.id === id);

    if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
    }

    if (medicine.stock < qty) {
        return res.status(400).json({ message: 'Not enough stock' });
    }

    medicine.stock -= qty;

    // Cek apakah setelah pengambilan, stok jadi di bawah threshold
    const lowStockThreshold = 100;
    let alert = null;
    if (medicine.stock < lowStockThreshold) {
        alert = `Stok ${medicine.name} menipis! Sisa: ${medicine.stock}`;
    }

    res.status(200).json({
        message: `Berhasil mengambil ${qty} ${medicine.name}`,
        sisa: medicine.stock,
        alert
    });
};