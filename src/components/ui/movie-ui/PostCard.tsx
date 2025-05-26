'use client';

// components/PostCard.tsx
import React, { useState } from 'react';
import Image from 'next/image';

interface PostCardProps {
  avatarSrc: string;
  username: string;
  timeAgo: string;
  tag: string;
  title: string;
  content: string;
  imageUrl?: string;
  initialUpvotes: number;
  commentsCount: number;
}

const PostCard: React.FC<PostCardProps> = ({
  avatarSrc,
  username,
  timeAgo,
  tag,
  title,
  content,
  imageUrl,
  initialUpvotes,
  commentsCount,
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleVote = (voteType: 'up' | 'down') => {
    if (voteType === 'up') {
      if (userVote === 'up') {
        setUpvotes(prev => prev - 1);
        setUserVote(null);
      } else {
        setUpvotes(prev => prev + (userVote === 'down' ? 2 : 1));
        setUserVote('up');
      }
    } else {
      // voteType === 'down'
      if (userVote === 'down') {
        setUpvotes(prev => prev + 1);
        setUserVote(null);
      } else {
        setUpvotes(prev => prev - (userVote === 'up' ? 2 : 1));
        setUserVote('down');
      }
    }
  };

  return (
    <div className="post-card border-dark-red flex transform rounded-xl border p-6 shadow-xl hover:translate-y-[-5px] hover:shadow-2xl">
      <div className="mr-4 flex flex-col items-center text-gray-400">
        <button
          onClick={() => handleVote('up')}
          className={`vote-button text-xl ${userVote === 'up' ? 'active' : ''}`}
        >
          <i className="fas fa-caret-up"></i>
        </button>
        <span className="my-1 text-xl font-bold text-gray-200">{upvotes.toLocaleString()}</span>
        <button
          onClick={() => handleVote('down')}
          className={`vote-button text-xl ${userVote === 'down' ? 'active' : ''}`}
        >
          <i className="fas fa-caret-down"></i>
        </button>
      </div>
      <div className="flex-grow">
        <div className="mb-3 flex items-center text-sm">
          <Image
            src={avatarSrc}
            alt="Avatar"
            width={32}
            height={32}
            className="border-light-red-accent mr-3 rounded-full border-2"
          />
          <span className="mr-2 text-lg font-semibold text-red-300">{username}</span>
          <span className="text-gray-500">• {timeAgo}</span>
          <span className="ml-auto hidden rounded-full bg-gray-700 px-3 py-1 text-xs text-gray-300 sm:block">
            {tag}
          </span>
        </div>
        <h3 className="mb-3 text-3xl leading-tight font-extrabold text-gray-100">{title}</h3>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            className="mb-5 h-auto max-h-96 w-full rounded-lg border border-gray-700 object-cover shadow-md"
          />
        )}
        <p className="mb-5 leading-relaxed text-gray-300">{content}</p>
        <div className="mt-4 flex flex-wrap items-center space-x-4 text-base text-gray-400 md:space-x-6">
          <a href="#" className="comment-action hover:text-white">
            <i className="fas fa-comment-alt mr-2"></i> {commentsCount} Comments
          </a>
          <a href="#" className="share-action hover:text-white">
            <i className="fas fa-share-alt mr-2"></i> Share
          </a>
          <a href="#" className="save-action hover:text-white">
            <i className="fas fa-bookmark mr-2"></i> Save
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
