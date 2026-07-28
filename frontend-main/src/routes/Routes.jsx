import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import DownloadFile from "../pages/DownloadFile";
import ErrorPage from "../pages/ErrorPage";
import FallbackLoading from "../components/FallbackLoading";
import PrivateRoute from "../components/PrivateRoute";

const About = lazy(() => import("../pages/About"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Profile = lazy(() => import("../pages/Profile"));
const VideoUpload = lazy(() => import("../pages/VideoUploader"));
const Dashbord = lazy(() => import("../pages/Dashbord"));
const LoadingPage = lazy(() => import("../pages/LoadingPage"));
const Code = lazy(() => import("../pages/Code"));
const Contact = lazy(() => import("../pages/Contatct"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<FallbackLoading />}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/create-account/sign-up" element={<Signup />} />
          <Route path="/create-account/sign-in" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/dashboard" element={<Dashbord />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/video-upload" element={<VideoUpload />} />
            <Route path="/download-video" element={<DownloadFile />} />
          </Route>

          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/code" element={<Code />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
