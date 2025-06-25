import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://saphala.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://saphala.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://saphala.com/login',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.0,
    },
    {
      url: 'https://saphala.com/signup',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.0,
    },
  ];
}
