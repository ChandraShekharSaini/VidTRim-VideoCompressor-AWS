import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userAuth from "../customhooks/userAuth";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CredentialDiaglogBtn from "../components/CredentialDiaglogBox.";
import serverUrl from "../api/ApiFile";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Signup = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    navigate("/create-account/sign-in");
  };
  const [formData, setFormData] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [credentialDiag, setCredentialDiag] = useState(false);
  const navigate = useNavigate();

  const { GoogleAuthButton, GithubAuthButton } = userAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData);

  const handleSignup = async (e) => {
    console.log("rernsering kjbjhb");
    e.preventDefault();

    try {
      setisLoading(true);
      const response = await serverUrl.post(`/api/auth/sign-up`, formData);

      console.log(response.status);

      if (response.status === 201) {
        setCredentialDiag(true);

        setisLoading(false);

         toast.success(response.data.message, {
          theme: "dark",
        });

        handleClickOpen();
      }
    } catch (error) {
      console.log(error.status);
      console.log(error.response.data.message);

      if (error.status === 400) {
        toast.info(error.response.data.message, {
          theme: "dark",
        });
        setisLoading(false);
      }

      setisLoading(false);
    }
  };

  return (
    <>
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

      <section className="bg-black flex flex-col    items-center  pb-1 min-h-screen  sm:h-[105vh]  w-screen sm:pr-0 sm:pl-0 ">
        <div className="text-[#eeeeee] font-bold text-2xl mb-6 mt-12">
          Sign up
        </div>

        <form
          onSubmit={handleSignup}
          className="flex flex-col  gap-4 border-[2px]   p-4  sm:p-12  bg-[#191919] w-[450px] max-w-[90%]  max-h-[90%] rounded-lg"
        >
          <div className="flex flex-row gap-4   justify-between">
            <div className="flex flex-col gap-2 w-[45%]">
              <p className="text-[#d5d3d3] font-semibold">First name</p>
              <input
                type="text"
                required
                placeholder="Your first name"
                name="firstName"
                onChange={handleChange}
                autoComplete="on"
                className="bg-[#131313]  border-[2px] border-gray-300   rounded-[5px] outline-none text-[#eeeeee] focus:border-[2px] focus:border-[#6255ae] focus:bg-[#272635]  p-2"
              />
            </div>

            <div className="flex flex-col gap-2 w-[45%]">
              <p className="text-[#d5d3d3] font-semibold">Last name</p>
              <input
                type="text"
                required
                placeholder="Your last name"
                name="lastName"
                onChange={handleChange}
                autoComplete="on"
                className="bg-[#131313]  border-[2px] border-gray-300   rounded-[5px] outline-none text-[#eeeeee] focus:border-[2px] focus:border-[#6255ae] focus:bg-[#272635]  p-2"
              />
            </div>
          </div>

          <p className="text-[#d5d3d3] font-semibold">Email</p>
          <input
            type="email"
            required
            placeholder="Your email address"
            name="email"
            onChange={handleChange}
            autocomplete="on"
            className="bg-[#131313]  border-[2px] border-gray-300   rounded-[5px] outline-none text-[#eeeeee] focus:border-[2px] focus:border-[#6255ae] focus:bg-[#272635]  p-2"
          />

          <div className=" flex justify-center items-center w-full mt-3">
            <hr className="flex-1 h-1 border-gray-300" />
            <div className="mx-2 text-[#a4a4a4] text-[12px] font-semibold">
              OR
            </div>
            <hr className=" flex-1 h-1 border-gray-300 " />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-[#f6f6f6] p-2  font-semibold rounded-[5px] cursor-pointer "
          >
            Continue
          </button>

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
            <img src="/githublogo.png" className="w-5 h-5 mr-2" /> Continue with
            Github
          </button>

          <div className=" flex justify-center text-center items-center pt-4">
            <div className="text-[#a4a4a4]">
              Already have an account?{" "}
              <Link
                to="/create-account/sign-in"
                className="text-[#6255ae] hover:underline transition-all duration-300 cursor-pointer"
              >
                Sign in
              </Link>
            </div>
          </div>
        </form>

        <div className="text-[#9e9e9e] text-[16px] mt-10 cursor-pointer hover:underline  ">
          Terms of Service and Privacy Policy
        </div>
      </section>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="info-dialog-title"
        aria-describedby="info-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "#000",
            color: "#fff",
          },
        }}
      >
        <DialogTitle id="info-dialog-title">Credentials Sent</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="info-dialog-description"
            style={{ color: "#ccc" }}
          >
            Your username and password have been securely sent to your
            registered email address. Please check your inbox to proceed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus style={{ color: "#aaa" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Signup;
