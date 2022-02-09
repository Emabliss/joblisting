import Search from "../images/Vector.png";

const AdminSearchbar = ({
  handleFilter,
  wordEntered,
  handleTheActualFilter,
}) => {
  return (
    <div className="py-5 w-2/4">
      <div className="bg-white shadow-xl mt-7 md:py-3 py-1 md:px-3 px-1 rounded-lg flex flex-1 items-center">
        <img src={Search} alt="Search" className="w-7 h-7" />
        <input
          type="text"
          placeholder="Search..."
          className="w-4/5 ml-3 px-3 py-1 text-lg focus:outline-none"
          value={wordEntered}
          onChange={handleFilter}
        />
        <button
          className="mr-2 primaryBtn text-sm md:text-xl"
          onClick={handleTheActualFilter}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default AdminSearchbar;
