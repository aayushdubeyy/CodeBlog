import { Link, useNavigate } from "react-router-dom";
import darklogo from "../assets/code blog.png";
import { Avatar } from "./BlogCard";
import { useUser } from "../hooks";

const Appbar = () => {
  const navigate = useNavigate();
  const handler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    navigate("/signin");
  };
  const { user } = useUser();
  return (
    <div className="border-b flex justify-between px-5 md:px-10 py-3">
      <div className="flex items-center">
        <Link to="/blogs">
          <img src={darklogo} alt="logo" width={180} className="pr-5" />
        </Link>
      </div>

      <div className="flex items-center">
        <Link to="/publish">
          <button
            type="button"
            className="mr-7 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 "
          >
            New
          </button>
        </Link>

        <button
          onClick={handler}
          type="button"
          className="mr-7 text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2"
        >
          Logout
        </button>

        <Link to="/profile">
          <Avatar authorName={user.name || "Anonymous"} size={8} />
        </Link>
      </div>
    </div>
  );
};

export default Appbar;
