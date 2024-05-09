import { Blog } from "../hooks";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";

const FullBlog = ({ blog }: { blog: Blog }) => {
  const month: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <div>
      {/* <Appbar /> */}
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12 gap-8">
          <div className="col-span-12 md:col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-5">
              Posted on{" "}
              {blog.createdAt.substring(8, 10) +
                " " +
                month[parseInt(blog.createdAt.substring(5, 7)) - 1] +
                " " +
                blog.createdAt.substring(0, 4)}
            </div>
            <div className="pt-8">{blog.content}</div>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="font-medium text-slate-600 pb-1 text-lg">
              About Author
            </p>
            <div className="text-xl font-bold flex gap-2 items-center">
              <Avatar authorName={blog.author.name || "Anonymous"} size={8} />
              {blog.author.name || "Anonymous"}
            </div>
            <div className="pt-2 text-slate-500 font-medium">
              {blog.author.userAbout || "No bio available"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
