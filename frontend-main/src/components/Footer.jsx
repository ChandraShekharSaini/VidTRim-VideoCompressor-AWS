import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { TbBrandLinkedinFilled } from "react-icons/tb";
import { FaYoutube } from "react-icons/fa";
import DeleteDiaglogBox from "./DeleteDiaglogBox";
import { Toaster, toast } from "sonner";
import serverUrl from "../api/ApiFile";

const Footer = () => {
  const [formData, SetFormData] = useState({});
  const [isloading, setIsLoading] = useState(false);

  const handleChange = (ev) => {
    const { value, name } = ev.target;
    SetFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  console.log(formData);

  const handleSubmit = async (ev) => {
  ev.preventDefault();
  setIsLoading(true);

  try {
    const res = await serverUrl.post(
      "/api/query/footer/message",
      formData
    );

    console.log("response", res);

    toast.success("Message Sent Successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to send message");
  } finally {
    setIsLoading(false);
  }
};
  return (
    <footer>
      <Toaster position="bottom-right" richColors expand={true} closeButton />
      <div className="flex rounded-tl-3xl rounded-tr-3xl justify-between bg-white  px-4 md:px-7 py-5 border-t-2 border-black">
        <div className="lg:w-[30%]  flex  items-center justify-start gap-2 sm:gap-4 pl-1 sm:pl-4 ">
          {/* <img className='w-12  h-12' src="/logoVideo.webp" /> */}

          <video
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover  hover:scale-125 transition duration-500"
            loop
            autoPlay
            muted
            playsInline
            src="/logo-black.mp4"
          />
          <p
            className={`font-mono font-bold text-xl  sm:text-3xl  md:text-4xl border-2 border-gray-500 rounded-sm  px-2 py-1 sm:px-4 sm:py-2 
          
            }`}
          >
            VidTrim
          </p>
        </div>

        <div className="flex gap-1  md:gap-3  items-center ">
          <FaFacebook className="text-[26px] text-[#1877F2] cursor-pointer hover:scale-110" />
          <RiInstagramFill className="text-[30px] text-[#d62976] cursor-pointer hover:scale-110" />
          <TbBrandLinkedinFilled className="text-[30px] text-[#0077b5] cursor-pointer hover:scale-110" />
          <FaYoutube className="text-[34px] text-[#FF0000] cursor-pointer hover:scale-110" />
        </div>
      </div>

      <div className="bg-black  min-h-[60vh] w-full  flex flex-col gap-5 sm:gap-0  sm:flex-row lg:justify-center rounded-t-3xl text-white px-3 sm:px-5 py-10">
        <div className="lg:w-[20%] text-center   flex flex-col  sm:hidden  lg:flex lg:flex-col lg:justify-start lg:py-6   lg:gap-10 items-center">
          <div className=" flex  items-center justify-start gap-2 mr-14">
            <video
              className="w-9 h-9 sm:w-10 ml-6 sm:h-10 md:w-12 md:h-12 rounded-full object-cover  hover:scale-125 transition duration-500"
              loop
              autoPlay
              muted
              playsInline
              src="/logo-black.mp4"
            />
            <p
              className={`font-mono font-bold text-2xl    lg:text-4xl border-2 border-gray-500 rounded-sm  px-2 py-1 sm:px-4 sm:py-2 
          
            }`}
            >
              VidTrim
            </p>
          </div>

          <p className="hidden lg:flex  text-white text-[16px] font-Karma leading-tight px-2 m-5 sm:m-0">
            Effortlessly compress and trim your videos with Vidtrim – a fast,
            free, and user-friendly online tool crafted to help creators and
            everyday users preserve memories, tell stories, and share moments
            that matter.
          </p>
        </div>

        <div className=" flex  flex-col gap-7 sm:gap-0 lg:flex-row  lg:justify-evenly sm:w-[50%]">
          <div className="sm:w-[90%] lg:w-[30%]">
            <div className=" text-center">
              <h3 className="text-[#c60e48]   text-[20px]  font-bold">Links</h3>
            </div>
            <hr className=" h-[2px] m-auto mt-3 border-0 bg-gradient-to-r from-[#a70a3f] via-[#c60e48] via-[#e03a65] via-[#f8475e] to-[#ff6b81]" />

            <div className="flex flex-col  gap-1 mt-3">
              <Link
                to="/"
                className="text-[18px] transition duration-300 hover:text-red-600 hover:underline hover:decoration-red-600 hover:underline-offset-2 font-mono"
              >
                Home
              </Link>

              <Link
                to={"/video-upload"}
                className="text-[18px] transition duration-300 hover:text-red-600 hover:underline hover:decoration-red-600 hover:underline-offset-2 font-mono"
              >
                Video Compression
              </Link>
              <Link
                to={"/about"}
                className="text-[18px] transition duration-300 hover:text-red-600 hover:underline hover:decoration-red-600 hover:underline-offset-2 font-mono"
              >
                About Us
              </Link>
            </div>
          </div>

          <div className="sm:w-[90%] lg:w-[30%] ">
            <div className=" text-center">
              <h3 className="text-[#c60e48]   text-[20px]  font-bold">
                Services
              </h3>
            </div>
            {/* <hr className="w-[90%] m-auto mt-1" /> */}
            {/* <hr className="w-[90%] h-[2px] m-auto mt-1 border-0 bg-gradient-to-r from-[#c60e48] via-[#e03a65] to-[#ff5c7c]" /> */}
            <hr className="h-[2px] m-auto mt-3 border-0 bg-gradient-to-r from-[#a70a3f] via-[#c60e48] via-[#e03a65] via-[#f8475e] to-[#ff6b81]" />

            <div className="flex flex-col gap-1 mt-3">
              <Link
                to="/video-upload"
                className="text-[18px] transition duration-300 hover:text-red-600 hover:underline hover:decoration-red-600 hover:underline-offset-2 font-mono"
              >
                Video Compression
              </Link>

              <a
                href={"https://hivenote-app-msjg.vercel.app"}
                target="_blank"
                className="text-[18px] transition duration-300 hover:text-red-600 hover:underline hover:decoration-red-600 hover:underline-offset-2 font-mono"
              >
                Notes Maker
              </a>
            </div>
          </div>

          <div className="sm:w-[90%] lg:w-[30%] ">
            <div className=" text-center">
              <h3 className="text-[#c60e48]   text-[20px]  font-bold">
                Source Code
              </h3>
            </div>
            <hr className="h-[2px] m-auto mt-3 border-0 bg-gradient-to-r from-[#a70a3f] via-[#c60e48] via-[#e03a65] via-[#f8475e] to-[#ff6b81]" />

            <div className="flex flex-col gap-1 mt-3">
              <a
                href="https://github.com/ChandraShekharSaini/VidTrim.git"
                target="_blank"
                className="text-[18px] transition duration-300 hover:text-red-600 hover:underline hover:decoration-red-600 hover:underline-offset-2 font-mono"
              >
                Github
              </a>

              <Link
                to={"/video-upload"}
                className="text-[18px] transition duration-300 hover:text-red-600 hover:underline hover:decoration-red-600 hover:underline-offset-2 font-mono"
              >
                Video Compression
              </Link>
              <a
                href={
                  "https://github.com/ChandraShekharSaini/VidTrim/blob/master/README.md"
                }
                target="_blank"
                className="text-[18px] transition duration-300 hover:text-red-600 hover:underline hover:decoration-red-600 hover:underline-offset-2 font-mono"
              >
                Read Me
              </a>
            </div>
          </div>
        </div>

        <div className=" sm:w-[50%] lg:w-[30%]">
          <div className=" text-center">
            <h3 className="text-[#c60e48]   text-[20px]  font-bold">
              Drop us a message
            </h3>

            <hr className="w-[100%] sm:w-[90%] h-[2px] m-auto mt-3 border-0 bg-gradient-to-r from-[#a70a3f] via-[#c60e48] via-[#e03a65] via-[#f8475e] to-[#ff6b81]" />

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 px-1 mt-4 sm:px-5 "
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                onChange={handleChange}
                className="py-2 px-2 outline-none border-none text-[#73747a] bg-[#3e3e48] rounded-sm"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                onChange={handleChange}
                className="py-2 px-2 outline-none border-none text-[#73747a] bg-[#3e3e48] rounded-sm"
              />

              <textarea
                type="text"
                name="message"
                placeholder="Message"
                required
                rows={5}
                onChange={handleChange}
                className="py-1 px-2 outline-none border-none text-[#73747a] bg-[#3e3e48] overflow-hidden rounded-sm"
              ></textarea>

              <button
                type="submit"
                disabled={isloading}
                className="hover:bg-red-700 bg-red-600 disabled:opacity-75 disabled:cursor-wait w-[50%] text-[14px] text-white py-2 rounded-sm font-lato"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="py-6 md:px-5  w-full bg-black border-t-2 text-white flex flex-col  md:flex-row justify-center items-center md:justify-between  ">
        <p> © 2025 VidTrim | All Rights Reserved</p>
        <p className="hover:underline hover:underline-offset-2 cursor-pointer ">
          {" "}
          Privacy Policy
        </p>
      </div>
    </footer>
  );
};

export default Footer;
