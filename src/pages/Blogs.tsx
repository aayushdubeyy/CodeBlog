import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  return (
    <div>
      {/* <Appbar /> */}
      {!loading ? (
        <div className="flex justify-center">
          <div>
            {blogs.map((b) => (
              <BlogCard
                key={b.id}
                id={b.id}
                authorName={b.author.name || "Anonymous"}
                title={b.title}
                content={b.content}
                publishedDate={new Date().toJSON().slice(0, 10)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen flex-col">
          <Loader />
          <p className="pt-2">Loading.....</p>
        </div>
      )}
    </div>
  );
};

export default Blogs;
