import React, { useEffect } from "react";
import { useAppContext, deleteToken } from "../../store";
import { useNavigate } from "react-router-dom";
import { axiosInstance, useAxios } from "../../api";

export default function Logout() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const {
    store: { jwtToken }
  } = useAppContext();


  const headers = { Authorization: `Bearer ${jwtToken}` };

  const [] = useAxios({
    url: "/api/security/logout",
    headers
  });

  useEffect(() => {
    dispatch(deleteToken());
    navigate("/");
  }, [dispatch, navigate]);
}