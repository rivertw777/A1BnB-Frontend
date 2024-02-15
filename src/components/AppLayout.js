import React from "react";
import { Input, Button } from "antd";
import "./AppLayout.scss";
import { useAppContext } from "../store";
import LogoImage from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function AppLayout({ children }) {
  const {
    store: { isAuthenticated, jwtToken },
  } = useAppContext();

  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">
          <a href="/">
            <img src={LogoImage} alt="logo" />
          </a>
        </h1>
        <div className="search">
          <Input.Search />
        </div>
        <div className="topnav">
          <Button
            type="link"
            onClick={() => navigate("users/regist")}
            style={{
              color: "#FF5A5F",
              fontFamily: "Arial",
              fontWeight: "bold",
            }}
          >
            당신의 공간을 A1BnB하세요!
          </Button>
          <Button
            type="link"
            onClick={() => navigate("users")}
            style={{
              color: "#FF5A5F",
              fontFamily: "Arial",
              fontWeight: "bold",
              fontSize: "13.5px"
            }}
          >
            My Page
          </Button>
          {isAuthenticated ? (
            <Button
              type="link"
              onClick={() => navigate("users/logout")}
              style={{
                color: "#FF5A5F",
                fontFamily: "Arial",
                fontWeight: "bold",
                fontSize: "13.5px"
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              type="link"
              onClick={() => navigate("users/login")}
              style={{
                color: "#FF5A5F",
                fontFamily: "Arial",
                fontWeight: "bold",
                fontSize: "13.5px"
              }}
            >
              Login
            </Button>
          )}
        </div>
      </div>
      <div className="contents">{children}</div>
      <div className="footer">&copy; 2024. Taewon Company.</div>
    </div>
  );
}

export default AppLayout;
