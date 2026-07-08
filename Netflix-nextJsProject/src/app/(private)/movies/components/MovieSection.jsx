



import React from 'react'
import MovieCard from './MovieCard';

const MovieSection = async() => {




  return (
    <div className="mb-4">
      <p className="text-white  text-md lg:text-2xl font-semibold mb-4">
        {}
      </p>

      <div className="grid grid-flow-col gap-2 overflow-x-scroll ">
        {[]?.map((film) => (
          <MovieCard  />
        ))}  
      </div>
    </div>
  );
}

export default MovieSection




