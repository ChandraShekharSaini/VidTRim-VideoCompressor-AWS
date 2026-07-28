import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import LoadingPage from "./LoadingPage";
import { videoUploadUrl } from "../api/ApiVideoUpload";

const VideoUpload = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [compressedVideoUrl, setCompressedVideoUrl] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      alert("Please upload a valid video file.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert("Please select a video to upload.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("video", videoFile);

    console.log("FormData", formData);

    try {
      console.log("Uploading video...");
      const response = await videoUploadUrl.post(
        `/upload?id=${currentUser?._id}`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Uploading: ${percentCompleted}%`);
            setResponseMessage(`Uploading: ${percentCompleted}%`);
          },
        }
      );

  

      if (response.success === false) {
        setUploading(false);
        return;
      }

      console.log("---------------response----------");
      console.log(response);
      if (response.status == 200) {
        await saveDetail(response.data.compressedVideoUrl);
      }
      console.log("moving", response);

      const token = response.data.compressedVideoUrl;
      navigate(
        `/download-video?compressedVideoUrl=${encodeURIComponent(token)}`
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      setUploading(false);
    }
  };

  const saveDetail = async (videoUrl) => {
    console.log("----------------------------saved-----------");
    const data = await fetch(
      `https://vidtrim-backend-vercel.vercel.app/saved-video/${currentUser._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ videoUrl }),
      }
    );
  };

  return uploading ? (
    <LoadingPage />
  ) : (
    <section className="flex justify-center items-center pt-3 md:pt-6 w-full min-h-screen  ">
      <div className=" w-[95%] md:w-[80%] border-[1px]   m-auto rounded-lg  bg-gray-100 flex flex-col text-center gap-5 p-5 ">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black font-sans">
          Compression Tool
        </h2>

        <div className="text-[#808080]  sm:text-lg  md:text-xl lg:text-2xl font-mono tracking-tighter">
          Quickly and easily compress large video files for smoother streaming,
          <br></br>
          faster downloads, and storage
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center "
        >
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-blue-500 p-10 w-full sm:w-[90%] md:w-[80%] lg:w-[50%] flex flex-col justify-center items-center rounded-md  cursor-pointer"
          >
            <div className=" text-[65px] sm:text-[100px] text-gray-500 mt-3 sm:mt-5">
              <IoCloudUploadOutline />
            </div>
            <input {...getInputProps()} className="hidden " />
            <button
              type="button"
              className="mt-7 text-white px-8 sm:px-16 py-3 border-2 border-blue-500 bg-blue-500 rounded-full   font-semibold hover:bg-white hover:text-blue-500 transition duration-300"
              onClick={(e) => {
                e.stopPropagation();
                document.querySelector('input[type="file"]').click();
              }}
            >
              Upload File
            </button>
            <p className="mt-9 sm:mt-8 md:mt-6 lg:mt-5 text-lg text-gray-500">
              or drop your file here
            </p>
          </div>
          <p className="mt-3 font-bold text-red-600">{responseMessage}</p>
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-500 text-white px-6 py-3 mt-5 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
          >
            {uploading ? "Uploading..." : "Upload Video"}
          </button>

          {/* {
    responseMessage && (
        <p className="mt-5 text-red-500">{responseMessage}</p>
    )
} */}
        </form>
      </div>
    </section>
  );
};

export default VideoUpload;
