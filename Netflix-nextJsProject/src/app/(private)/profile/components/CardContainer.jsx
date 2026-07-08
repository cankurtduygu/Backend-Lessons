

const CardContainer = () => {


  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-10">
      <div className="w-44 mx-auto cursor-pointer group">
        <div  className="w-44 h-44 rounded-md border-2 border-transparent group-hover:border-white overflow-hidden ">
          <img 
            src="./images/default-red.png"
            alt="profile"
            className="w-max h-max object-contain"
          />
        </div>
        <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white ">
         
        </div>
        <div className="w-44 h-44 rounded-md border-2 border-transparent group-hover:border-white overflow-hidden ">
          <img
            src="./images/default-blue.png"
            alt="profile"
            className="w-max h-max object-contain"
          />
        </div>
        <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white ">
       Guest-1
        </div>
        <div className="w-44 h-44 rounded-md border-2 border-transparent group-hover:border-white overflow-hidden ">
          <img
            src="./images/default-green.png"
            alt="profile"
            className="w-max h-max object-contain"
          />
        </div>
        <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white ">
         Guest-2
        </div>
        <div className="w-44 h-44 rounded-md border-2 border-transparent group-hover:border-white overflow-hidden ">
          <img
            src="./images/default-slate.png"
            alt="profile"
            className="w-max h-max object-contain"
          />
        </div>
        <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white ">
         Guest-3
        </div>
      </div>
    </div>
  );
}

export default CardContainer