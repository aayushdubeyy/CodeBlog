import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}
const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 w-screen max-w-screen-lg cursor-pointer">
        <div className="flex items-center">
          <Avatar authorName={authorName} />
          <span className="font-extralight ml-2">
            {" "}
            {authorName} <b className="text-slate-500">·</b>{" "}
            <span className="font-thin text-slate-500">{publishedDate}</span>
          </span>
        </div>
        <div className="text-xl font-bold tracking-wide">{title}</div>
        <div className="text-md font-normal tracking-wide">
          {content.length > 100 ? content.substring(0, 100) + "..." : content}
        </div>
        <div className="w-full text-slate-400">{`${Math.ceil(
          content.length / 100
        )} min read`}</div>
        <div className="bg-slate-100 h-[0.1rem] mt-3 w-full mx-auto" />
      </div>
    </Link>
  );
};

export default BlogCard;

export function Avatar({
  authorName,
  size = 8,
}: {
  authorName: string;
  size?: number;
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
    >
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {authorName.split(" ")[0][0]}
        {authorName.split(" ").length === 1 ? "" : authorName.split(" ")[1][0]}
      </span>
    </div>
  );
}
