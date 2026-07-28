import React from 'react'

const HomeCompo2 = () => {
    return (
        <section className='bg-black p-2  sm:p-12  w-full '>
     

            <div className='bg-[#323232] flex flex-col justify-center items-center  gap-10 sm:gap-14 md:gap-20  px-5 pb-5  rounded-3xl '>
                <div className='text-white text-center text-[32px] sm:text-[45px] md:text-[55px] lg:text-[60px] mt-10  tracking-tight sm:tracking-tighter font-semibold'>
                    MORE FROM VidTrim

                </div>



                <div className='flex flex-col items-center lg:flex-row  justify-center gap-10  lg:gap-5 '>

                    <div className='flex flex-col  gap-4  w-[100%]  sm:w-[80%] md:w-[70%] lg:w-[30%] h-[550px] pb-5 rounded-3xl bg-[#454545]'>
                        <img className='w-full h-[250px] rounded-3xl' src="/compo2Image1.png" />

                        <div className='flex flex-col  gap-16 px-5 '>
                            <div className='text-white leading-8  tracking-tighter  text-[32px] font-sans font-semibold'>
                                6 Easy Ways to Compress Video Files (Without Losing Quality)
                            </div>

                            <p className='text-[#969696] leading-tight text-[16px] font-Montserrat font-medium '>Figuring out how to compress a video file without losing quality doesn’t have to be a long and drawn-out process. Try these simple methods now!</p>
                        </div>
                    </div>


                    <div className='flex flex-col gap-4  w-[100%] sm:w-[80%] md:w-[70%] lg:w-[30%]  min-h-[550px] pb-5 rounded-3xl bg-[#454545]'>
                        <img className='w-full h-[250px] rounded-3xl' src="/compo2Image2.jpeg" />

                        <div className='flex flex-col gap-16 px-5'>
                            <div className='text-white leading-8 tracking-tighter  text-[32px] font-sans font-semibold'>
                                Top 5 Methods to Compress Your Video Files for Email (And When to Use Each)
                            </div>

                            <p className='text-[#969696] leading-tight text-[16px] font-Montserrat font-medium '>With so many different ways to compress your video file for email, it can be difficult to understand which is the best method for you. We eliminate the tedious guesswork by talking about the top 5 ways and when to use each one. </p>
                        </div>
                    </div>


                    <div className='flex flex-col gap-4  w-[100%] sm:w-[80%] md:w-[70%] lg:w-[30%]  min-h-[550px]  pb-5 rounded-3xl bg-[#454545]'>
                        <img className='w-full h-[250px] rounded-3xl' src="/compo2Image3.png" />

                        <div className='flex flex-col gap-16 px-5 '>
                            <div className='text-white leading-8 tracking-tighter  text-[32px] font-sans font-semibold'>
                                How to Send Large Video Files (from Desktop, iPhone, and Android)
                            </div>

                            <p className='text-[#969696] leading-tight text-[16px] font-Montserrat font-medium '>Have a large video file that you'd like to share? Check out the 7 best methods that can help with that.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HomeCompo2
