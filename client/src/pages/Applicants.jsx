import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../images/FindJobs.png";

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/guests/applicants/${id}`);
        setApplicants(res.data);
        setLoading(false);
      } catch (err) {
        setError(true);
      }
    };
    fetchApplicants();
  }, [id]);

  return (
    <div className="bg-darkblue min-h-screen pb-5">
      <div className="bg-red-500 py-5">
        <Link to="/admin">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <br />
      {loading ? (
        <CircularProgress
          style={{ marginLeft: "700px", color: "transparent" }}
          className="bg-white mt-60"
        />
      ) : error ? (
        <p className="text-center mt-60 text-white text-2xl">
          Can not fetch jobs
        </p>
      ) : (
        <div className="mt-7 flex flex-wrap">
          {applicants.map((applicant) => (
            <div
              key={applicant._id}
              className="w-82 rounded-md shadow-md bg-gray-50 m-auto mb-3 p-6 text-darkblue"
            >
              <p>
                Name:
                <span className="ml-2">
                  {applicant.first_name + " " + applicant.last_name}
                </span>
              </p>
              <p>
                Email: <span className="ml-2">{applicant.email}</span>
              </p>
              <p>
                Location: <span className="ml-2">{applicant.location}</span>
              </p>
              <p>
                Phone: <span className="ml-2">{applicant.phone}</span>
              </p>
              <a href={PF + applicant.cv} target="_blank" rel="noreferrer">
                <p className="text-center mt-1 bg-darkblue text-white rounded-md">
                  View CV
                </p>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicants;
