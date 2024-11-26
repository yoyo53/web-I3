const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');

router.get('/', (req, res) => {
  controller.getAdminSurveys(req, res); 
});


module.exports = router;
