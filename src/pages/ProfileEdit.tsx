import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
// <{name: string, userDescription: string, userAbout: string}>
const ProfileEdit = () => {
  const navigate = useNavigate();
  const [updatedInfo, setUpdatedInfo] = useState({
    //@ts-ignore
    name: JSON.parse(localStorage.getItem("userDetails")).name || "",
    userDescription:
      //@ts-ignore
      JSON.parse(localStorage.getItem("userDetails")).userDescription || "",
    //@ts-ignore
    userAbout: JSON.parse(localStorage.getItem("userDetails")).userAbout || "",
  });
  const [loading, setLoading] = useState(false);
  const updatedUser = async () => {
    setLoading(true);
    await axios.post(
      `${BACKEND_URL}/api/v1/user/edit`,
      {
        name: updatedInfo.name,
        userDescription: updatedInfo.userDescription,
        userAbout: updatedInfo.userAbout,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    localStorage.removeItem("userDetails");
    localStorage.setItem("userDetails", JSON.stringify(updatedInfo));
    setLoading(false);
    navigate("/profile");
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col mt-24">
          <div className="lg:w-4/12 flex justify-center flex-col gap-3">
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <p className="text-slate-500 font-normal">
              Update your profile information.
            </p>

            <div className="mb-6 lg:flex">
              <div className="mr-5 lg:w-[50%]">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Aayush Dubey"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-5 lg:mb-0"
                  value={updatedInfo.name}
                  onChange={(e) => {
                    setUpdatedInfo((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="lg:w-[50%]">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Profession
                </label>
                <input
                  type="text"
                  placeholder="Software Developer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={updatedInfo.userDescription}
                  onChange={(e) => {
                    setUpdatedInfo((prevState) => ({
                      ...prevState,
                      userDescription: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>

            <label className="mb-2 text-sm font-medium text-gray-900 text-start w-full">
              About
            </label>
            <textarea
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a short description about yourself."
              value={updatedInfo.userAbout}
              onChange={(e) => {
                setUpdatedInfo((prevState) => ({
                  ...prevState,
                  userAbout: e.target.value,
                }));
              }}
            ></textarea>
            <div>
              <button
                onClick={updatedUser}
                className="bg-black text-white w-fit p-2 rounded-lg px-5 mt-3 float-right"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileEdit;
