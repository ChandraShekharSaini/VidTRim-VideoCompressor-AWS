import React from "react";
import { Link } from "react-router-dom";
import userAuth from "../customhooks/userAuth";
import { RxCross2 } from "react-icons/rx";
import { FaSquareXTwitter } from "react-icons/fa6";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

const FlipBarHome = (props) => {
  const { GoogleAuthButton, GithubAuthButton, InstagramAuthButton } =
    userAuth();

  return (
    <section
      className={`w-[100%]   h-screen top-0 ${
        props.value ? "left-[0]" : "right-[-450px]"
      } bg-black  delay-700  z-50  md:hidden fixed `}
    >
      <div className="w-[100%]  bg-black flex justify-between items-center gap-7 h-[60px]  px-5 ">
        <div className="flex  items-center justify-start gap-2 sm:gap-4 pl-1 sm:pl-4 ">
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
            className={`font-mono font-bold text-2xl text-white  sm:text-3xl  md:text-4xl border-2 border-gray-500 rounded-sm  px-2 py-1 sm:px-4 sm:py-2 
          
          }`}
          >
            VidTrim
          </p>
        </div>

        <p className="border-2 border-black ">
          <RxCross2
            onClick={() => props.setflip(!props.value)}
            className="text-[30px]  text-white"
          />
        </p>
      </div>

      <div className="w-[100%] flex flex-col  items-center px-5 mt-8 gap-4">
        <Link to="/create-account/sign-in" className="w-full ">
          <div className="shadow-[0_0_0_0.5px_#ffffff] border-white p-1 rounded-lg">
            <button className="flex justify-center items-center gap-2 py-3  px-3  w-full bg-white text-black rounded-lg font-semibold font-mono text-sm sm:text-base cursor-pointer">
              Login
            </button>
          </div>
        </Link>

        <Link to="/create-account/sign-up" className="w-full ">
          <div className="shadow-[0_0_0_0.5px_#ffffff] p-1 rounded-lg">
            <button className="py-3  px-3  w-full bg-white text-black rounded-lg font-semibold font-mono text-sm sm:text-base cursor-pointer">
              SIGN UP
            </button>
          </div>
        </Link>

        <button
          onClick={GoogleAuthButton}
          type="button"
          className="p-2 w-full  bg-[#181818] border-[1px] text-[#cfcfcf] border-gray-400  mt-4   hover:border-gray-500 font-semibold rounded-[5px] flex justify-center items-center gap-2 cursor-pointer"
        >
          {" "}
          <img src="/google.svg" className="w-4 h-4 mr-2" /> Continue with
          Google
        </button>

        <button
          onClick={InstagramAuthButton}
          type="button"
          className="p-2  w-full  bg-[#181818] border-[1px] text-[#cfcfcf] border-gray-400  hover:border-gray-500 font-semibold rounded-[5px] flex justify-center items-center gap-2 cursor-pointer"
        >
          <img src="/githublogo.png" className="w-5 h-5 mr-2" /> Continue with
          Github
        </button>

        <button
          onClick={GithubAuthButton}
          type="button"
          className="p-2  w-full  bg-[#181818] border-[1px] text-[#cfcfcf] border-gray-400  hover:border-gray-500 font-semibold rounded-[5px] flex justify-center items-center gap-2 cursor-pointer"
        >
          {" "}
          <img src="/githublogo.png" className="w-5 h-5 mr-2" /> Continue with
          Facebook
        </button>
      </div>

      <div className="flex flex-col gap-3 mt-5">
        <Accordion>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: "#b6bec9" }} /> // 👈 Change arrow color here
            }
            aria-controls="panel1-content"
            id="panel1-header"
            className="hover:text-[#ffffff]"
            sx={{ backgroundColor: "#1b1b1d", color: "#b6bec9" }}
          >
            <Typography component="span">
              <p className="cursor-pointer">Compression APIs</p>
            </Typography>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              backgroundColor: "#1b1b1d",
              color: "#b6bec9",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Link to="" className="hover:text-[#ffffff]">
              Video Compression API
            </Link>

            <Link to="" className="hover:text-[#ffffff]">
              Compress PDF API
            </Link>

            <Link to="" className="hover:text-[#ffffff]">
              Image Compression API
            </Link>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: "#b6bec9" }} /> // 👈 Change arrow color here
            }
            aria-controls="panel1-content"
            id="panel1-header"
            className="hover:text-[#ffffff]"
            sx={{ backgroundColor: "#1b1b1d", color: "#b6bec9" }}
          >
            <Typography component="span">
              <p className="cursor-pointer">Documentation</p>
            </Typography>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              backgroundColor: "#1b1b1d",
              color: "#b6bec9",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Link
              to="https://github.com/ChandraShekharSaini/VidTrim.git"
              className="hover:text-[#ffffff] flex items-center gap-2 cursor-pointer"
            >
              <img src="/githublogo.png" className="w-6" />
              <p>Github</p>
            </Link>
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
};

export default FlipBarHome;
