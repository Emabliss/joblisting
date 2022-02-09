import Logo from "../images/FindJobs.png";
import Background from "../images/background.png";
import BigRectangle from "../images/Rectangle 1.png";
import SmallRectangle from "../images/Rectangle 12.png";
import Circles from "../components/Circles";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { loginCall } from "../apiCalls";
import { Link } from "react-router-dom";

const Login = () => {
  const [registerMode, setRegisterMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const { isFetching, error, dispatch } = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(false);

    if (registerMode) {
      if (passwordAgain !== password) {
        setPasswordError(true);
      } else {
        const user = {
          username: username,
          email: email,
          password: password,
        };
        try {
          await axios.post("/auth/register", user);
          setRegisterMode(false);
        } catch (err) {}
      }
    } else {
      loginCall({ email: email, password: password }, dispatch);
      history.push("/admin");
    }
  };
  return (
    <div className="md:flex overflow-x-hidden">
      <div className="flex md:flex-1 bg-darkblue md:min-h-screen">
        <img src={BigRectangle} alt="" className="lg:w-full md:block hidden" />
        <img src={SmallRectangle} alt="" className="-ml-32 lg:block hidden" />
        <div className="absolute left-10 top-10 z-20">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
          <span className="text-white pl-4">for employers</span>
        </div>
        <div className="absolute top-20 left-32 md:top-28 md:left-10">
          <h2 className="pt-32 pb-4 md:block hidden text-white lg:text-5xl text-2xl font-bold">
            Find the best <br /> candidates for your <br /> organisation.
          </h2>
          <img
            src={Background}
            alt="Background"
            className="md:mt-0 mt-4 lg:w-auto md:w-2/4 w-xxl"
          />
        </div>
      </div>
      <div className="w-full md:flex-1 bg-gray-100 lg:-ml-24 lg:-skew-x-6 h-screen md:h-auto">
        <div className="bg-gray-100 lg:skew-x-6 md:mt-80 mt-250 md:ml-16 md:p-0 p-6 lg:ml-32">
          <h1 className="text-darkblue text-5xl font-bold mb-12">
            {registerMode ? "Register" : "Login"}
          </h1>
          <form className="space-y-3" onSubmit={handleSubmit}>
            {registerMode && (
              <div>
                <label htmlFor="" className="label">
                  Username
                </label>
                <br />
                <input
                  type="text"
                  className="input"
                  onChange={(e) => setUsername(e.target.value)}
                  minLength={4}
                  required
                />
              </div>
            )}
            <div>
              <label htmlFor="" className="label">
                Email
              </label>
              <br />
              <input
                type="text"
                className="input"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="" className="label">
                Password
              </label>
              <br />
              <input
                type="password"
                className="input"
                onChange={(e) => setPassword(e.target.value)}
                minLength={7}
                required
              />
            </div>
            {registerMode && (
              <div>
                <label htmlFor="" className="label">
                  Confirm Password
                </label>
                <br />
                <input
                  type="password"
                  className="input"
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  required
                />
              </div>
            )}
            {registerMode && passwordError && (
              <p className="text-red-500">Passwords do not match</p>
            )}
            {error && <p className="text-red-500">Unable to login</p>}
            <button className="bg-darkblue text-white px-5 py-2 text-xl font-semibold rounded-lg">
              {registerMode
                ? "Register"
                : isFetching
                ? "Please wait..."
                : "Login"}
            </button>
            {registerMode ? (
              <span className="ml-8 text-darkblue">
                Already have an account?{" "}
                <b
                  className="cursor-pointer"
                  onClick={() => setRegisterMode(false)}
                >
                  Sign in
                </b>
              </span>
            ) : (
              <span className="ml-8 text-darkblue">
                Don't have an account?{" "}
                <b
                  className="cursor-pointer"
                  onClick={() => setRegisterMode(true)}
                >
                  Sign up
                </b>
              </span>
            )}
          </form>
        </div>
      </div>
      <div className="lg:block hidden bg-gray-100 absolute w-16 h-xxl top-xxxl right-0"></div>
      <Circles />
    </div>
  );
};

export default Login;
