import { SEOProps } from '@/types';
import { Metadata } from 'next';

export function generateSEOMetadata(props: SEOProps): Metadata {
  const { title, description, canonical, ogImage = '', noIndex = false } = props;

  return {
    title: `${title} | Saphala`,
    description: description.substring(0, 155), // Ensure 155 char limit

    // Canonical URL
    alternates: canonical
      ? {
          canonical: canonical,
        }
      : undefined,

    // Robots
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Open Graph
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImage],
    },
  };
}
