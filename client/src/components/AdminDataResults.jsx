const AdminDataResults = ({ filteredData, handleFilterSelected }) => {
  return (
    <div className="bg-white py-2 pl-2 -mt-4 mb-3 w-1/4 h-32 overflow-hidden overflow-y-auto scrollbar-hide">
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

export default AdminDataResults;
