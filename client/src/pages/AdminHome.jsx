import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AdminDataResults from "../components/AdminDataResults";
import AdminJobList from "../components/AdminJobList";
import AdminNavbar from "../components/AdminNavbar";
import AdminSearchbar from "../components/AdminSearchbar";
import Circles from "../components/Circles";
import CreateForm from "../components/CreateForm";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import { CircularProgress } from "@material-ui/core";
import { AuthContext } from "../contexts/AuthContext";

const AdminHome = () => {
  const [addMode, setAddMode] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedJob, setEditedJob] = useState({});
  const [deleteMode, setDeleteMode] = useState(false);
  const [jobForDelete, setJobForDelete] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [filterMode, setFilterMode] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(5);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/jobs");
        setJobs(res.data);
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    };
    fetchJobs();
  }, []);

  const handleAddMode = () => {
    setAddMode(true);
    setEditMode(false);
  };

  // Jobs of logged in user
  const myJobs = jobs.filter((job) => job.userId === user._id);

  // Output the filtered array in search window
  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = myJobs.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
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

  // Output the filtered array in the homepage
  const handleTheActualFilter = () => {
    setFilterMode(true);
    setFilteredJobs(myJobs.filter((job) => job.title === wordEntered));
  };

  const showEdit = (id) => {
    const foundJob = myJobs.find((job) => job._id === id);
    setEditedJob(foundJob);
    setEditMode(true);
    setAddMode(true);
  };

  const handleDeleteMode = (id) => {
    const foundJob = myJobs.find((job) => job._id === id);
    setJobForDelete(foundJob);
    setDeleteMode(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/jobs/${jobForDelete._id}`, {
        data: { userId: user._id },
      });
      setDeleteMode(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Get a certain amount of jobs on a page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = myJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      className="bg-lightskyblue"
      style={{
        paddingTop: addMode && "50px",
        paddingBottom: addMode && "50px",
      }}
    >
      {!addMode ? (
        <>
          <AdminNavbar />
          <Circles />
          <div className="py-8 px-14">
            <div className="flex items-center justify-between">
              {myJobs.length !== 0 && (
                <AdminSearchbar
                  handleFilter={handleFilter}
                  handleTheActualFilter={handleTheActualFilter}
                  wordEntered={wordEntered}
                />
              )}
              <div>
                <button
                  onClick={handleAddMode}
                  className="md:primaryBtn bg-primary rounded-lg mt-6 ml-2 md:ml-0 text-white text-sm sm:px-1 w-20 md:w-auto py-2"
                >
                  + New Job
                </button>
              </div>
            </div>
            {filteredData.length !== 0 && (
              <AdminDataResults
                filteredData={filteredData}
                handleFilterSelected={handleFilterSelected}
              />
            )}
            {loading ? (
              <CircularProgress
                style={{ marginLeft: "700px", color: "transparent" }}
                className="bg-darkblue"
              />
            ) : error ? (
              <p className="text-center mt-20 text-darkblue text-2xl">
                Can not fetch jobs
              </p>
            ) : (
              <AdminJobList
                myJobs={myJobs}
                showEdit={showEdit}
                handleDeleteMode={handleDeleteMode}
                handleDelete={handleDelete}
                deleteMode={deleteMode}
                setDeleteMode={setDeleteMode}
                jobForDelete={jobForDelete}
                filterMode={filterMode}
                wordEntered={wordEntered}
                currentJobs={currentJobs}
              />
            )}
          </div>
          {myJobs.length !== 0 && (
            <Pagination
              jobsPerPage={jobsPerPage}
              totalJobs={myJobs.length}
              paginate={paginate}
            />
          )}
          <Footer admin={true} />
        </>
      ) : (
        <CreateForm
          setAddMode={setAddMode}
          editMode={editMode}
          setEditMode={setEditMode}
          editedJob={editedJob}
          setEditedJob={setEditedJob}
        />
      )}
    </div>
  );
};

export default AdminHome;
