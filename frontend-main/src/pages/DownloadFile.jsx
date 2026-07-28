// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { RiDownloadLine } from "react-icons/ri";
// import { CgCompressV } from "react-icons/cg";
// import { FaCircleArrowLeft } from "react-icons/fa6";
// import { AiFillHome } from "react-icons/ai";
// import { jwtDecode } from "jwt-decode";
// import { useSelector } from "react-redux";

// const DownloadFile = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [compressedVideoUrl, setCompressedVideoUrl] = useState(null);
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     const queryParamas = new URLSearchParams(location.search);
//     const token = queryParamas.get("compressedVideoUrl");

//     // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVcmwiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kZGR2ZGlibmcvdmlkZW8vdXBsb2FkL3YxNzQyNzM1ODUzL2NvbXByZXNzZWRfdmlkZW9zL28xajNxNjN4djlrd3A0NXRydW43Lm1wNCIsImlhdCI6MTc0MjczNTg0Nn0.rk10SCDJVztEBtwufVsL3UwrMGUb5Xvw0I_frNyYQlc"

//     if (token) {
//       const decodedToken = jwtDecode(token);
//       console.log(decodedToken.Url);
//       setCompressedVideoUrl(decodedToken.Url);
//     } else {
//       navigate("/video-upload");
//     }
//   }, []);

//   const handleDownload = async () => {
//     try {
//       const response = await fetch(compressedVideoUrl, { mode: "cors" });
//       if (!response.ok) {
//         throw new Error(`Failed to fetch video: ${response.statusText}`);
//       }

//       const blob = await response.blob();
//       const url = URL.createObjectURL(blob);

//       const anchor = document.createElement("a");
//       anchor.href = url;
//       anchor.download = "compressed_video.mp4";
//       document.body.appendChild(anchor);
//       anchor.click();
//       document.body.removeChild(anchor);

//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading video:", error);
//     }
//   };

//   return (
//     <section className="w-full min-h-screen bg-[#151519]">
//       <nav className=" h-[65px] bg-black flex items-center  gap-8 px-10">
//         <div className="flex items-center w-[50%] gap-8">
//           <Link onClick={() => navigate(-1)}>
//             <FaCircleArrowLeft className="text-3xl text-white hover:text-gray-400 cursor-pointer" />
//           </Link>

//           <Link to="/">
//             <AiFillHome className="text-3xl text-white hover:text-gray-400 cursor-pointer" />
//           </Link>
//         </div>

//         <div className="flex items-center justify-end  w-[50%] gap-8">
//           {currentUser && (
//             <Link to="/user/profile">
//               <img
//                 className="w-10 h-10 rounded-full"
//                 src={currentUser.profilePicture.defaultImageUrl}
//                 alt="logo"
//               />
//             </Link>
//           )}
//         </div>
//       </nav>

//       <div className="flex  flex-col lg:flex-row justify-between h-[calc(100vh-65px)]">
//         <div className="p-3 sm:p-0 w-full lg:w-[70%]  h-full flex flex-col items-center lg:items-end">
//           <div className="text-white mt-5  text-center sm:text-left sm:mt-10">
//             We compressed your file by{" "}
//             <span className="font-bold text-white">18%</span> . The file is now
//             1.48 MB 1.22 MB.
//           </div>

//           <div className="p-4 border-[1px] border-red-500 rounded-lg">
//             <video
//               className="w-[95%] h-[80%] sm:w-[90%] sm:h-[70%] md:w-[75%] md:h-[60%]  object-cover mt-5"
//               src={compressedVideoUrl}
//               autoPlay
//               muted
//               loop
//               playsInline
//             />
//           </div>
//         </div>

