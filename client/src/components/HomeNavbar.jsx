import Logo from "../images/FindJobs.png";
import { Link } from "react-router-dom";
import Circles from "./Circles";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { Close, MenuOutlined } from "@material-ui/icons";

const HomeNavbar = () => {
  const { user } = useContext(AuthContext);
  const [opened, setOpened] = useState(false);
  return (
    <div className="bg-darkblue h-72 sm:h-96 relative overflow-hidden">
      <div className="pt-4 sm:pt-10 px-5 lg:px-32 flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-28 sm:w-full" />
        </Link>
        <ul className="hidden sm:flex space-x-5 md:text-2xl">
          <li className=" text-gray-300 visited:text-white font-semibold">
            <Link to="/">Company Review</Link>
          </li>
          <li className=" text-gray-300 visited:text-white font-semibold">
            <Link to="/">Find Salaries</Link>
          </li>
          {user && (
            <li className=" text-gray-300 visited:text-white font-semibold">
              <Link to="/admin">My Jobs</Link>
            </li>
          )}
          <li className="text-lg bg-navbtn text-darkblue visited:text-white font-bold py-1 px-2 rounded-md">
            {user ? (
              <Link to="/admin">Post Job</Link>
            ) : (
              <Link to="/login">Post Job</Link>
            )}
          </li>
        </ul>
        <div
          className="block sm:hidden cursor-pointer text-white"
          onClick={() => setOpened(!opened)}
        >
          {!opened ? <MenuOutlined /> : <Close />}
        </div>
      </div>
      <ul
        className="block sm:hidden space-y-4 mt-2 text-sm w-32 absolute ease-in duration-300 z-10"
        style={{
          right: !opened ? "-140px" : "0px",
        }}
      >
        <li className=" text-gray-300 visited:text-white font-semibold">
          <Link to="/">Company Review</Link>
        </li>
        <li className=" text-gray-300 visited:text-white font-semibold">
          <Link to="/">Find Salaries</Link>
        </li>
        {user && (
          <li className="text-gray-300 visited:text-white font-semibold">
            <Link to="/admin">My Jobs</Link>
          </li>
        )}

        <li className="w-16 bg-navbtn text-darkblue visited:text-white font-bold py-1 px-1 rounded-md">
          {user ? (
            <Link to="/admin">Post Job</Link>
          ) : (
            <Link to="/login">Post Job</Link>
          )}
        </li>
      </ul>
      <h1
        className="text-white text-3xl sm:text-4xl md:text-5xl pt-16 sm:pt-28 pl-44 ease-in duration-300"
        style={{ opacity: opened && 0 }}
      >
        Find Your Dream Job
      </h1>
      <Circles />
    </div>
  );
};

export default HomeNavbar;
