import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/constiplay';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

async function connectDB(): Promise<void> {
  try {
    
    await mongoose.connect(MONGODB_URI);

    console.log('MongoDB connected successfully');
  } catch (error) {
    if (error instanceof Error) {
      console.error('MongoDB connection error:', error.message);
    } else {
      console.error('Unknown error during MongoDB connection');
    }
    process.exit(1);
  }
}

export default connectDB;
