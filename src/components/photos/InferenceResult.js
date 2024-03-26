// 추론 결과 카드
import React from "react";
import { Card } from "antd";
import "./InferenceResult.scss"; 

export default function InferenceResult({ result }) {
  // 추론 결과 정보
  const { roomType, detectedUrl, amenityTypes } = result;

  return (
    <div className="post">
      <Card cover={<img alt="사진" src={detectedUrl} style={{borderRadius: '20px 20px 0 0'}} />}>
        <Card.Meta
          title={
            <div style={{ textAlign: 'center' }}>
              <div>방 유형: {roomType}</div>
              <div>편의 시설(용품): {amenityTypes && amenityTypes.length > 0 ? amenityTypes.join(", ") : "None"}</div>
            </div>
          }
        />
      </Card>
    </div>
  );
}
