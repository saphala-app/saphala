import mongoose from 'mongoose';

export const connectToDB = async () => {
  const MONGODB_URL = process.env.MONGODB_URI;
  const DB_NAME = process.env.DB_NAME;

  if (!MONGODB_URL) {
    throw new Error('Database url is missing!');
    process.exit(1);
  }

  if (!DB_NAME) {
    throw new Error('Dataname is required!');
    process.exit(1);
  }

  try {
    const connectionInstance = await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`);
    if (connectionInstance.connection.db) {
      await connectionInstance.connection.db.admin().command({ ping: 1 });
      console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }
  } catch (error) {
    console.log('MONGODB connection FAILED ', error);
    process.exit(1);
  }
};
