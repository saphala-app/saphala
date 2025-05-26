// components/TrendingSection.tsx
import React from 'react';

const TrendingSection: React.FC = () => {
  return (
    <aside className="col-span-1 hidden md:block">
      <div className="bg-dark-secondary border-dark-red rounded-lg border p-6 shadow-xl">
        <h3 className="text-red-netflix mb-4 flex items-center text-xl font-bold">
          <i className="fas fa-chart-line mr-3"></i> Trending Now
        </h3>
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className="block rounded-md p-3 transition-colors duration-200 hover:bg-gray-800"
            >
              <p className="font-semibold text-gray-200">Vecnas True Motives Discussion</p>
              <p className="text-sm text-gray-400">u/MindFlayerTheory • 5.1K Upvotes</p>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block rounded-md p-3 transition-colors duration-200 hover:bg-gray-800"
            >
              <p className="font-semibold text-gray-200">Maxs Fate in Season 5?</p>
              <p className="text-sm text-gray-400">u/SadieSinkFan • 3.9K Upvotes</p>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block rounded-md p-3 transition-colors duration-200 hover:bg-gray-800"
            >
              <p className="font-semibold text-gray-200">Favorite Soundtrack Song?</p>
              <p className="text-sm text-gray-400">u/80sVibes • 2.7K Upvotes</p>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default TrendingSection;
