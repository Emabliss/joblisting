import Logo from "../images/FindJobs.png";
import Bell from "../images/Bell.png";
import Avatar from "../images/Avatar.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AdminNavbar = () => {
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="bg-darkblue md:h-72 h-60 md:px-24 px-14 pt-7 pb-10">
      <div className=" flex items-center justify-between">
        <div>
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <span className="text-white">For employers</span>
        </div>
        <div className="flex items-center relative">
          <img src={Bell} alt="logo" />
          <img src={Avatar} alt="logo" className="ml-5" />
          <div className="w-2 h-2 bg-primary rounded-full absolute left-3 top-4"></div>
          <button
            onClick={handleLogout}
            className="text-white ml-4 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
      <h2 className="text-white md:pt-20 pt-14 md:text-5xl text-4xl font-semibold italic">
        Jobs
      </h2>
    </div>
  );
};
export default AdminNavbar;
