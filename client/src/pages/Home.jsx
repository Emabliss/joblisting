import { useEffect, useState } from "react";
import ApplyForm from "../components/ApplyForm";
import Footer from "../components/Footer";
import JobDetail from "../components/JobDetail";
import JobList from "../components/JobList";
import axios from "axios";
import { filterContext } from "../contexts/filterContext";
import DataResults from "../components/DataResults";
import HomeSearchbar from "../components/HomeSearchbar";
import HomeNavbar from "../components/HomeNavbar";

const Home = () => {
  const [detailMode, setDetailMode] = useState(false);
  const [applyMode, setApplyMode] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [singleJob, setSingleJob] = useState({});
  const [selected, setSelected] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [filterMode, setFilterMode] = useState(false);
  const [wordEntered, setWordEntered] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [location, setLocation] = useState("");
  const [locationMode, setLocationMode] = useState(false);

  const changeColor = (id) => {
    setSelected(id);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/jobs");
        setJobs(res.data);
      } catch (err) {}
    };
    fetchJobs();
  }, []);

  // Show the selected job in detail mode and highlight
  const handleClick = (id) => {
    const trabajo = jobs.find((job) => job._id === id);
    setSingleJob(trabajo);
    setDetailMode(true);
    changeColor(id);
  };

  // Output the filtered array in search window
  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = jobs.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
      window.location.reload();
    } else {
      setFilteredData(newFilter);
    }
  };

  // Put the selected array item title in the search bar
  const handleFilterSelected = (id) => {
    const selectedItem = filteredData.find((item) => item._id === id).title;
    setWordEntered(selectedItem);
    setFilteredData([]);
  };

  // Handle onchange for location input
  const handleLocationOnchange = (e) => {
    setLocation(e.target.value);
    setLocationMode(true);
  };

  // Output the filtered array in the homepage
  const handleTheActualFilter = () => {
    setFilterMode(true);
    setDetailMode(false);
    setFilteredJobs(jobs.filter((job) => job.title === wordEntered));
  };

  return (
    <div
      className={`bg-lightskyblue min-h-screen overflow-hidden ${
        applyMode && "py-50"
      }`}
    >
      {!applyMode ? (
        <>
          <HomeNavbar />
          <filterContext.Provider
            value={{
              handleFilter,
              wordEntered,
              handleFilterSelected,
              handleLocationOnchange,
              location,
              locationMode,
              filteredData,
              handleTheActualFilter,
              filterMode,
              filteredJobs,
            }}
          >
            <HomeSearchbar />
            {filteredData.length !== 0 && <DataResults />}
            <div
              className={`${!detailMode ? "lg:px-250" : "px-80"} ${
                !detailMode ? "px-20" : "px-10"
              } ${detailMode && "mb-3"} md:flex relative`}
            >
              <JobList
                detailMode={detailMode}
                selected={selected}
                handleClick={handleClick}
                applyMode={applyMode}
                setApplyMode={setApplyMode}
                setSingleJob={setSingleJob}
              />
              {detailMode && (
                <JobDetail
                  setDetailMode={setDetailMode}
                  setApplyMode={setApplyMode}
                  singleJob={singleJob}
                  setSelected={setSelected}
                />
              )}
            </div>
          </filterContext.Provider>
          <Footer />
        </>
      ) : (
        <ApplyForm
          setDetailMode={setDetailMode}
          setApplyMode={setApplyMode}
          singleJob={singleJob}
          setSelected={setSelected}
        />
      )}
    </div>
  );
};

export default Home;
