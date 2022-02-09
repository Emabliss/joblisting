const Circles = () => {
  return (
    <div className="absolute top-10 right-0 bg-red-500 z-10">
      <div className="relative">
        <div className="lg:w-lg lg:h-lg rounded-full lg:border-8 absolute top-10 right-0 border-lightcyan"></div>
        <div className="lg:w-md lg:h-md rounded-full lg:border-4 absolute top-36 right-32 border-primary"></div>
        <div className="lg:w-sm lg:h-sm rounded-full lg:border-4 absolute top-52 right-52 border-lightcyan"></div>
      </div>
    </div>
  );
};

export default Circles;
