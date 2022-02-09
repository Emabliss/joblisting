import { Link } from "react-router-dom";
import Funnel from "../images/funnel.png";

const AdminJobList = ({
  myJobs,
  currentJobs,
  showEdit,
  handleDeleteMode,
  handleDelete,
  deleteMode,
  setDeleteMode,
  jobForDelete,
  filterMode,
  wordEntered,
}) => {
  const displayUsers =
    filterMode && wordEntered !== ""
      ? myJobs
          .filter((j) => j.title === wordEntered)
          .map((j) => (
            <>
              <tr className="bg-white shadow-lg md:text-lg text-sm relative">
                <td className="py-6 pl-10">
                  <div className="bg-primary w-3 h-3 rounded-full absolute top-8 left-3"></div>
                  {j.title}
                </td>
                <td>{new Date(j.createdAt).toDateString()}</td>
                <td>
                  {j.applications.length < 1 ? (
                    "NIL"
                  ) : (
                    <Link to={`/applicants/${j._id}`}>
                      {j.applications.length}
                    </Link>
                  )}
                </td>
                <td>
                  <button
                    className="bg-primary text-white px-4 rounded-md"
                    onClick={() => showEdit(j._id)}
                  >
                    Edit
                  </button>
                  {deleteMode && jobForDelete._id === j._id ? (
                    <>
                      <button
                        className="text-cyan-500 border-2 border-cyan-500 mt-3 px-2 md:ml-10"
                        onClick={handleDelete}
                      >
                        Continue
                      </button>
                      <span
                        className="ml-3 text-sm text-cyan-500 cursor-pointer"
                        onClick={() => setDeleteMode(false)}
                      >
                        Undo
                      </span>
                    </>
                  ) : (
                    <button
                      className="text-cyan-500 border-2 border-cyan-500 mt-3 px-2 md:ml-10"
                      onClick={() => handleDeleteMode(j._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
              <br />
            </>
          ))
      : currentJobs.map((j) => (
          <>
            <tr className="bg-white shadow-lg md:text-lg text-sm relative">
              <td className="py-6 pl-10">
                <div className="bg-primary w-3 h-3 rounded-full absolute top-8 left-3"></div>
                {j.title}
              </td>
              <td>{new Date(j.createdAt).toDateString()}</td>
              <td className="text-center w-20">
                {j.applications.length < 1 ? (
                  "NIL"
                ) : (
                  <Link to={`/applicants/${j._id}`}>
                    {j.applications.length}
                  </Link>
                )}
              </td>
              <td>
                <button
                  className="bg-primary text-white px-4 rounded-md md:ml-6"
                  onClick={() => showEdit(j._id)}
                >
                  Edit
                </button>
                {deleteMode && jobForDelete._id === j._id ? (
                  <>
                    <button
                      className="text-cyan-500 border-2 border-cyan-500 mt-3 px-2 md:ml-10"
                      onClick={handleDelete}
                    >
                      Continue
                    </button>
                    <span
                      className="ml-3 text-sm text-cyan-500 cursor-pointer"
                      onClick={() => setDeleteMode(false)}
                    >
                      Undo
                    </span>
                  </>
                ) : (
                  <button
                    className="text-cyan-500 border-2 border-cyan-500 mt-3 px-2 md:ml-10"
                    onClick={() => handleDeleteMode(j._id)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
            <br />
          </>
        ));

  return (
    <div>
      <table className="w-full text-left">
        <tr className="bg-darkblue rounded-xl mb-8 text-white md:text-lg text-sm">
          <td className="py-6 pl-4">Job Title</td>
          <td>Date Modified</td>
          <td>Candidates</td>
          <td className="pl-4 md:ml-0 flex items-center mt-5 relative left-6 top-0.5 w-28">
            Filter
            <img src={Funnel} alt="Funnel" className="ml-2" />
          </td>
        </tr>
        <br />
        {displayUsers}
      </table>
    </div>
  );
};

export default AdminJobList;
