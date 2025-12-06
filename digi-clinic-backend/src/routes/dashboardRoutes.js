const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', dashboardController.getDashboardData);
router.get('/notifications', dashboardController.getLowStockMedicines);
router.post('/take-medicine', dashboardController.takeMedicine);
router.delete('/medicine/:id', dashboardController.deleteMedicine);
router.put('/medicine/:id', dashboardController.updateMedicine);

module.exports = router;