// 게시물 등록 페이지
import React, { useEffect, useState, useRef } from "react";
import { Card, notification } from "antd";
import { MehOutlined } from "@ant-design/icons";
import SubmitPostForm from "../../components/posts/SubmitPostForm";
import { useNavigate, useLocation } from 'react-router-dom';
import "./SubmitPost.scss";

export default function SubmitPost() {
  const location = useLocation();
  const navigate = useNavigate();

  // 사진 Id 리스트
  const [photoIdList] = useState(location.state.photoIdList || []);

  const isFirstRender = useRef(true);

  // 뒤로가기 페이지 접근 방지
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if(location.state?.from !== 'InferResult'){
        notification.open({
            message: "사진을 다시 등록해주세요.",
            icon: <MehOutlined  style={{ color: "#fa8c16" }} />
          });
        navigate('/posts/upload', { replace: true });
      } else {
        navigate(location.pathname, { state: { ...location.state, from: null }, replace: true });
      }
    }
  }, [location, navigate]);

  return (
    <div className="SubmitPost">
      <Card 
        title = {
          <span style={{ color: '#666666' }}>게시물 등록하기</span>
        }
      >
        <SubmitPostForm photoIdList={photoIdList} />
      </Card>
    </div>
  );
}