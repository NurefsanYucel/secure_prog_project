const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    // Use provided URI or fallback to default MONGO_URI env variable
    await mongoose.connect(uri || process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };



