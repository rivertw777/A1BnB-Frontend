// 추론 결과 
import React from "react";
import { Card } from "antd";

function InferenceResult({ result }) {
  const { roomType, detectedUrl, ammenityTypes } = result;

  return (
    <div className="post" style={{ width: 'calc(40% - 20px)', marginBottom: "50px" }}>
      <Card 
        title={<div style={{ textAlign: 'center', color: '#666666', fontSize: '20px' }}>Type: {roomType}</div>} 
        style={{ width: '100%', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', margin: '0 20px' }}
        cover={
          <div style={{ paddingTop: "30px", paddingBottom: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={detectedUrl} alt="사진" style={{ width: "400px", height: "400px" }}/>
          </div>
        }
      >
        <Card.Meta title={<div style={{ textAlign: 'center', color: '#666666', fontSize: '20px' }}>Amenities: {ammenityTypes && ammenityTypes.length > 0 ? ammenityTypes.join(", ") : "None"}</div>} />
      </Card>
    </div>
  );
}

export default InferenceResult;
