import { signupInput } from "@aayushdubey/medium-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signupInput>({
    email: "",
    password: "",
    name: "",
  });
  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, {
        ...postInputs,
      });
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-4xl font-bold">Create an account</div>
            <div className="text-slate-400 text-center pt-1">
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <Link to={type === "signup" ? "/signin" : "/signup"}>
                <span className=" underline">
                  {type === "signin" ? "Signup" : "Login"}
                </span>
              </Link>
            </div>
          </div>
          <div className="pt-4">
            {type === "signup" && (
              <LabeledInput
                label="Name"
                placeholder="Jatin Bisht"
                onChange={(e) => {
                  console.log(e.target.value);
                  setPostInputs({ ...postInputs, name: e.target.value });
                }}
              />
            )}
            <LabeledInput
              label="Username"
              placeholder="JatinBisht@gmail.com"
              onChange={(e) => {
                console.log(e.target.value);
                setPostInputs({ ...postInputs, email: e.target.value });
              }}
            />
            <LabeledInput
              label="Password"
              placeholder="Enter your password"
              type="password"
              onChange={(e) => {
                console.log(e.target.value);
                setPostInputs({ ...postInputs, password: e.target.value });
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                console.log(postInputs);
                sendRequest();
              }}
              type="button"
              className="text-white w-full bg-gray-800 
              hover:bg-gray-900 focus:outline-none focus:ring-4 
              focus:ring-gray-300 font-medium rounded-lg text-sm px-5 
              py-2.5 me-2 mb-2 dark:bg-gray-800 
              dark:hover:bg-gray-700 dark:focus:ring-gray-700 
              dark:border-gray-700"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
function LabeledInput({
  label,
  placeholder,
  type,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label
        htmlFor="first_name"
        className="block mt-1 text-sm font-bold text-gray-900 mb-2"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 
        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
        block w-full p-2.5 mb-4"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
