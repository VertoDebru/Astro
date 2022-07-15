const mongoose = require('mongoose');

// Schema for MongoDB.
const signsSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  elements: { type: Array, require: true },
  year: { type: Array, require: true },
  typeSign: { type: String, require: true }
});

module.exports = mongoose.model('signs', signsSchema);
