import Location from "../images/Vector2.png";
import ReactMarkdown from "react-markdown";
import { HomeWork } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Job = ({
  detailMode,
  handleClick,
  job,
  selected,
  loading,
  applyMode,
  toggleDetail,
  showMobileDetail,
  selectedMobile,
  setApplyMode,
  setSingleJob,
}) => {
  const handleApplyMode = () => {
    setApplyMode(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setSingleJob(job);
  };

  return (
    <div
      className={`w-4/4 bg-white rounded-md shadow-lg p-7 mb-5 ${
        selected === job._id && "bg-darkblue"
      } ${selected === job._id && "text-white"}`}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex justify-between">
            <h3
              className="text-darkblue lg:text-2xl md:text-xl text-lg text tracking-wider font-bold"
              style={{
                color: selected === job._id && "white",
              }}
            >
              {job.title}
            </h3>
            <span
              className="text-darkblue lg:text-2xl md:text-xl text-lg font-semibold"
              style={{
                color: selected === job._id && "white",
              }}
            >
              <span
                className="text-darkblue lg:text-2xl md:text-xl text-lg font-semibold"
                style={{
                  color: selected === job._id && "white",
                }}
              >
                $
              </span>
              {job.salary}
            </span>
          </div>
          <div className="flex mt-2 items-center">
            <HomeWork
              className="text-gray-500"
              style={{
                color: selected === job._id && "white",
              }}
            />
            <p
              className="ml-1 md:text-lg text-sm font-bold  text-darkblue"
              style={{
                color: selected === job._id && "white",
              }}
            >
              {job.company}
            </p>
          </div>
          <div className="flex items-center mt-2">
            <img src={Location} alt="Location" />
            <span
              className="ml-1 text-gray-600"
              style={{
                color: selected === job._id && "white",
              }}
            >
              {job.location}
            </span>
          </div>
          <p
            className="mt-2 text-gray-600"
            style={{
              color: selected === job._id && "white",
            }}
          >
            Job Type: {job.type}
          </p>
          <div
            className="line-clamp-3 mt-3 text-gray-600"
            style={{
              color: selected === job._id && "white",
            }}
          >
            <ReactMarkdown children={job.desc} />
          </div>
          <button
            className="primaryBtn hidden md:block ml-auto mt-3"
            onClick={() => {
              handleClick(job._id);
              window.scrollTo({
                top: 120,
                behavior: "smooth",
              });
            }}
          >
            See More
          </button>
          <button
            className="primaryBtn block md:hidden ml-auto mt-3"
            onClick={() => toggleDetail(job._id)}
          >
            {showMobileDetail && selectedMobile._id === job._id
              ? "Show Less"
              : "Show More"}
          </button>
          {showMobileDetail && selectedMobile._id === job._id ? (
            <div className="block md:hidden h-320 overflow-y-auto">
              <ReactMarkdown className="prose" children={job.desc} />
              <Link
                onClick={handleApplyMode}
                className="bg-darkblue text-white rounded-lg py-2 px-5 mt-4 block text-center md:text-xl text-sm font-light tracking-wider"
              >
                Apply Via Find Job
              </Link>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
};

export default Job;
