const express = require('express');
const propertyController = require('../controllers/property.controller');
const { authUser } = require("../middleware/auth");

const router = express.Router();

router.post('/createProperty',authUser, propertyController.createProperty);
router.get('/AllProperties', propertyController.getAllProperties);
router.delete('/deletPropertie/:id', propertyController.deletePropertie);

module.exports = router;
