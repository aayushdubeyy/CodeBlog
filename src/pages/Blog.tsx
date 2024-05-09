import { useBlog } from "../hooks";
import Loader from "../components/Loader";
import FullBlog from "../components/FullBlog";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  return (
    <div>
      {!loading ? (
        <FullBlog blog={blog} />
      ) : (
        <div className="flex justify-center items-center h-screen flex-col">
          <Loader />
          <p className="pt-2">Loading.....</p>
        </div>
      )}
    </div>
  );
};

// export default Blog;
