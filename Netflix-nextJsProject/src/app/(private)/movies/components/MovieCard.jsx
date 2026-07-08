import React from "react";

const MovieCard = () => {


  return (
   
    <div

      className="w-40 h-[240] cursor-pointer relative"
    >
      
      <Image
        width={160}
        height={240}
     
      />

      <span className="text-white absolute bottom-1 right-1 font-semibold">
        {" "}
        {}
      </span>
    </div>
  );
};

export default MovieCard;
