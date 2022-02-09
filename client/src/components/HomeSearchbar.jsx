import { useContext } from "react";
import { filterContext } from "../contexts/filterContext";
import Search from "../images/Vector.png";
import Location from "../images/Vector2.png";

const HomeSearchbar = () => {
  const {
    handleFilter,
    wordEntered,
    handleTheActualFilter,
    handleLocationOnchange,
  } = useContext(filterContext);

  return (
    <div className="bg-white w-ninety md:w-3/4 shadow-lg rounded-md py-3 md:py-5 px-2 -mt-10 mx-auto flex justify-between z-20 relative">
      <div className="flex flex-1 items-center">
        <img src={Search} alt="Search" className="w-7 h-7" />
        <input
          type="text"
          placeholder="Search..."
          className="w-4/5 ml-0.5 md:ml-3 px-1 md:px-3 py-1 text-sm md:text-lg focus:outline-none"
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
      <div className="h-10 w-0.5 bg-lightcyan flex-0.1"></div>
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center ml-4">
          <img src={Location} alt="Location" />
          <input
            type="text"
            placeholder="Lagos, Nigeria"
            className="w-full ml-0.5 md:ml-3 px-1 md:px-3 py-1 text-sm md:text-lg focus:outline-none"
            onChange={handleLocationOnchange}
          />
        </div>
        <button onClick={handleTheActualFilter} className="primaryBtn">
          Search
        </button>
      </div>
    </div>
  );
};

export default HomeSearchbar;
