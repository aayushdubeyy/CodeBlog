import axios from "axios";
import edit from "../assets/edit-button-svgrepo-com.svg";
import trashcan2 from "../assets/icons8-trash (1).svg";
import { BACKEND_URL } from "../config";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
export interface BlogDisplayCardProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  blog: object;
  setBlogs: (blogs: any) => void;
}

const BlogDisplayCard = ({
  loading,
  setLoading,
  blog,
  setBlogs,
}: BlogDisplayCardProps) => {
  const navigate = useNavigate();
  const deleteHandler = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setBlogs([]);
    setLoading(false);
  };
  const editHandler = () => {
    navigate(`/publish/${blog.id}`);
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-lg border-2 px-5 md:h-[15rem] h-[17rem] overflow-hidden ">
          <h1
            className="font-bold text-2xl p-3 md:py-5 py-4 cursor-pointer"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            {blog.title.length > 65
              ? blog.title.substring(0, 65) + "..."
              : blog.title}
          </h1>
          <div className="flex justify-between pl-2 pr-5">
            <button onClick={deleteHandler}>
              <img src={trashcan2} alt="delete icon" />
            </button>

            <button onClick={editHandler}>
              <img src={edit} width={25} height={25} alt="edit icon" />
            </button>
          </div>
          <p className="text-slate-500 p-3 ">
            {blog.content.substring(0, 160) + "..."}
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogDisplayCard;
