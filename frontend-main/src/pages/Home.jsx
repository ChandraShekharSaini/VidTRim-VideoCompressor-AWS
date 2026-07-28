import React, { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import LogoCarousel from "../components/LogoCarousel";
import HomeCompo1 from "../components/HomeCompo1";
import HomeCompo2 from "../components/HomeCompo2";
import HomeCompo3 from "../components/HomeCompo3";
import HomeCompo4 from "../components/HomeCompo4";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";
import { jwtDecode } from "jwt-decode";
import DownloadFile from "./DownloadFile";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        const decoded = jwtDecode(parsedToken);

        dispatch(signInSuccess(decoded.user));
      } catch (error) {
        navigate("/create-account/sign-in");
      }
    }
  }, [location.search]);

  return (
    <>
      <section className="w-full min-h-screen pt-20 z-20 sm:pt-24 md:pt-28 lg:pt-32 bg-black flex items-center">
        <Navbar />
        <div className='w-[95%] mt-7 sm:mt-0 min-h-[600px] mx-auto flex flex-col items-center bg-[url("/gradient-hero-prerender.avif")] bg-cover bg-center bg-no-repeat rounded-lg p-4 sm:p-6 md:p-8 lg:p-10'>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[110px] font-bold text-white text-center leading-tight">
            The Video Compressor
          </h1>

          <div className="text-white text-base sm:text-lg md:text-xl lg:text-[20px] text-center mt-4 sm:mt-6">
            Designed to make your video compression seamless and efficient,
            <br className="hidden sm:block" />
            Video is the smartest way to reduce video size without compromising
            quality.
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5 mt-6 sm:mt-8 md:mt-10 w-full sm:w-auto">
            {currentUser ? (
              <>
                <Link to="/video-upload" className="w-full sm:w-auto">
                  <div className="shadow-[0_0_0_0.5px_#ffffff] border-gray-600 p-1 rounded-lg">
                    <button className="flex justify-center items-center gap-2 py-3 sm:py-4 px-3 sm:px-4 w-full bg-white rounded-lg font-semibold font-mono text-sm sm:text-base">
                      <img
                        src="/penguin.avif"
                        className="w-6 h-6 sm:w-8 sm:h-8"
                      />
                      Compress a Video
                    </button>
                  </div>
                </Link>

                <Link to="" className="w-full sm:w-auto">
                  <div className="shadow-[0_0_0_0.5px_#ffffff] p-1 rounded-lg">
                    <button className="py-3  sm:py-4 px-3 sm:px-4 w-full bg-black text-white rounded-lg font-semibold font-mono text-sm sm:text-base">
                      Premium Plan
                    </button>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/create-account/sign-in" className="w-full sm:w-auto">
                  <div className="shadow-[0_0_0_0.5px_#ffffff] border-gray-600 p-1 rounded-lg">
                    <button className="flex justify-center items-center gap-2 py-3 sm:py-4 px-3 sm:px-4 w-full bg-white rounded-lg font-semibold font-mono text-sm sm:text-base">
                      <img
                        src="/penguin.avif"
                        className="w-6 h-6 sm:w-8 sm:h-8"
                      />
                      Compress a Video
                    </button>
                  </div>
                </Link>

                <Link to="/create-account/sign-up" className="w-full sm:w-auto">
                  <div className="shadow-[0_0_0_0.5px_#ffffff] p-1 rounded-lg">
                    <button className="py-3 sm:py-4 px-3 sm:px-4 w-full bg-black text-white rounded-lg font-semibold font-mono text-sm sm:text-base">
                      SIGN UP
                    </button>
                  </div>
                </Link>
              </>
            )}
          </div>

          <div className="w-full mt-6 sm:mt-8 md:mt-10 px-2 sm:px-4 md:px-6 lg:px-8">
            <video
              className="w-full max-w-[1200px] mx-auto h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] object-cover rounded-lg"
              loop
              autoPlay
              playsInline
              muted
            >
              <source src="/motion-tracking.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <HomeCompo1 />
      <HomeCompo2 />
      <HomeCompo3 />
      <HomeCompo4 />
      <Footer />

      {/* <div className={styles.mainCrousel}>


            <section className={styles.crousel}>


                <div className={styles.crouselHeading} >
                    Video  <span className={styles.gradientText}>Compressor</span>
                </div>
                <div className={styles.crouselParagraph} >
                    <div>Easily compress videos online without signing up. <span className={styles.halfHeading}>Upload your MP4, MOV, WebM, GIF, MPEG, and other formats, select your desired file size, and compress it. Achieve up to 80% file size compression quickly and easily.</span></div>
                    <button className={styles.crouselButton} onClick={handleNavigate}>
                        Compress a Video
                    </button>
                </div>
                <div className={styles.crouselImage} >
                    <img src="https://assets-static.invideo.io/images/large/Export_PNG_78c4e4b9ee.webp" alt='image' />
                </div>

            </section>
        </div> */}
      {/* <LogoCarousel />
        <Footer />  */}
    </>
  );
};

export default Home;
