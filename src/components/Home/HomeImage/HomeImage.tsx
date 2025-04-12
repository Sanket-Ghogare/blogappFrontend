import React from 'react';

const HomeImages = () => {
  return (
    <div className="relative dark:bg-gray-800">
      <div className="relative h-72 sm:h-64 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg"
          className="w-full h-full object-cover"
          alt="image"
        />
      </div>
      {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="font-bold text-6xl">BLOG</h1>
        <p className="sm:text-2xl ss:text-xl xxs:text-xl  text-black  bg-white inline-block p-2">
          Code for Interview
        </p>
      </div> */}
    </div>
  );
};

export default HomeImages;
