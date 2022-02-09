import axios from "axios";
import { useEffect, useState } from "react";
import Job from "./Job";
import { useContext } from "react";
import { filterContext } from "../contexts/filterContext";
import Pagination from "./Pagination";

const JobList = ({
  detailMode,
  handleClick,
  selected,
  applyMode,
  setApplyMode,
  setSingleJob,
}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [sortedJobs, setSortedJobs] = useState([]);
  const [sorts, setSorts] = useState("newest");
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [selectedMobile, setSelectedMobile] = useState(false);

  const toggleDetail = (id) => {
    const selected = jobs.find((job) => job._id === id);
    setSelectedMobile(selected);
    setShowMobileDetail(!showMobileDetail);
  };
  const {
    filterMode,
    wordEntered,
    filteredData,
    filteredJobs,
    location,
    locationMode,
  } = useContext(filterContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/jobs");
        setJobs(res.data);
        setLoading(false);
      } catch (err) {}
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (sorts === "newest") {
      setSortedJobs(jobs.sort((a, b) => a.createdAt - b.createdAt));
    } else if (sorts === "asc") {
      setSortedJobs(jobs.sort((a, b) => b.salary - a.salary));
    } else {
      setSortedJobs(jobs.sort((a, b) => a.salary - b.salary));
    }
  }, [sorts, jobs]);

  const filterByLocation = jobs.filter((job) =>
    job.location.toLowerCase().includes(location.toLowerCase())
  );

  // Get a certain amount of jobs on a page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  let currentJobs = [];
  if (locationMode) {
    currentJobs = filterByLocation.slice(indexOfFirstJob, indexOfLastJob);
  } else if (filterMode) {
    currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  } else {
    currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  }

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 350,
      behavior: "smooth",
    });
  };

  const displayJobs =
    filterMode && wordEntered !== ""
      ? jobs
          .filter((j) => j.title === wordEntered)

          .map((j) => (
            <Job
              detailMode={detailMode}
              handleClick={handleClick}
              key={j._id}
              job={j}
              selected={selected}
              toggleDetail={toggleDetail}
              showMobileDetail={showMobileDetail}
              selectedMobile={selectedMobile}
              setApplyMode={setApplyMode}
              setSingleJob={setSingleJob}
            />
          ))
      : location
      ? filterByLocation.map((j) => (
          <Job
            detailMode={detailMode}
            handleClick={handleClick}
            key={j._id}
            job={j}
            selected={selected}
            toggleDetail={toggleDetail}
            showMobileDetail={showMobileDetail}
            selectedMobile={selectedMobile}
            setApplyMode={setApplyMode}
            setSingleJob={setSingleJob}
          />
        ))
      : currentJobs.map((j) => (
          <Job
            detailMode={detailMode}
            handleClick={handleClick}
            key={j._id}
            job={j}
            selected={selected}
            loading={loading}
            applyMode={applyMode}
            toggleDetail={toggleDetail}
            showMobileDetail={showMobileDetail}
            selectedMobile={selectedMobile}
            setApplyMode={setApplyMode}
            setSingleJob={setSingleJob}
          />
        ));

  return (
    <div
      className={`${!detailMode ? "w-full" : "md:w-1/2"} w-full ${
        detailMode && "h-840"
      } ${detailMode && "overflow-y-auto"} ${detailMode && "mt-70"}`}
    >
      <div
        className={`flex w-full mb-10 ${!detailMode && "mt-16"} ${
          detailMode && "absolute"
        } ${detailMode && "md:top-8"} ${detailMode && "-top-8"} ${
          detailMode && "ml-36"
        } -left-24`}
      >
        {filterMode && wordEntered !== "" ? (
          <span className="md:text-lg text-sm w-1/2">
            {filteredJobs.length > 1
              ? `Showing ${filteredJobs.length} results`
              : `Showing ${filteredJobs.length} result`}
          </span>
        ) : locationMode && location !== "" ? (
          <span className="md:text-lg text-sm w-50%">
            {filterByLocation.length > 1
              ? `Showing ${filterByLocation.length} results`
              : `Showing ${filterByLocation.length} result`}
          </span>
        ) : (
          <span className="sm:text-lg text-xs w-forty">{`Showing ${currentJobs.length} results`}</span>
        )}
        <div className="ml-40 w-50%">
          <span className="text-gray-400 lg:text-lg text-sm">Sort by:</span>
          <select
            className="ml-1 bg-lightskyblue sm:w-80 w-16 outline-none"
            onChange={(e) => setSorts(e.target.value)}
          >
            <option value="newest">Latest</option>
            <option value="desc">Highest Pay</option>
            <option value="asc">Lowest Pay</option>
          </select>
        </div>
      </div>
      {displayJobs}
      {!detailMode && !filterMode && (
        <Pagination
          jobsPerPage={jobsPerPage}
          totalJobs={jobs.length}
          paginate={paginate}
        />
      )}
    </div>
  );
};

export default JobList;
