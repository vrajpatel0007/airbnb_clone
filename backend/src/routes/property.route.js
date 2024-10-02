const express = require('express');
const propertyController = require('../controllers/property.controller');
const { authUser, authorizeAdmin } = require("../middleware/auth");

const router = express.Router();

router.post('/createProperty', authUser, authorizeAdmin, propertyController.createProperty);
router.get('/AllProperties', authUser, propertyController.getAllProperties);
router.delete('/deletPropertie/:id', authUser, authorizeAdmin, propertyController.deletePropertie);

module.exports = router;
