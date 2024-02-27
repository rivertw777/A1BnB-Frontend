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
  const [photoIdList] = useState(location.state.photoIdList || []);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // InferenceResult 페이지에서 왔는지 확인하고, 그렇지 않다면 UploadPhoto 페이지로 리다이렉트합니다.
      if(location.state?.from !== 'InferResult'){
        notification.open({
            message: "사진을 다시 등록해주세요.",
            icon: <MehOutlined  style={{ color: "#fa8c16" }} />
          });
        navigate('/posts/upload', { replace: true });
      } else {
        // InferenceResult 페이지에서 온 경우, state를 초기화합니다.
        navigate(location.pathname, { state: { ...location.state, from: null }, replace: true });
      }
    }
  }, [location, navigate]);
;

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