const mongoose = require('mongoose');

// User Schema
const AdminSchema = mongoose.Schema({
  log:{
    type: String,
    required: true
  },
  pas:{
    type: String,
    required: true
  },
});

const Admin = module.exports = mongoose.model('Admin', AdminSchema);
