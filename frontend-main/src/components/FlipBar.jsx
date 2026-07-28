// import React from 'react'
// import {useSelector} from 'react-redux'
// import {Link} from "react-router-dom"
// import { BsSendDashFill } from "react-icons/bs";
// import HomeIcon from "@mui/icons-material/Home";
// import EmailIcon from "@mui/icons-material/Email";
// import LogoutIcon from "@mui/icons-material/Logout";
// import DeleteIcon from "@mui/icons-material/Delete";

// const FlipBar = (props) => {

//     const {currentUser }= useSelector((state)=>state.user)

//     console.log(currentUser);

//   return (
//     <div className={`w-[95%] h-screen  border-2 bg-white absolute  top-[65px]  ${props.value?'left-0':'left-[-385px]'} z-30 md:hidden transition-all duration-[2000] ease-in-out`}>

//           <div className="flex flex-col  ">

//           <div className="flex flex-col gap-4  p-2 border-2 border-gray-700">
//             <div className="flex flex-row items-center gap-4">
//               {currentUser && (
//                 <img
//                   src={
//                     currentUser?.profilePicture?.googleImageUrl ??
//                     currentUser?.profilePicture?.defaultImageUrl
//                   }
//                   alt="userImage"
//                   className="w-14 h-14 rounded-full"
//                 />
//               )}

//               <div className="flex flex-col gap-2">
//                 {currentUser && (
//                   <h1 className="text-lg  font-Karma font-medium ">
//                     {currentUser.username}
//                   </h1>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="min-h-[20%]   flex flex-col gap-4 ">
//             <Link
//               to="/user/dashboard"
//               className="flex flex-row items-center gap-4  p-2 cursor-pointer "
//             >
//               <div className="bg-blue-600  w-9 h-9 flex  justify-center  items-center rounded-full p-2">
//                 <BsSendDashFill className="text-white" />
//               </div>
//               <div>
//                 <p className="font-mono">Dashboard</p>
//               </div>
//             </Link>

//             <Link
//               to="/"
//               className="flex flex-row  items-center  gap-4  p-2 cursor-pointer "
//             >
//               <div className="bg-orange-600  w-9 h-9 flex  justify-center  items-center rounded-full p-2">
//                 <HomeIcon className="text-white" />
//               </div>
//               <div>
//                 <p className="font-mono">Home</p>
//               </div>
//             </Link>
//           </div>

//           <div className="min-h-[30%] flex flex-col   gap-4  mt-5">
//             <div className="flex flex-row items-center gap-4  p-2 cursor-pointer ">
//               <div className="bg-purple-600  w-9 h-9 flex  justify-center  items-center rounded-full p-2">
//                 <EmailIcon className="text-white" />
//               </div>
//               <Link to="/contact">
//                 <p className="font-mono">Contact Us</p>
//               </Link>
//             </div>

//             <div className="flex flex-row gap-4    p-2 ">
//               <button

//                 className=" text-white bg-blue-500 hover:bg-[#3065d8] p-2 rounded-md"
//               >
//                 <LogoutIcon /> Logout
//               </button>
//             </div>

//             <div className="flex  flex-row gap-4   p-2 ">
//               <button

//                 className=" text-white bg-red-600 hover:bg-[#ec090a] p-2 rounded-md"
//               >
//                 <DeleteIcon /> Delete Account
//               </button>
//             </div>
//           </div>
//         </div>

//     </div>
//   )
// }

// export default React.memo(FlipBar)

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsSendDashFill } from "react-icons/bs";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import authCustomhook from "../customhooks/AuthCustomHook";
import DeleteAccountDialog from "./DeleteDiaglogBox";
import LogoutDialog from "./LogoutDiaglogBox";
import { FaCompressArrowsAlt } from "react-icons/fa";

const FlipBar = (props) => {
  const { currentUser } = useSelector((state) => state.user);
  const { handleLogout, handleDelete } = authCustomhook();

  const b = 89;

  return (
    <div
      className={`w-[100%] h-screen  text-black bg-white  top-[65px] ${
        props.value ? "left-0" : "left-[-385px]"
      }  lg:hidden transition-all duration-[2000ms] ease-in-out  fixed z-20 `}
    >
      <div className=" flex-col gap-1 h-screen  bg-[#b6bec9] ">
        <div className="flex flex-col gap-4  p-2 ">
          <div className="flex flex-row items-center gap-4">
            {currentUser && (
              <img
                src={
                  currentUser?.profilePicture?.googleImageUrl ??
                  currentUser?.profilePicture?.githubImageUrl ??
                  currentUser?.profilePicture?.defaultImageUrl
                }
                alt="userImage"
                className="w-12 h-12 rounded-full"
              />
            )}

            <div className="flex flex-col gap-2">
              {currentUser && (
                <h1 className="text-lg  font-Karma font-medium ">
                  {currentUser.username}
                </h1>
              )}
            </div>
          </div>
        </div>

        <Divider />

        <div className="flex flex-col  ">
          <Link
            to="/user/dashboard"
            className="flex flex-row items-center gap-4  p-2 cursor-pointer hover:bg-black hover:text-white"
          >
            <div className="bg-blue-600  w-9 h-9 flex  justify-center  items-center rounded-full p-2">
              <BsSendDashFill className="text-white" />
            </div>
            <div>
              <p className="font-mono text-gray ">Dashboard</p>
            </div>
          </Link>
          <Divider />

          <Link
            to="/"
            className="flex flex-row  items-center  gap-4  p-2 cursor-pointer  hover:bg-black hover:text-white"
          >
            <div className="bg-orange-600  w-9 h-9 flex  justify-center  items-center rounded-full p-2">
              <HomeIcon className="text-white" />
            </div>
            <div>
              <p className="font-mono text-gray hover:text-[#ffffff]">Home</p>
            </div>
          </Link>

          <Divider />

          <Link
            to="/video-upload"
            className="flex flex-row  items-center  gap-4  p-2 cursor-pointer  hover:bg-black hover:text-white"
          >
            <div className="bg-orange-600  w-9 h-9 flex  justify-center  items-center rounded-full p-2">
              <FaCompressArrowsAlt className="text-white" />
            </div>
            <div>
              <p className="font-mono text-gray hover:text-[#ffffff]">
                Compress Video
              </p>
            </div>
          </Link>

          <Divider />

          <Link to="/contact" className="hover:bg-black hover:text-white">
            <div className="flex flex-row items-center gap-4  p-2 cursor-pointer  ">
              <div className="bg-purple-600  w-9 h-9 flex  justify-center  items-center rounded-full p-2">
                <EmailIcon className="text-white " />
              </div>

              <p className="font-mono text-gray hover:text-[#ffffff]">
                Contact Us
              </p>
            </div>
          </Link>

          <Divider />

          <LogoutDialog />

          <Divider />

          <DeleteAccountDialog />
          <Divider />
        </div>
      </div>
    </div>
  );
};

export default React.memo(FlipBar);
