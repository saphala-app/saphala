import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Next.js
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(1, 'NextAuth secret is required'),

  // Database
  MONGODB_URI: z.string().min(1, 'MongoDB URI is required'),
  MONGODB_DB_NAME: z.string().optional(),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(1, 'Google Client ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'Google Client Secret is required'),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string().min(1, 'Cloudinary cloud name is required'),
  CLOUDINARY_API_KEY: z.string().min(1, 'Cloudinary API key is required'),
  CLOUDINARY_API_SECRET: z.string().min(1, 'Cloudinary API secret is required'),

  // JWT (if using custom JWT implementation alongside NextAuth)
  JWT_SECRET: z.string().optional(),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // App Configuration
  APP_URL: z.string().url().optional(),
  APP_NAME: z.string().default('Saphala'),

  // Email (if you plan to add email functionality)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),

  // API Keys (for movie data if you're using external APIs like TMDB)
  TMDB_API_KEY: z.string().optional(),
  TMDB_BASE_URL: z.string().url().default('https://api.themoviedb.org/3'),

  // Rate Limiting
  RATE_LIMIT_MAX: z.string().transform(Number).default('100'),
  RATE_LIMIT_WINDOW: z.string().default('15m'),

  // File Upload
  MAX_FILE_SIZE: z.string().transform(Number).default('5242880'), // 5MB in bytes
  ALLOWED_FILE_TYPES: z.string().default('image/jpeg,image/png,image/webp'),
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    // if (error instanceof z.ZodError) {
    //   console.error('❌ Invalid environment variables:')
    //   error.errors.forEach((err) => {
    //     console.error(`  ${err.path.join('.')}: ${err.message}`)
    //   })
    //   process.exit(1)
    // }
    // throw error
    console.log('Env config error', error);
  }
};

// Export the validated environment variables
export const env = parseEnv();

// Type for the environment variables
export type Environment = z.infer<typeof envSchema>;

// Helper functions
export const isDev = env.NODE_ENV === 'development';
export const isProd = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

// Database configuration
export const dbConfig = {
  uri: env.MONGODB_URI,
  dbName: env.MONGODB_DB_NAME,
  options: {
    bufferCommands: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  },
};

// NextAuth configuration
export const authConfig = {
  secret: env.NEXTAUTH_SECRET,
  url: env.NEXTAUTH_URL || (isDev ? 'http://localhost:3000' : env.APP_URL),
  providers: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
};

// Cloudinary configuration
export const cloudinaryConfig = {
  cloudName: env.CLOUDINARY_CLOUD_NAME,
  apiKey: env.CLOUDINARY_API_KEY,
  apiSecret: env.CLOUDINARY_API_SECRET,
  secure: true,
  uploadOptions: {
    folder: 'saphala',
    allowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
    maxFileSize: env.MAX_FILE_SIZE,
    transformation: [
      { width: 500, height: 500, crop: 'limit' },
      { quality: 'auto' },
      { format: 'webp' },
    ],
  },
};

// API configuration
export const apiConfig = {
  tmdb: {
    apiKey: env.TMDB_API_KEY,
    baseUrl: env.TMDB_BASE_URL,
  },
  rateLimit: {
    max: env.RATE_LIMIT_MAX,
    window: env.RATE_LIMIT_WINDOW,
  },
};

// SMTP configuration (for future email functionality)
export const emailConfig = env.SMTP_HOST
  ? {
      host: env.SMTP_HOST,
      port: parseInt(env.SMTP_PORT || '587'),
      secure: parseInt(env.SMTP_PORT || '587') === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    }
  : null;

// Export individual configs for easier imports
export { env as default };

// Runtime environment checks
if (isDev) {
  console.log('🔧 Running in development mode');
}

if (isProd && !env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is required in production');
}

if (isProd && !env.APP_URL) {
  console.warn('⚠️  APP_URL is not set in production');
}
