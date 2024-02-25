// 로그아웃 페이지
import React, { useEffect } from "react";
import { useAppContext, deleteToken } from "../../store";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { MehOutlined } from "@ant-design/icons";
import { useAxios, axiosInstance } from "../../api";

export default function Logout() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const {
    store: { jwtToken }
  } = useAppContext();

  const headers = { Authorization: `Bearer ${jwtToken}` };

  const [{ loading, error }, refetch] = useAxios({
    url: "/api/security/logout",
    headers
  });

  useEffect(() => {
    dispatch(deleteToken());
    navigate("/");
  });

  notification.open({
    message: "로그아웃 완료",
    icon: <MehOutlined  style={{ color: "#fa8c16" }} />
  });
}