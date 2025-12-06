const { medicines } = require('../controllers/dashboardController');

const checkStockLevels = () => {
    try {
        const lowStockMedicines = medicines.filter((medicine) => medicine.stock < 10);
        return lowStockMedicines;
    } catch (error) {
        throw new Error('Error checking stock levels: ' + error.message);
    }
};

const sendStockAlert = (medicinesList) => {
    medicinesList.forEach((medicine) => {
        console.log(`Alert: ${medicine.name} is low on stock! Current stock: ${medicine.stock}`);
    });
};

module.exports = {
    checkStockLevels,
    sendStockAlert
};