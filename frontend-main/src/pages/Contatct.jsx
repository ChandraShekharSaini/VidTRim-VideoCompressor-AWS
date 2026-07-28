import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { CloseFullscreen } from "@mui/icons-material";
import { Toaster, toast } from "sonner";
import serverUrl from "../api/ApiFile";
import axios from "axios";

const Contatct = () => {
  const [pending, setPending] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  console.log(formData);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setPending(true);
    try {
      const res = await serverUrl.post("/api/query/message", formData);
      console.log(res);

      if (res.status === 200) {
        console.log(res);
        setPending(false);
        toast.success(res.data.message);
        setPending(false);
      }
    } catch (error) {
      console.log(error);
      setPending(false);
      toast.warning(error.message);
    }
  };

  return (
    <>
      <Toaster position="bottom-right" richColors expand={true} closeButton />
      <form
        onSubmit={handleSubmit}
        className="w-full h-screen grid md:grid-cols-10  "
      >
        <div className="bg-white md:col-span-5 p-7 lg:pl-[200px] p pt-[50px] md:pt-[100px]  md:pr-6">
          <div className="flex flex-col gap-1">
            <p className="text-[30px] font-bold ">How can we help?</p>
            <p className="text-gray">
              Send us a message or question and we’ll
              <br /> help you as soon as we can.
            </p>
          </div>

          <div className="flex flex-col gap-5 mt-9">
            <input
              onChange={handleChange}
              className="p-3 outline-none border-2 border-gray-400 focus:border-3 focus:border-[#1396e1] focus:bg-[#e8f0fe] rounded-[5px]"
              placeholder="Enter Name"
              type="text"
              name="userName"
              required
            />

            <input
              onChange={handleChange}
              className="p-3 outline-none border-2 border-gray-400 focus:border-3 focus:border-[#1396e1] focus:bg-[#e8f0fe] rounded-[5px]"
              placeholder="Enter Email"
              name="userEmail"
              type="text"
              required
            />

            <textarea
              onChange={handleChange}
              className="p-3 outline-none border-2 border-gray-400 focus:border-3 focus:border-[#1396e1] focus:bg-[#e8f0fe] rounded-[5px]"
              name="userMessage"
              placeholder="Enter message"
              rows={4}
              cols={6}
              required
            ></textarea>

            <button
              type="submit"
              className="outline-none border-none text-white font-semibold py-2 px- bg-[#008847] hover:bg-[#115735] w-[100px] rounded-full"
            >
              {pending ? <p>Sending...</p> : <p> Send</p>}
            </button>
          </div>
        </div>

        <div className="bg-[#ff4500] md:col-span-5 flex flex-col justify-center gap-24 md:gap-32  text-white leading-tight font-serif py-12 md:py-0 ">
          <div className="flex md:flex-row  justify-between gap-4 w-[95%] md:w-[80%] h-[40%] mx-auto">
            <div className="bordr-2 border-black flex flex-col   gap-3  ">
              <p className="font-bold ">Chicago</p>

              <address>
                303 East Wacker, Suite 2101
                <br /> Chicago, IL 60601
                <br /> United States of America
              </address>

              <p
                className="hover:underline   hover:text-[#00bcff]
                    cursor-pointer  "
              >
                view map →
              </p>

              <p>
                For General Inquiries and Billing:
                <br /> +1 (833) 982-1803 <br /> (10AM-5PM Weekdays)
              </p>
            </div>

            <div>
              <img src="/city-chicago.svg" className=" md:w-20 w-16   " />
            </div>
          </div>

          <div className="flex flex-row  justify-between gap-4 w-[95%] md:w-[80%] mx-auto ">
            <div className=" flex flex-col gap-3  ">
              <p className="font-bold">Jaipur</p>

              <address>
                5th floor, Gt Square Mall, Kalyan
                <br /> Colony, D-Block, Malviya Nagar, <br /> Jaipur, Rajasthan
                302017
              </address>

              <p
                className="hover:underline   hover:text-[#00bcff]
                    cursor-pointer  "
              >
                view map →
              </p>
            </div>

            <div className="  flex items-center">
              <img src="/city-Jaipur.svg" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Contatct;
