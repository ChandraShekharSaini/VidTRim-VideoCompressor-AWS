import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-[#060b10] flex-col flex justify-center gap-2 items-center w-fll h-screen t text-center">
      <video
        className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover  hover:scale-125 transition duration-500 "
        loop
        autoPlay
        muted
        playsInline
        src="/logo-black.mp4"
      />

      <img src="/Page404.svg" className="w-[80%]  sm:w-[70%] md:w-[50%] lg:w-[35%] mt-5" />

      <p className="text-white font-bold text-[25px] mt-3 ">Page not found</p>
      <p className="text-[#9ca5ae] ">
        You might not have permissions to see this page
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-[#32e6e2] text-[[#060b10]] outline-none border-none py-2 px-2 font-semibold rounded-lg mt-5"
      >
        Back to home
      </button>
    </section>
  );
};

export default ErrorPage;

// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// const ErrorPage = () => {

//     const navigate = useNavigate()

//     return (
//         <section className="bg-[url('/errorBackground.svg')]  sm:px-3 flex flex-col items-center gap-7 justify-center  bg-cover bg-center h-screen w-full bg-[#2a222b]"
//         >
//             <div className=' flex justify-center  rounded-lg'>
//                 <img src="404Animation.gif" className=' w-[90%]   sm:w-full    bg-transparent border-[1px] rounded-xl' />
//             </div>

//             <div className='flex flex-row gap-6'>
//                 <Link to='/'>
//                     <button className='px-7 py-1 bg-red-500 hover:bg-red-600 text-white rounded-sm font-mono '>Home</button>
//                 </Link>

//                 <Link onClick={() => navigate(-1)}>

//                     <button className='px-7 py-1 bg-red-500 hover:bg-red-600 text-white rounded-sm font-mono '>Go Back</button>
//                 </Link>

//             </div>
//         </section>
//     )
// }

// export default ErrorPage
