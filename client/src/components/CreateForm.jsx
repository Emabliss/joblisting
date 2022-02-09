import { useState, useContext } from "react";
import FormInput from "./FormInput";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const CreateForm = ({ setAddMode, editMode, setEditMode, editedJob }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [deadline, setDeadline] = useState("");
  const [option, setOption] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const { user } = useContext(AuthContext);

  // The lines below are so that we can upload our updated posts
  const [editedTitle, setEditedTitle] = useState(editedJob.title);
  const [editedCompanyName, setEditedCompanyName] = useState(editedJob.company);
  const [editedLocation, setEditedLocation] = useState(editedJob.location);
  const [editedSalary, setEditedSalary] = useState(editedJob.salary);
  const [editedDeadline, setEditedDeadline] = useState(editedJob.deadline);
  const [editedOption, setEditedOption] = useState(editedJob.type);
  const [editedCategory, setEditedCategory] = useState(editedJob.category);
  const [editedDesc, setEditedDesc] = useState(editedJob.desc);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const newJob = {
      userId: user._id,
      title: jobTitle,
      company: companyName,
      location,
      salary,
      deadline,
      type: option,
      category,
      desc,
    };
    try {
      setLoading(true);
      await axios.post("/jobs", newJob);
      setLoading(false);
      setAddMode(false);
      window.location.reload();
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`/jobs/${editedJob._id}`, {
        userId: user._id,
        title: editedTitle,
        company: editedCompanyName,
        location: editedLocation,
        salary: editedSalary,
        deadline: editedDeadline,
        type: editedOption,
        category: editedCategory,
        desc: editedDesc,
      });
      setEditMode(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddMode = () => {
    setAddMode(false);
    setEditMode(false);
  };

  return (
    <div className="bg-lighterskyblue  py-14 px-8 lg:w-forty w-3/4 m-auto relative">
      <h2 className="text-darkblue text-lg font-semibold tracking-wider">
        New Job
      </h2>
      <span
        onClick={handleAddMode}
        className="cursor-pointer text-gray-700 absolute top-12 right-6"
      >
        X
      </span>
      <span className="my-3 text-xs text-gray-500">
        Kindly provide the required information to get matched with suitable
        candidates
      </span>
      <form
        className="space-y-6 mt-3"
        onSubmit={editMode ? handleEditSubmit : handleSubmit}
      >
        {editMode ? (
          <FormInput
            id="jobTitle"
            title="Job Title"
            type="text"
            onChange={(e) => setEditedTitle(e.target.value)}
            autoFocus
            value={editedTitle}
          />
        ) : (
          <FormInput
            id="jobTitle"
            title="Job Title"
            type="text"
            onChange={(e) => setJobTitle(e.target.value)}
          />
        )}
        {editMode ? (
          <FormInput
            id="companyName"
            title="Company Name"
            type="text"
            onChange={(e) => setEditedCompanyName(e.target.value)}
            value={editedCompanyName}
          />
        ) : (
          <FormInput
            id="companyName"
            title="Company Name"
            type="text"
            onChange={(e) => setCompanyName(e.target.value)}
          />
        )}
        {editMode ? (
          <FormInput
            id="location"
            title="Location"
            type="text"
            onChange={(e) => setEditedLocation(e.target.value)}
            value={editedLocation}
          />
        ) : (
          <FormInput
            id="location"
            title="Location"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
          />
        )}
        <div>
          <p className="text-darkblue text-sm tracking-wider font-semibold">
            What type of employment is this?
          </p>
          {editMode ? (
            <select
              className="formInput text-gray-500"
              onChange={(e) => setEditedOption(e.target.value)}
            >
              <option selected>Select Option</option>
              <option value="Fulltime">Full-time</option>
              <option value="Temporary">Temporary</option>
              <option value="Contract">Contract</option>
              <option value="Permanent">Permanent</option>
              <option value="Internship">Internship</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Remote">Remote</option>
            </select>
          ) : (
            <select
              className="formInput text-gray-500"
              onChange={(e) => setOption(e.target.value)}
            >
              <option selected>Select Option</option>
              <option value="Fulltime">Full-time</option>
              <option value="Temporary">Temporary</option>
              <option value="Contract">Contract</option>
              <option value="Permanent">Permanent</option>
              <option value="Internship">Internship</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Remote">Remote</option>
            </select>
          )}
        </div>
        {editMode ? (
          <FormInput
            id="salary"
            title="Salary"
            type="text"
            onChange={(e) => setEditedSalary(e.target.value)}
            value={editedSalary}
          />
        ) : (
          <FormInput
            id="salary"
            title="Salary"
            type="text"
            onChange={(e) => setSalary(e.target.value)}
          />
        )}
        {editMode ? (
          <FormInput
            id="deadline"
            title="Submission Deadline"
            type="text"
            onChange={(e) => setEditedDeadline(e.target.value)}
            value={editedDeadline}
          />
        ) : (
          <FormInput
            id="deadline"
            title="Submission Deadline"
            type="text"
            onChange={(e) => setDeadline(e.target.value)}
          />
        )}
        <div>
          <p className="text-darkblue text-sm tracking-wider font-semibold">
            What Sector is this job categorized under?
          </p>
          {editMode ? (
            <select
              className="formInput text-gray-500"
              onChange={(e) => setEditedCategory(e.target.value)}
            >
              <option selected>Select Option</option>
              <option value="Tech">Tech</option>
              <option value="Health Care">Health Care</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Customer Service">Customer Service</option>
              <option value="Marketing">Marketing</option>
            </select>
          ) : (
            <select
              className="formInput text-gray-500"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option selected>Select Option</option>
              <option value="Tech">Tech</option>
              <option value="Health Care">Health Care</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Customer Service">Customer Service</option>
              <option value="Marketing">Marketing</option>
            </select>
          )}
        </div>
        <div>
          <label
            htmlFor="jobRole"
            className="block text-darkblue text-sm tracking-wider font-semibold"
          >
            Job Role(Please use markdown format)
          </label>
          {editMode ? (
            <textarea
              id="jobRole"
              className="formInput h-xl"
              onChange={(e) => setEditedDesc(e.target.value)}
              value={editedDesc}
            ></textarea>
          ) : (
            <textarea
              id="jobRole"
              className="formInput h-xl"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          )}
        </div>
        <button
          type="submit"
          className="bg-darkblue text-white text-sm py-3 tracking-wider w-full"
        >
          {editMode ? "Update" : loading ? "Please Wait..." : "Submit Job"}
        </button>
        {error && <span className="text-red-500">Something went wrong!</span>}
      </form>
    </div>
  );
};

export default CreateForm;
