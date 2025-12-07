// Dummy data untuk apoteker (user)
const users = [
    { id: 1, name: 'Apoteker', email: 'apoteker@digiclinic.com', role: 'admin' }
];

// Dummy data untuk medicines
const medicines = [
    {
        id: 1,
        name: 'Paracetamol',
        disease: 'Demam, Nyeri',
        productionDate: '15/01/2024',
        expiryDate: '15/01/2026',
        stock: 15,
        stockLimit: 500,
        price: 5000,
        dose: '500mg',
        description: '3x sehari'
    },
    {
        id: 2,
        name: 'Amoxicillin',
        disease: 'Infeksi Bakteri',
        productionDate: '20/02/2024',
        expiryDate: '20/02/2026',
        stock: 120,
        stockLimit: 500,
        price: 15000,
        dose: '500mg',
        description: '3x sehari setelah makan'
    },
    {
        id: 3,
        name: 'Omeprazole',
        disease: 'Asam Lambung',
        productionDate: '10/03/2024',
        expiryDate: '10/03/2026',
        stock: 30,
        stockLimit: 500,
        price: 25000,
        dose: '20mg',
        description: '1x sehari sebelum makan'
    },
    {
        id: 4,
        name: 'Cetirizine',
        disease: 'Alergi',
        productionDate: '05/04/2024',
        expiryDate: '05/04/2026',
        stock: 85,
        stockLimit: 500,
        price: 8000,
        dose: '10mg',
        description: '1x sehari'
    },
    {
        id: 5,
        name: 'Metformin',
        disease: 'Diabetes',
        productionDate: '12/05/2024',
        expiryDate: '12/05/2026',
        stock: 25,
        stockLimit: 500,
        price: 12000,
        dose: '850mg',
        description: '2x sehari dengan makan'
    }
];

// Ambil semua data dashboard (user & daftar obat)
exports.getDashboardData = (req, res) => {
    res.status(200).json({
        user: users[0],
        medicines
    });
};

// Notifikasi stok rendah
exports.getLowStockMedicines = (req, res) => {
    const lowStockMedicines = medicines.filter(m => m.stock <= m.stockLimit);
    res.status(200).json(lowStockMedicines);
};

// Tambah obat
exports.addMedicine = (req, res) => {
    const { name, disease, productionDate, expiryDate, stock, stockLimit, price, dose, description } = req.body;
    const newId = medicines.length > 0 ? Math.max(...medicines.map(m => m.id)) + 1 : 1;
    const newMedicine = {
        id: newId,
        name,
        disease,
        productionDate,
        expiryDate,
        stock,
        stockLimit,
        price,
        dose,
        description
    };
    medicines.push(newMedicine);
    res.status(201).json({ message: 'Obat berhasil ditambahkan', medicine: newMedicine });
};

// Edit obat
exports.updateMedicine = (req, res) => {
    const { id } = req.params;
    const medicine = medicines.find(m => m.id === parseInt(id));
    if (!medicine) {
        return res.status(404).json({ message: 'Obat tidak ditemukan' });
    }
    const { name, disease, productionDate, expiryDate, stock, stockLimit, price, dose, description } = req.body;
    if (name !== undefined) medicine.name = name;
    if (disease !== undefined) medicine.disease = disease;
    if (productionDate !== undefined) medicine.productionDate = productionDate;
    if (expiryDate !== undefined) medicine.expiryDate = expiryDate;
    if (stock !== undefined) medicine.stock = stock;
    if (stockLimit !== undefined) medicine.stockLimit = stockLimit;
    if (price !== undefined) medicine.price = price;
    if (dose !== undefined) medicine.dose = dose;
    if (description !== undefined) medicine.description = description;
    res.status(200).json({ message: 'Obat berhasil diupdate', medicine });
};

// Hapus obat
exports.deleteMedicine = (req, res) => {
    const { id } = req.params;
    const idx = medicines.findIndex(m => m.id === parseInt(id));
    if (idx === -1) {
        return res.status(404).json({ message: 'Obat tidak ditemukan' });
    }
    medicines.splice(idx, 1);
    res.status(200).json({ message: 'Obat berhasil dihapus' });
};

// Ambil detail obat (by id)
exports.getMedicineById = (req, res) => {
    const { id } = req.params;
    const medicine = medicines.find(m => m.id === parseInt(id));
    if (!medicine) {
        return res.status(404).json({ message: 'Obat tidak ditemukan' });
    }
    res.status(200).json(medicine);
};

// Ambil/kurangi stok obat 
exports.takeMedicine = (req, res) => {
    const { id, qty } = req.body;
    const medicine = medicines.find(m => m.id === id || m.id === parseInt(id));
    if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
    }
    if (medicine.stock < qty) {
        return res.status(400).json({ message: 'Not enough stock' });
    }
    medicine.stock -= qty;
    let alert = null;
    if (medicine.stock <= medicine.stockLimit) {
        alert = `Stok ${medicine.name} menipis! Sisa: ${medicine.stock}`;
    }
    res.status(200).json({
        message: `Berhasil mengambil ${qty} ${medicine.name}`,
        sisa: medicine.stock,
        alert
    });
};