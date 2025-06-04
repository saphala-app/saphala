import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
  full_name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
  provider: string;
}

const userSchema = new Schema<IUser>(
  {
    full_name: {
      type: String,
      required: [true, 'Full Name is required!'],
    },

    username: {
      type: String,
      unique: true,
      required: [true, 'User Name is required!'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required!'],
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
    },
    provider: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Hash password
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/**
 * Remove password
 */
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
