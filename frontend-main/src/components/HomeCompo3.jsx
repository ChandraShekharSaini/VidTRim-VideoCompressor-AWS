import React from 'react'

const HomeCompo3 = () => {
    return (
        <section className='w-full py-10 bg-[#eceeee] '>
            <div className='w-[90%] py-10 px-5 sm:px-10 md:px-20 flex flex-col gap-10 justify-center  items-center mx-auto bg-[#ffffff] rounded-3xl shadow-2xl'>
                <div className='font-Boldonse text-center  text-[#404040] text-[20px]  sm:mt-6 sm:text-[30px] md:text-[32px] lg:text-[45px]' >
                    Compress and convert videos, repurpose content, edit with AI, and more
                </div>


                <div className='md:flex md:flex-row gap-10   text-[22px] sm:text-[25px] font-Oswald font-light  sm:mt-10'>
                    <p>
                        VEED’s video compressor is only one of the many tools you can use when you choose our platform. From cropping and light and color adjustments to video filtering and compressing videos, our video editor has got it all. You can remove your video’s
                    </p>

                    <p>background in one click and replace it with an image or another video. Remove filler words in your recordings, eliminate background noise in your audio, and more. Try VEED today and experience powerful video editing without the learning curve!

                    </p>
                </div>

                <img className='w-full lg:w-[90%] lg:h-[90%]' src="/compo3Image.avif" alt="Image" />
            </div>
        </section>
    )
}

export default HomeCompo3
