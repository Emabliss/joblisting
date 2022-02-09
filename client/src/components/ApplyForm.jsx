import Location from "../images/Vector2.png";
import FormInput from "./FormInput";
import { useState } from "react";
import axios from "axios";

const ApplyForm = ({ setDetailMode, setApplyMode, singleJob, setSelected }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  const handleModes = () => {
    setDetailMode(false);
    setApplyMode(false);
    setSelected({});
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setError(false);
    const newGuest = {
      firstname,
      lastname,
      email,
      location,
      phone,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newGuest.cv = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    try {
      setLoading(true);
      const result = await axios.post("/guests", newGuest);
      await axios.put(`/jobs/${singleJob._id}/apply`, {
        userId: result.data._id,
      });
      setLoading(false);
      setApplied(true);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-lighterskyblue lg:w-1/3 p-8 w-2/3 m-auto"
      style={{
        marginTop: applied && "200px",
        display: applied && "grid",
        placeItems: "center",
      }}
    >
      {applied ? (
        <h3 className="text-gray-600 text-2xl">
          Thank You!
          <span
            className="cursor-pointer"
            onClick={() => {
              setApplyMode(false);
              setDetailMode(false);
              window.location.reload();
            }}
          >
            Now click here
          </span>
        </h3>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-darkblue tracking-wider text-lg font-semibold">
              {singleJob.title}
            </h2>
            <span
              onClick={handleModes}
              className="cursor-pointer text-gray-700"
            >
              X
            </span>
          </div>
          <div className="flex items-center space-x-2 my-3">
            <img src={Location} alt="Location" />
            <span>{singleJob.location}</span>
          </div>
          <form className="space-y-6" onSubmit={handleApply}>
            <FormInput
              id="firstName"
              title="First Name"
              type="text"
              onChange={(e) => setFirstname(e.target.value)}
            />
            <FormInput
              id="lastName"
              title="Last Name"
              type="text"
              onChange={(e) => setLastname(e.target.value)}
            />
            <FormInput
              id="email"
              title="Email Address"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              id="location"
              title="Location"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
            />
            <FormInput
              id="phoneNumber"
              title="Phone Number"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="w-full h-32 rounded-lg border-2 border-cyan-500 flex justify-center items-center">
              <div className="w-60">
                {file && (
                  <div className="w-full h-5 pr-1 text-white bg-darkblue mb-2 text-right">
                    <span
                      className="cursor-pointer"
                      onClick={() => setFile(null)}
                    >
                      X
                    </span>
                  </div>
                )}
                <label
                  htmlFor="file"
                  className="bg-darkblue text-white text-sm px-6 py-2 rounded-lg m-auto block w-32 text-center"
                >
                  Browse files
                </label>
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>
            </div>
            <button
              className="bg-darkblue text-white text-sm py-3 tracking-wider w-full"
              type="submit"
            >
              {loading ? "Please wait..." : "Submit Application"}
            </button>
            {error && (
              <span className="text-red-500 text-sm">
                Make sure you have strong network and haven't already applied
              </span>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default ApplyForm;
