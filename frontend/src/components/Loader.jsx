


import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Outer fast spinner */}
        <div className="absolute w-16 h-16 border-4 border-transparent border-t-purple-500 border-r-purple-500 rounded-full animate-spin"></div>
        {/* Inner slow spinner */}
        <div className="w-12 h-12 border-4 border-transparent border-t-pink-500 border-l-pink-500 rounded-full animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default Loader;
