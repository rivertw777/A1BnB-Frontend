import React, { useEffect } from "react";
import { useAppContext, deleteToken } from "../../store";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { MehOutlined } from "@ant-design/icons";

export default function Logout() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(deleteToken());
    navigate("/");
  });

  notification.open({
    message: "로그아웃 완료",
    icon: <MehOutlined  style={{ color: "#fa8c16" }} />
  });
}