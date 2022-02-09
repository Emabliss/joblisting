import { Link } from "react-router-dom";
import Logo from "../images/FindJobs.png";
import Instagram from "../images/instagram.png";
import Facebook from "../images/facebook.png";
import Twitter from "../images/twitter.png";

const Footer = (props) => {
  const admin = props.admin;
  const HomeFooter = (props) => {
    return (
      <div className="bg-darkblue h-64 sm:h-80 flex justify-between pt-10 pb-44">
        <div className="flex-1 text-center">
          <img src={Logo} alt="Logo" className="m-auto" />
          <p className="mt-6 ml-4 text-white text-lg tracking-widest">
            © 2021 <i className="text-gray-400">FindJobs</i>
          </p>
        </div>
        <div className="flex-1 text-center text-white">
          <h3 className="text-lg md:text-xl pr-3">Quick Links</h3>
          <ul className="mt-4 space-y-2 w-60 mx-auto pl-16 text-left">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Calendar</Link>
            </li>
            <li>
              <Link to="/">Terms and conditions</Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 text-center">
          <h3 className="text-lg md:text-xl text-white mb-4">Social Media</h3>
          <div className="mx-auto flex space-x-3 w-60 pl-9 md:pl-7">
            <div className="md:circle smallCircle">
              <Link to="/">
                <img src={Instagram} alt="Instagram" />
              </Link>
            </div>
            <div className="md:circle smallCircle">
              <Link to="/">
                <img src={Facebook} alt="Facebook" />
              </Link>
            </div>
            <div className="md:circle smallCircle">
              <Link to="/">
                <img src={Twitter} alt="Twitter" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const AdminFooter = (props) => {
    return (
      <div className="bg-darkblue h-40 flex justify-between items-center py-6 px-8 mt-3">
        <div className="flex items-center text-white md:text-xl text-sm">
          <img src={Logo} alt="Logo" className="m-auto" />
          <span className="ml-4">
            © 2021 <i className="text-cyan-500">FindJobs</i>
          </span>
          <span className="ml-6">Terms and conditions</span>
        </div>
        <div className="flex space-x-3">
          <div className="md:circle smallCircle">
            <Link to="/">
              <img src={Instagram} alt="Instagram" />
            </Link>
          </div>
          <div className="md:circle smallCircle">
            <Link to="/">
              <img src={Facebook} alt="Facebook" />
            </Link>
          </div>
          <div className="md:circle smallCircle">
            <Link to="/">
              <img src={Twitter} alt="Twitter" />
            </Link>
          </div>
        </div>
      </div>
    );
  };
  return <div>{admin ? <AdminFooter /> : <HomeFooter />}</div>;
};

export default Footer;
