import React from "react";
import { Card } from "antd";
import PostNewForm from "../../components/posts/PostNewForm";
import "./BecomeHost.scss";

export default function BecomeHost() {
  return (
    <div className="BecomeHost">
      <Card 
        title={
          <span style={{ color: '#FF5A5F' }}>숙소 사진을 등록해주세요<br />AI가 등록한 사진을 분석해드려요!</span>
        }
        style={{ textAlign: 'center' }} // 이 부분을 추가
      >
        <PostNewForm />
      </Card>
    </div>
  );
}