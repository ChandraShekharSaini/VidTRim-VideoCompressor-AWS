import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import { BsSendDashFill } from "react-icons/bs";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import DeleteAccountDialog from "../components/DeleteDiaglogBox";
import { FaCompressArrowsAlt } from "react-icons/fa";
import LogoutDialog from "../components/LogoutDiaglogBox";
import Divider from "@mui/material/Divider";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/userSlice";
import authCustomhook from "../customhooks/AuthCustomHook";
import { Link } from "react-router-dom";
import { useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import DefaulImage from "../assets/defaultImage.jpg";
import FlipBar from "../components/FlipBar";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import serverUrl from "../api/ApiFile";
export default function FormPropsTextFields() {
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const [isUpdated, setIsUpdated] = useState(false);
  const [icon, setIcon] = useState(false);

  const { handleLogout, handleDelete } = authCustomhook();

  console.log(icon);

  const [formData, setformData] = React.useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (e) => {
    console.log(e.target.id);
    console.log("I am here");
    setformData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      dispatch(updateUserStart());
      const response = await serverUrl.put(
        `/api/auth/update-user/${currentUser._id}`,
        formData
      );

    
      if (response.status == 200) {
          console.log(response);
        setIsUpdated(true);
        handleClick();
        setPending(false);
        dispatch(updateUserSuccess(response.data.user));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(updateUserFailure(error.message));
      setPending(false);
    }
  };

  return (
    <>
      {icon && <FlipBar value={icon} />}

      {isUpdated && (
        <div>
          <Snackbar
            open={open}
            className="text-center"
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Updated user details successfully
            </Alert>
          </Snackbar>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="w-full min-h-screen grid grid-cols-10  relative">
        <div className=" flex-col gap-1 h-screen  bg-[#b6bec9]  lg:col-span-2 hidden lg:flex  ">
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

        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "33ch" } }}
          noValidate
          autoComplete="on"
          className="col-span-10 md:col-span-10   lg:col-span-6 bg-[#151519]  pb-12   md:pb-0 lg:p-20 "
        >
          <div>
            <BsFillArrowLeftCircleFill
              onClick={() => navigate(-1)}
              className="text-[30px] text-white cursor-pointer hover:text-gray-500 hidden lg:flex"
            />
          </div>

          <nav className="border-b-[1px] border-white lg:hidden w-full h-[65px] z-30 flex px-2 bg-black items-center fixed ">
            <div
              onClick={() => setIcon(!icon)}
              className="transition-all duration-[2000] ease-in-out"
            >
              {icon ? (
                <RxCrossCircled
                  // onClick={() => setIcon(!icon)}
                  className="text-[35px] text-white hover:text-gray-500 transition-transform duration-300 ease-in-out scale-100 opacity-100"
                />
              ) : (
                <AiOutlineMenu
                  // onClick={() => setIcon(!icon)}
                  className="text-[35px] text-white hover:text-gray-500 transition-transform duration-300 ease-in-out scale-100 opacity-100"
                />
              )}
            </div>
          </nav>

          <div className=" grid place-content-center mt-[90px]   lg:mt-0 ">
            {currentUser && (
              <img
                src={
                  currentUser?.profilePicture?.googleImageUrl ??
                  currentUser?.profilePicture?.githubImageUrl ??
                  currentUser?.profilePicture?.defaultImageUrl
                }
                alt="userImage"
                className="w-24 h-24 rounded-full"
              />
            )}
          </div>

          <div className="flex flex-col  items-center gap-4 sm:p-4 mx-auto mt-8 ">
            <div className="w-[90%]  flex flex-col justify-center items-center sm:flex-row sm:justify-between gap-2 ">
              <TextField
                id="firstName"
                label="First Name"
                name="firstName"
                onChange={handleChange}
                defaultValue={formData.firstName}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& input": { color: "white" },
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "rgb(32, 156, 227)" },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(32, 156, 227)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(32, 156, 227, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    "&.Mui-focused": { color: "white" },
                  },
                }}
              />

              <TextField
                id="lastName"
                label="Last Name"
                onChange={handleChange}
                defaultValue={formData.lastName}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& input": { color: "white" },
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "rgb(32, 156, 227)" },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(32, 156, 227)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(32, 156, 227, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    "&.Mui-focused": { color: "white" },
                  },
                }}
              />
            </div>

            <div className="w-[90%]  flex flex-col  justify-center items-center sm:flex-row sm:justify-between gap-2 ">
              <TextField
                autoComplete="on"
                id="username"
                label="Username"
                onChange={handleChange}
                defaultValue={formData.username}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& input": {
                      color: "white",
                      backgroundColor: "rgba(32, 156, 227, 0.1)",
                    },
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "rgb(32, 156, 227)" },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(32, 156, 227)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(32, 156, 227, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    "&.Mui-focused": { color: "#e8f0fe" },
                  },
                }}
              />

              <TextField
                id="email"
                label="Email"
                type="email"
                defaultValue={formData.email}
                autoComplete="email"
                inputProps={{
                  readOnly: true,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& input": { color: "white" },
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "rgb(32, 156, 227)" },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(32, 156, 227)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(32, 156, 227, 0.1)",
                    },
                    "&.Mui-disabled": {
                      "& input": { color: "rgba(255, 255, 255, 0.7)" },
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    "&.Mui-focused": { color: "white" },
                  },
                }}
              />
            </div>

            <div className="w-[90%]  flex flex-col  justify-center items-center sm:flex-row sm:justify-between gap-2">
              <TextField
                id="password"
                label="Password"
                type="password"
                onChange={handleChange}
                autoComplete="current-password"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& input": { color: "white" },
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "rgb(32, 156, 227)" },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(32, 156, 227)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(32, 156, 227, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    "&.Mui-focused": { color: "white" },
                  },
                }}
              />

              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                autoComplete="new-password"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& input": { color: "white" },
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "rgb(32, 156, 227)" },
                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(32, 156, 227)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(32, 156, 227, 0.1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    "&.Mui-focused": { color: "white" },
                  },
                }}
              />
            </div>

            <button
              disabled={pending}
              onClick={handleSubmit}
              className="bg-blue-500 text-white p-2 rounded-md w-[90%] hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </Box>

        <div className="hidden lg:flex  lg:col-span-2   w-full h-full   ">
          <video
            className=" w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInlin
          >
            <source src="/profileVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="sm:hidden grid content-center   w-[100%] h-[500px] relative ">
        <video
          className="absolute inset-0 w-[100%] h-full object-cover"
          autoPlay
          loop
          muted
          playsInlin
        >
          <source src="/profileVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}
