const Property = require('../models/property.model');

const createProperty = async (body) => {
  return await Property.create(body);
};

const getAllProperties = async () => {
  return await Property.find()
};

const propertybyid = async (bookingData) => {
    return await Property.findById(bookingData.property);
}

const Propertie = async (id) => {
    return await Property.findById(id);
}
const deletePropertie = async (id) => {
    return await Property.findByIdAndDelete(id);
}

module.exports = {
    createProperty,
    getAllProperties,
    propertybyid,
    Propertie,
    deletePropertie
}