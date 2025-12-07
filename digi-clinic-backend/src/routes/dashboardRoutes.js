const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', dashboardController.getDashboardData); // list semua obat
router.get('/notifications', dashboardController.getLowStockMedicines); // notifikasi stok
router.post('/medicine', dashboardController.addMedicine); // tambah obat
router.put('/medicine/:id', dashboardController.updateMedicine); // edit obat
router.delete('/medicine/:id', dashboardController.deleteMedicine); // hapus obat
router.get('/medicine/:id', dashboardController.getMedicineById); // detail obat
router.post('/take-medicine', dashboardController.takeMedicine); // ambil obat (kurangi stok)
router.get('/low-stock', dashboardController.getLowStockMedicines); // daftar obat stok rendah

module.exports = router;