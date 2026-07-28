import React from "react";
import { Link } from "react-router-dom";
import userAuth from "../customhooks/userAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaIgloo } from "react-icons/fa6";
import serverUrl from "../api/ApiFile";
const Login = () => {
  const { GoogleAuthButton, GithubAuthButton } = userAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setisLoading(true);
      dispatch(signInStart());
      const response = await serverUrl.post(`/api/auth/sign-in`, formData);

      console.log("response", response);
      console.log(response.data.user);

      if (response.status === 200) {
        toast.success(response.data.message, {
          theme: "dark",
        });
        console.log("askcjnsakjc");
        dispatch(signInSuccess(response.data.user));
  

        setisLoading(false);

        navigate("/");
      }
    } catch (error) {
      // dispatch(signInFailure(error.message));
      // console.log(error);
      // setisLoading(false);

      if (error.response?.status === 401) {
        dispatch(signInFailure(error.response.data.message));
        toast.info(error.response.data.message, {
          theme: "dark",
        });
        setisLoading(false);
      }
    }
  };

  return (
    <section className="bg-black flex flex-col justify-center pb-1   items-center min-h-screen w-screen  sm:pr-0 sm:pl-0 ">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="text-[#eeeeee] font-bold text-2xl mb-6 mt-11">
        Sign in
      </div>

      <form
        onSubmit={handleSignup}
        className="flex flex-col  gap-4 border-[2px] p-6 md:p-8 sm:p-10 bg-[#191919] w-[450px] max-w-[90%]  max-h-[90%] rounded-lg"
      >
        <p className="text-[#d5d3d3] font-semibold">Email</p>
        <input
          type="email"
          required
          placeholder="Your email address"
          name="email"
          onChange={handleChange}
          autocomplete="on"
          className="bg-transparent border-[2px] border-gray-300   rounded-[5px] outline-none text-[#eeeeee] focus:border-[2px] focus:border-[#6255ae] p-2"
        />

        <p className="text-[#d5d3d3] font-semibold">Password</p>
        <input
          type="password"
          required
          placeholder="Your password"
          name="password"
          onChange={handleChange}
          autocomplete="on"
          className="bg-transparent border-[2px] border-gray-300   rounded-[5px] outline-none text-[#eeeeee] focus:border-[2px] focus:border-[#6255ae] p-2"
        />

        <button
          disabled={isLoading}
          type="submit"
          className="bg-[#f6f6f6] p-2  font-semibold rounded-[5px] "
        >
          Continue
        </button>

        <div className=" flex justify-center items-center w-full mt-3">
          <hr className="flex-1 h-1 border-gray-300" />
          <div className="mx-2 text-[#a4a4a4] text-[12px] font-semibold">
            OR
          </div>
          <hr className=" flex-1 h-1 border-gray-300" />
        </div>

        <button
          onClick={GoogleAuthButton}
          type="button"
          className="p-2   bg-[#181818] border-[1px] text-[#cfcfcf] border-gray-400  mt-3 hover:border-gray-500 font-semibold rounded-[5px] flex justify-center items-center gap-2 cursor-pointer"
        >
          {" "}
          <img src="/google.svg" className="w-4 h-4 mr-2" /> Continue with
          Google
        </button>

        <button
          onClick={GithubAuthButton}
          type="button"
          className="p-2   bg-[#181818] border-[1px] text-[#cfcfcf] border-gray-400  hover:border-gray-500 font-semibold rounded-[5px] flex justify-center items-center gap-2 cursor-pointer"
        >
          {" "}
          <img
            disabled={isLoading}
            src="/githublogo.png"
            className="w-5 h-5 mr-2"
          />{" "}
          Continue with Github
        </button>

        <div className=" flex justify-center text-center items-center pt-4">
          <div className="text-[#a4a4a4]">
            Don’t have an account?{" "}
            <Link
              to="/create-account/sign-up"
              className="text-[#6255ae] hover:underline transition-all duration-300 cursor-pointer"
            >
              Sign up
            </Link>
          </div>
        </div>
      </form>

      <div className="text-[#9e9e9e] text-[16px] mt-10 cursor-pointer hover:underline  ">
        Terms of Service and Privacy Policy
      </div>
    </section>
  );
};

export default Login;
