import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { MdDelete } from "react-icons/md";
import { MdHome } from "react-icons/md";
import { FaCircleArrowLeft } from "react-icons/fa6";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Dasbord = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [tooltipMessage, setTooltipMessage] = useState("Copy");
  const navigate = useNavigate();
  console.log("Current User", currentUser);
  const [videoHistory, setVideoHistory] = useState([]);

  useEffect(() => {
    const videoHistory = async (e) => {
      try {
        const response = await fetch(
          `https://vidtrim-backend-vercel.vercel.app/api/compressed-video/video-history/${currentUser._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success === false) {
          console.log(data.message);
        }

        console.log("Data", data);
        setVideoHistory(data.data);
        console.log("Video History", data.data);
      } catch (error) {
        console.log(error);
      }
    };

    videoHistory();
  }, []);

  const deleteVideo = async (id) => {
    try {
      const response = await fetch(
        `https://vidtrim-backend-vercel.vercel.app/api/compressed-video/delte-video/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setVideoHistory((prevVideos) =>
          prevVideos.filter((video) => video._id !== id)
        );
        console.log("Deleted successfully");
      } else {
        console.log("Error deleting video");
      }
      console.log("Delted", data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const copyToClipboard = async (linkToCopy) => {
    try {
      await navigator.clipboard.writeText(linkToCopy);
      // alert("Link copied successfully!");
      setTooltipMessage("Link Copied");
      setTimeout(() => setTooltipMessage("Copy"), 1000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  return (
    <section className="w-full h-screen flex-col  bg-black">
      <nav className="w-full h-[60px] border-2 border-white rounded-lg flex flex-row items-center justify-between px-5">
        <div className="w-[50%] flex flex-row items-center gap-4">
          <Link onClick={() => navigate(-1)}>
            <FaCircleArrowLeft className="text-[30px] text-white  hover:text-gray-400 cursor-pointer " />
          </Link>

          <Link to="/">
            <MdHome className="text-[35px] text-white  hover:text-gray-400 cursor-pointer" />
          </Link>
        </div>

        <div className="w-[50%] flex flex-row items-center justify-end pr-5 ">
          {currentUser ? (
            <Link to="/user/profile">
              <img
                src={
                  currentUser?.profilePicture?.googleImageUrl ??
                  currentUser?.profilePicture?.githubImageUrl ??
                  currentUser?.profilePicture?.defaultImageUrl
                }
                alt="profile"
                className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
              />
            </Link>
          ) : (
            ""
          )}
        </div>
      </nav>

      {videoHistory && videoHistory.length > 0 ? (
        <>
          {videoHistory.map((video, index) => (
            <div
              key={index}
              className="w-[90%] mx-auto border-2 border-white rounded-lg p-4 flex gap-4 md:gap-0 flex-col md:flex-row justify-between mb-4 mt-8"
            >
              <video
                className=" md:w-[45%] lg:w-[19%]  object-cover hover:scale-105 transition-all duration-300"
                src={video.videoUrl}
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="sm:w-[100%] md:w-[50%] border-2 border-red rounded-lg flex flex-row items-center justify-center">
                <div className="p-[0.001px] bg-transparent hover:bg-gray-500  rounded-full ">
                  <Tooltip
                    title={tooltipMessage}
                    onClick={() => copyToClipboard(video.videoUrl)}
                    className="transition duration-300"
                  >
                    <IconButton>
                      <ContentCopyIcon className="text-white text-sm" />
                    </IconButton>
                  </Tooltip>
                </div>

                <div className="p-[0.001px] bg-transparent hover:bg-gray-500  rounded-full ">
                  <Tooltip
                    title="Delete"
                    onClick={() => deleteVideo(video._id)}
                  >
                    <IconButton>
                      <DeleteIcon className="text-white text-lg" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="text-[18px] text-white text-center mt-10">
          No Data Found
        </p>
      )}
    </section>
  );
};

export default Dasbord;
