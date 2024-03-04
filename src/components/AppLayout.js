// 전체 레이아웃
import { React } from 'react';
import { Input, Button } from "antd";
import { useAppContext } from "../store";
import { useNavigate } from "react-router-dom";
import "./AppLayout.scss";

function AppLayout({ children }) {
  const {
    store: { isAuthenticated, jwtToken },
  } = useAppContext();

  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">
          <Button
            type="link"
            onClick={() => navigate("/")}
            style={{
              color: "#7788E8",
              fontFamily: "Arial",
              fontWeight: "bold",
              fontSize: "30px"
            }}
          >
            A1BnB
          </Button>
        </h1>
        <div className="search">
          <Input.Search />
        </div>
        <div className="topnav">
          <Button
            type="link"
            onClick={() => navigate("/photos/upload")}
            style={{
              color: "#7788E8",
              fontFamily: "Arial",
              fontWeight: "bold",
              fontSize: "18px"
            }}
          >
            당신의 공간을 A1BnB하세요!
          </Button>
          <Button
            type="link"
            onClick={() => navigate("/users")}
            style={{
              color: "#7788E8",
              fontFamily: "Arial",
              fontWeight: "bold",
              fontSize: "15px"
            }}
          >
            My Page
          </Button>
          {isAuthenticated ? (
            <Button
              type="link"
              onClick={() => navigate("/users/logout")}
              style={{
                color: "#7788E8",
                fontFamily: "Arial",
                fontWeight: "bold",
                fontSize: "15px"
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              type="link"
              onClick={() => navigate("/users/login")}
              style={{
                color: "#7788E8",
                fontFamily: "Arial",
                fontWeight: "bold",
                fontSize: "15px"
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
