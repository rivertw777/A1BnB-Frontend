// 게시물 등록 페이지
import React, { useState } from "react";
import { Card } from "antd";
import SubmitPostForm from "../../components/posts/SubmitPostForm";
import { useLocation } from 'react-router-dom';
import "./SubmitPost.scss";


export default function SubmitPost() {
    const location = useLocation();
    const [photoIdList] = useState(location.state.photoIdList || []);
    console.log(photoIdList);

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