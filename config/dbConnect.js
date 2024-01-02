const mongoose = require('mongoose');

const dbConnect = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log('DATABASE CONNECTED');
  } catch (error) {
    console.log('DATABASE ERROR');
  }
};

module.exports = { dbConnect };
