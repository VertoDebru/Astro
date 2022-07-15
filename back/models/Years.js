const mongoose = require('mongoose');

// Schema for MongoDB.
const yearsSchema = mongoose.Schema({
  year: { type: Date }
});

module.exports = mongoose.model('chineseYears', yearsSchema);
