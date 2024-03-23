// 추론 결과
import React from "react";
import { Card } from "antd";
import "./InferenceResult.scss"; // 스타일 시트 임포트

function InferenceResult({ result }) {
  const { roomType, detectedUrl, amenityTypes } = result;

  return (
    <div className="post">
      <Card cover={<img alt="사진" src={detectedUrl} style={{borderRadius: '20px 20px 0 0'}} />}>
        {/* Card.Meta 사용하여 방 유형과 편의 시설(용품) 정보 모두 title에 포함 */}
        <Card.Meta
          title={
            <div style={{ textAlign: 'center' }}>
              <div>방 유형: {roomType}</div>
              <div>편의 시설(용품): {amenityTypes && amenityTypes.length > 0 ? amenityTypes.join(", ") : "None"}</div>
            </div>
          }
          // description 프로퍼티 제거
        />
      </Card>
    </div>
  );
}


export default InferenceResult;
