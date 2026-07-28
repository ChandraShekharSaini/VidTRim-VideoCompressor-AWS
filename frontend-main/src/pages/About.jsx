import React from "react";

const About = () => {
  return (
    <>
      <section className="min-h-screen w-full bg-[#242424] text-white text-3xl flex flex-col px-8 py-8 sm:pt-20 md:pt-24 lg:pt-32  sm:pl-20 md:first-letter md:gap-10  lg:gap-6">
        <div className="flex flex-col gap-1 sm:gap-2 md:gap-5 lg:gap-4 ">
          <p className="text-white text-[35px] sm:text-[50px] font-Boldonse">
            Everyone has{" "}
          </p>
          <p className="text-white text-[35px] sm:text-[50px] font-Boldonse mt-1 leading-normal">
            moments worth capturing.
          </p>
        </div>

        <div className="mt-14  md:w-[80%] lg:w-[55%] sm:mt-16  md:mt-16 lg:mt-9 text-[#f4f4e7] text-[18px] sm:text-[20px] md:text-[25px] leading-[27px] font-Oswald">
          VidTrim is a home for your videos optimized, compressed, and ready to
          share. Whether you're a content creator, a casual filmer, or someone
          looking to save space without losing quality, VidTrim makes video
          compression simple, powerful, and accessible to everyone. The internet
          is heavy with data and cluttered with tools that complicate the
          process. VidTrim is lightweight, clean, and focused. No confusing
          options, no bloated software just smart, fast compression designed to
          fit your needs and free up your space.
        </div>

        <div className="mt-14 md:w-[80%] lg:w-[55%] sm:mt-16 md:mt-16 lg:mt-9 text-[#f4f4e7] text-[18px] sm:text-[20px] md:text-[25px] leading-[27px] font-Oswald">
          We believe what you capture matters. Every video holds memory,
          creativity, or meaning. But oversized files shouldn't slow you down.
          That’s why we built VidTrim to help you keep the moments that matter,
          without sacrificing quality or time.
        </div>

        <div className="mt-14 md:w-[80%] lg:w-[55%] sm:mt-16 md:mt-16 lg:mt-9 text-[#f4f4e7] text-[18px] sm:text-[20px] md:text-[25px] leading-[27px] font-Oswald">
          Each month, thousands of people trust VidTrim to trim, compress, and
          prepare their videos for sharing, storing, or showcasing. Whether
          you're uploading to social media, saving space on your phone, or
          editing a project, VidTrim is here to help you do it effortlessly.
        </div>

        <div className="mt-14 md:w-[80%] lg:w-[55%] sm:mt-16 md:mt-16 lg:mt-9 text-[#f4f4e7] text-[18px] sm:text-[20px] md:text-[25px] leading-[27px] font-Oswald">
          We don’t run ads. We don’t sell your data. We're supported by a
          growing community of users who believe in a fast, private, and
          user-friendly way to manage their video content. If you're new here,
          start exploring. Compress your first video. See how much space you can
          save. Then keep creating, capturing, and sharing VidTrim will take
          care of the rest.
        </div>
      </section>
      <footer className="py-6 md:px-5  w-full bg-white text-black flex flex-col  md:flex-row justify-center items-center md:justify-between">
        <p> © 2025 VidTrim | All Rights Reserved</p>
        <p className="hover:underline cursor-pointer"> Privacy Policy</p>
      </footer>
    </>
  );
};

export default About;
