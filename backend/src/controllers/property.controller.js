const propertyService = require('../services/property.service');

exports.createProperty = async (req, res) => {
  try {
    const body = req.body
    if(body){
       res.status(404).json({massage:'All properties must have reqird'})
    }
    const property = await propertyService.createProperty(body);
    res.status(200).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await propertyService.getAllProperties();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
