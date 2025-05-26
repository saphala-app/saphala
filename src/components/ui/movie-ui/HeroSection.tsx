'use client';

// components/HeroSection.tsx
import React, { useState, useEffect } from 'react';

interface HeroSectionProps {
  title: string;
  overview: string;
  rating: string;
  year: string;
  genres: string;
  ageRating: string;
  director: string;
  stars: string;
  backgroundImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  overview,
  rating,
  year,
  genres,
  ageRating,
  director,
  stars,
  backgroundImage,
}) => {
  // Local storage logic for the follow button can remain here,
  // or you could make it movie-specific by using `title` in the key.
  const [followerCount, setFollowerCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('strangerThingsFollowerCount') || '1234567');
    }
    return 1234567;
  });
  const [isFollowing, setIsFollowing] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('strangerThingsIsFollowing') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('strangerThingsFollowerCount', followerCount.toString());
      localStorage.setItem('strangerThingsIsFollowing', isFollowing.toString());
    }
  }, [followerCount, isFollowing]);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowerCount(prev => prev - 1);
      setIsFollowing(false);
    } else {
      setFollowerCount(prev => prev + 1);
      setIsFollowing(true);
    }
  };

  return (
    <section
      className="relative h-[500px] overflow-hidden shadow-2xl md:h-[650px]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="from-dark-primary via-dark-primary/70 overlay absolute inset-0 bg-gradient-to-t to-transparent"></div>
      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-12">
        <h1 className="text-red-netflix mb-4 text-4xl leading-tight font-extrabold drop-shadow-lg md:text-6xl">
          {title}
        </h1>
        <p className="mb-6 max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl">
          {overview}
        </p>

        <div className="mb-8 flex flex-wrap items-center space-x-6">
          <div className="flex items-center text-yellow-400">
            <i className="fas fa-star mr-2 text-2xl"></i>
            <span className="text-2xl font-bold">{rating}</span>
            <span className="ml-2 text-lg text-gray-400">/ 10</span>
          </div>
          <span className="text-lg text-gray-300">
            {year} • {genres} • {ageRating}
          </span>
          <span className="bg-red-netflix rounded-full px-3 py-1 text-lg font-semibold text-gray-300">
            TMDB
          </span>
        </div>

        <div className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6">
          <button
            onClick={handleFollowToggle}
            className={`glow-red flex transform items-center space-x-2 rounded-full px-8 py-3 font-bold shadow-lg transition-all duration-300 hover:scale-105 ${isFollowing ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
          >
            {isFollowing ? (
              <>
                <i className="fas fa-check-circle text-xl"></i>
                <span className="text-lg">Following</span>
              </>
            ) : (
              <>
                <i className="fas fa-heart text-xl"></i>
                <span className="text-lg">Follow Show</span>
              </>
            )}
          </button>
          <div className="flex items-center text-lg text-gray-300">
            <i className="fas fa-users mr-2"></i>
            <span className="font-bold">{followerCount.toLocaleString()}</span>
            <span>people followed</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 text-gray-300 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xl font-semibold text-red-400">Director:</h3>
            <p>{director}</p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold text-red-400">Stars:</h3>
            <p>{stars}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
