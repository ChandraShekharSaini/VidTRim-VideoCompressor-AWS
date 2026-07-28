import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/userSlice";
import axios from "axios";
import serverUrl from "../api/ApiFile";

const authCustomhook = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("logout logout");

    try {
      console.log("tryyy");

      dispatch(signOutUserStart());
      const response = await serverUrl.get(
        `/api/auth/sign-out/${currentUser._id}`
      );
      console.log(response);

      if (response.status === 200) {
        dispatch(signOutUserSuccess(response.data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signOutUserFailure(error.message));

      if (error.response.status === 401) {
        console.log(error);
        toast.info(error.response.data.message, {
          theme: "dark",
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const response = await serverUrl.delete(
        `/api/auth/delete-user/${currentUser._id}`
      );

      console.log(response);

      if (response.status === 200) {
        dispatch(deleteUserSuccess(response.data.user));
        toast.success(response.data.message, {
          theme: "dark",
        });
        navigate("/");
      }
    } catch (error) {
      console.log("=================");
      console.log(error);
      dispatch(deleteUserFailure(error.message));
      toast.info(error.response.data.message || error.message, {
        theme: "dark",
      });
    }
  };

  return { handleLogout, handleDelete };
};

export default authCustomhook;
