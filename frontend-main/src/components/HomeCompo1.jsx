import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const HomeCompo1 = () => {
    const { currentUser } = useSelector((state) => state.user)

    return (
        <section className='w-full  bg-black   sm:p-16 md:p-24 p-9 pt-20 pb-20    md:pl-10 md:pr-10  lg:pl-20 lg:pr-20  flex flex-col lg:flex-row items-center justify-between gap-7 lg:gap-0 '>
            <div className='text-center lg:text-left   lg:pt-12 lg:pl-10 w-full  md:w-[90%] lg:w-[70%] '>
                <h2 className='text-white mt-10  font-serif  text-[40px] sm:text-[45px] md:text-[60px] lg:text-[90px] font-bold bg-gradient-to-b from-[#eeeeee] via-[#d8d8d8] via-30% to-[#b5b5b5] to-70% text-transparent bg-clip-text '>Try  VidTrim Now</h2>


                <span className=' border-gray-600 mt-5 inline-block rounded-md p-1'>
                    {
                        currentUser ? (

                            <Link to="/video-upload">
                                <button className='font-mono text-[18px] font-semibold flex items-center justify-center gap-3  bg-[#ffffff] px-7 py-3 rounded-md group '
                                    onMouseEnter={(e) => {
                                        const video = e.currentTarget.querySelector("video");
                                        video.currentTime = 0;
                                        video.play();
                                    }}
                                    onMouseLeave={(e) => {
                                        const video = e.currentTarget.querySelector("video");
                                        video.pause();
                                        video.currentTime = 0;
                                    }}
                                >
                                    <video

                                        playsInline
                                        muted
                                        loop

                                        className='w-8 h-8  group-hover:opacity-100 transition-opacity duration-300'
                                    >

                                        <source src="/logo-white.mp4" type="video/mp4" />

                                    </video>

                                    Try For Free</button>
                            </Link>
                        ) : (
                            <Link to="/create-account/sign-up">
                                <button className='font-mono text-[18px] font-semibold flex items-center justify-center gap-3  bg-[#ffffff] px-7 py-3 rounded-md group '
                                    onMouseEnter={(e) => {
                                        const video = e.currentTarget.querySelector("video");
                                        video.currentTime = 0;
                                        video.play();
                                    }}
                                    onMouseLeave={(e) => {
                                        const video = e.currentTarget.querySelector("video");
                                        video.pause();
                                        video.currentTime = 0;
                                    }}
                                >
                                    <video

                                        playsInline
                                        muted
                                        loop

                                        className='w-8 h-8  group-hover:opacity-100 transition-opacity duration-300'
                                    >

                                        <source src="/logo-white.mp4" type="video/mp4" />

                                    </video>

                                    Try For Free</button>
                            </Link>
                        )
                    }
                </span>

            </div >



            <div className=' flex justify-center  items-center w-[80%]  mt-3  md:w-[50%] lg:w-[30%] h-[90%]'>
                <img className=' w-[65%] sm:w-[80%] lg:w-[90%]' src="/logo-dark.avif" alt="" />
            </div>
        </section >
    )
}

export default HomeCompo1



