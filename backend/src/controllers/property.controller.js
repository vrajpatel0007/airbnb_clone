const propertyService = require('../services/property.service');

const createProperty = async (req, res) => {
  try {
    const body = req.body
    if(body){
       res.status(404).json({massage:'All properties must have reqird'})
    }
    const property = await propertyService.createProperty(body);
    res.status(200).json({message: "Property registered successfully",data: property});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await propertyService.getAllProperties();
    res.status(200).json({data: properties});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePropertie = async (req, res) => {
    try {
        const Propertie = await propertyService.Propertie(req.params.id)
        if (!Propertie) {
            return res.status(404).json({message:'Propertie not found'});
        }
        const property = await propertyService.deletePropertie(req.params.id);
        res.status(200).json({massage:"property Deleted Successfully"});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createProperty,
    getAllProperties,
    deletePropertie
}