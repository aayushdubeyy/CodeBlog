import BlogDisplayCard, {
  BlogDisplayCardProps,
} from "../components/BlogDisplayCard";
import Loader from "../components/Loader";
import { useUserBlogs } from "../hooks";
import edit from "../assets/icons8-edit.svg";
import { Link } from "react-router-dom";
const Profile = () => {
  const { loading, blogs, user, setBlogs, setLoading } = useUserBlogs();
  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-12 ">
            <div className="col-span-12 md:col-span-4 md:h-screen mb-14 mt-7 md:mt-0 md:mb-0">
              <div className="flex justify-center items-center md:flex-col md:h-screen md:gap-7 gap-16">
                <div className="relative inline-flex items-center justify-center w-24 h-24 md:w-28 md:h-28 overflow-hidden bg-gray-100 rounded-full">
                  <span className="font-medium text-3xl text-gray-600">
                    {user.name.split(" ").length > 1
                      ? user.name.split(" ")[0][0] + user.name.split(" ")[1][0]
                      : user.name.split(" ")[0][0]}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-center pb-2 pr-1">
                      {user.name}
                    </p>
                    <div className="cursor-pointer">
                      <Link to="/profile/edit">
                        <img
                          src={edit}
                          alt="edit icon"
                          width={23}
                          height={23}
                        />
                      </Link>
                    </div>
                  </div>
                  <p className="text-lg text-slate-500">
                    {user.userDescription}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 md:mr-10 md:mt-10 w-full">
              <div className="flex flex-col justify-center gap-7 items-center md:items-start w-full">
                <div>
                  <h1 className="font-bold md:text-3xl text-2xl text-center md:text-left">
                    About Me
                  </h1>
                  <p className="text-slate-500 pt-5 text-md md:text-lg text-center md:text-left">
                    {user.userAbout}
                  </p>
                </div>

                <h1 className="font-bold text-3xl text-center">My Blogs</h1>
                {loading ? (
                  <div className="w-full flex justify-center items-center">
                    <Loader />
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 grid-cols-1 px-5 md:px-0 gap-5">
                    {blogs.map((blog: BlogDisplayCardProps) => (
                      <BlogDisplayCard
                        loading={loading}
                        setLoading={setLoading}
                        //@ts-ignore
                        blog={blog}
                        //@ts-ignore
                        setBlogs={setBlogs}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
