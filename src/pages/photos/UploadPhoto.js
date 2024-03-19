// 숙소 사진 등록 페이지
import React from "react";
import { Card } from "antd";
import UploadPhotoForm from "../../components/photos/UploadPhotoForm";
import "./UploadPhoto.scss";

export default function UploadPhoto() {
  return (
    <div className="UploadPhoto" style={{ display: 'flex', justifyContent: 'center' }}>
      <Card 
        title={
          <span style={{ color: '#666666' }}>숙소 사진을 5장 등록해주세요<br />AI가 등록한 사진을 분석해드려요!</span>
        }
        style={{ width: '700px', textAlign: 'center' }} 
      >
        <UploadPhotoForm />
      </Card>
    </div>
  );
}
