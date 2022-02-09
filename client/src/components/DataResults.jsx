import { useContext } from "react";
import { filterContext } from "../contexts/filterContext";

const DataResults = () => {
  const { handleFilterSelected, filteredData } = useContext(filterContext);
  return (
    <div className="bg-white py-2 pl-2 w-1/2 lg:w-1/4 h-32 mt-2 overflow-hidden overflow-y-auto scrollbar-hide relative left-5% md:left-12.5%">
      {filteredData.slice(0, 15).map((job) => (
        <p
          onClick={() => handleFilterSelected(job._id)}
          className="text-gray-600 hover:bg-gray-400 hover:text-white"
          key={job._id}
        >
          {job.title}
        </p>
      ))}
    </div>
  );
};

export default DataResults;
