const express = require('express');
const router = express.Router();
const authActions = require('../controllers/auth.controller.js');
const securityMiddleware = require('../middlewares/security')
const adminAccess = require('../middlewares/adminAccess')

router.post("/register", adminAccess.adminToken, authActions.createUserAction);
router.post("/login", authActions.loginUserAction);
router.get("/verifyToken", securityMiddleware.verifyToken, authActions.verifyTokenAction);

module.exports = router;
