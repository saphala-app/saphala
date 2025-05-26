// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-secondary border-dark-red mt-16 border-t px-6 py-8 text-center text-gray-400 shadow-inner">
      <p>&copy; 2025 Saphala</p>
      <div className="mt-4 flex justify-center space-x-6">
        <a href="#" className="hover:text-red-netflix transition-colors duration-300">
          <i className="fab fa-twitter text-xl"></i>
        </a>
        <a href="#" className="hover:text-red-netflix transition-colors duration-300">
          <i className="fab fa-instagram text-xl"></i>
        </a>
        <a href="#" className="hover:text-red-netflix transition-colors duration-300">
          <i className="fab fa-facebook text-xl"></i>
        </a>
        <a href="#" className="hover:text-red-netflix transition-colors duration-300">
          <i className="fab fa-reddit-alien text-xl"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
