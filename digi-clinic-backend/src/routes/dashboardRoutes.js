const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', dashboardController.getDashboardData);

router.get('/notifications', dashboardController.getLowStockMedicines);

module.exports = router;