import mongoose from 'mongoose';

try {
  const client = await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected successfully');
} catch (error) {
  console.error('MongoDB connection error:', error);
}