//         <div className=" w-full lg:w-[25%] h-full flex flex-col items-center lg:items-start ">
//           <p className="text-[#c5c5c6] font-bold mt-5 sm:mt-0  lg:mt-20">
//             Compress Video
//           </p>
//           <button
//             onClick={handleDownload}
//             disabled={!compressedVideoUrl}
//             className="bg-[#0080ff] text-white px-4 py-2   rounded-sm flex items-center gap-2 mt-5"
//           >
//             {" "}
//             <RiDownloadLine className="text-xl" /> Download
//           </button>{" "}
//           <br></br>
//           <Link to="/video-upload">
//             <button className="bg-red-500 text-white px-4 py-3  rounded-sm flex items-center gap-2 ">
//               {" "}
//               <CgCompressV className="text-xl" /> Compress another Video
//             </button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DownloadFile;

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { RiDownloadLine } from "react-icons/ri";
import { CgCompressV } from "react-icons/cg";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const DownloadFile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [compressedVideoUrl, setCompressedVideoUrl] = useState(null);
  const { currentUser } = useSelector((state) => state.user);



  useEffect(() => {
    const queryParamas = new URLSearchParams(location.search);
    const token = queryParamas.get("compressedVideoUrl");

    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVcmwiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kZGR2ZGlibmcvdmlkZW8vdXBsb2FkL3YxNzQyNzM1ODUzL2NvbXByZXNzZWRfdmlkZW9zL28xajNxNjN4djlrd3A0NXRydW43Lm1wNCIsImlhdCI6MTc0MjczNTg0Nn0.rk10SCDJVztEBtwufVsL3UwrMGUb5Xvw0I_frNyYQlc"

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.Url);
      setCompressedVideoUrl(decodedToken.Url);
    } else {
      navigate("/video-upload");
    }
  }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch(compressedVideoUrl, { mode: "cors" });
      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "compressed_video.mp4";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading video:", error);
    }
  };

  return (
    <section className="w-full min-h-screen  bg-[#151519]">
      <nav className=" h-[65px] bg-black flex items-center  gap-8 px-10">
        <div className="flex items-center w-[50%] gap-8">
          <Link onClick={() => navigate(-1)}>
            <FaCircleArrowLeft className="text-3xl text-white hover:text-gray-400 cursor-pointer" />
          </Link>

          <Link to="/">
            <AiFillHome className="text-3xl text-white hover:text-gray-400 cursor-pointer" />
          </Link>
        </div>

        <div className="flex items-center justify-end  w-[50%] gap-8">
          {currentUser && (
            <Link to="/user/profile">
              <img
                className="w-10 h-10 rounded-full"
                src={currentUser?.profilePicture?.defaultImageUrl}
                alt="logo"
              />
            </Link>
          )}
        </div>
      </nav>

      <div className="flex  flex-col lg:flex-row justify-between mt-[65px]">
        <div className="p-3 sm:p-0 w-full lg:w-[70%]  h-full flex flex-col items-center lg:items-end">
          <div className="text-white mt-5  text-center sm:text-left sm:mt-10">
            We compressed your file by{" "}
            <span className="font-bold text-white">18%</span> . The file is now
            1.48 MB 1.22 MB.
          </div>

          {/* <div className="p-1 border-[1px] w-[300px] md:w-[500px] flex justify-center items-center   border-red-500 rounded-lg">
            <video
              className="w-[90%]  "
              src={"https://res.cloudinary.com/dddvdibng/video/upload/v1751735233/compressed_videos/keox6csz9uzpzrj4fbzc.mp4"}
              autoPlay
              muted
              loop
              playsInline
            />
          </div> */}

          <div className="w-full max-w-[500px] p-1 border border-red-500 rounded-lg mx-auto">
            <div className="relative w-full pt-[56.25%]">
              {" "}
              {/* 16:9 Aspect Ratio */}
              <video
                className="absolute top-0 left-0 w-full h-full object-contain rounded-lg"
                src={compressedVideoUrl}
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>

        <div className=" w-full lg:w-[25%] h-full flex flex-col items-center lg:items-start ">
          <p className="text-[#c5c5c6] font-bold mt-5 sm:mt-0  lg:mt-20">
            Compress Video
          </p>
          <button
            onClick={handleDownload}
            disabled={!compressedVideoUrl}
            className="bg-[#0080ff] text-white px-4 py-2   rounded-sm flex items-center gap-2 mt-5"
          >
            {" "}
            <RiDownloadLine className="text-xl" /> Download
          </button>{" "}
          <br></br>
          <Link to="/video-upload">
            <button className="bg-red-500 text-white px-4 py-3  rounded-sm flex items-center gap-2 ">
              {" "}
              <CgCompressV className="text-xl" /> Compress another Video
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DownloadFile;
