import Location from "../images/Vector2.png";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const JobDetail = ({ setDetailMode, singleJob, setApplyMode, setSelected }) => {
  const handleClick = () => {
    setDetailMode(false);
    setSelected({});
    window.location.reload(false);
  };

  const handleApplyMode = () => {
    setApplyMode(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="hidden md:block mt-16 bg-white rounded-md shadow-lg mb-5 w-2/4 ml-10 h-840 overflow-y-auto sticky top-0">
      <div className="p-7">
        <h3 className="text-darkblue text-2xl tracking-wider font-bold">
          {singleJob.title}
        </h3>
        <div className="flex items-center pt-4 pb-6">
          <img src={Location} alt="Location" />
          <span className="ml-2 text-lg">{singleJob.location}</span>
        </div>
        <Link
          onClick={handleApplyMode}
          className="bg-darkblue text-white rounded-lg py-2 px-5 text-xl font-light tracking-wider"
        >
          Apply Via Find Job
        </Link>
      </div>
      <hr className="h-0.5 w-full bg-red-300 mb-3" />
      <div className="p-7">
        <ReactMarkdown className="prose" children={singleJob.desc} />
      </div>
      <button className="text-center w-full" onClick={handleClick}>
        Close
      </button>
    </div>
  );
};

export default JobDetail;
