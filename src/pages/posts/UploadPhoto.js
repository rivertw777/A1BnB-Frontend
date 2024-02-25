// 숙소 사진 등록 페이지
import React from "react";
import { Card } from "antd";
import UploadPhotoForm from "../../components/posts/UploadPhotoForm";
import "./UploadPhoto.scss";

export default function UploadPhoto() {
  return (
    <div className="UploadPhoto">
      <Card 
        title={
          <span style={{ color: '#666666' }}>숙소 사진을 등록해주세요<br />AI가 등록한 사진을 분석해드려요!</span>
        }
        style={{ textAlign: 'center' }} // 이 부분을 추가
      >
        <UploadPhotoForm />
      </Card>
    </div>
  );
}