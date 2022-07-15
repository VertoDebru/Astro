const mongoose = require('mongoose');

// Schema for MongoDB.
const elementsSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  univers: { type: String, required: true },
  number: { type: Number, required: true }
});

module.exports = mongoose.model('elements', elementsSchema);
