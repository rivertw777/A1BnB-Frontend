import React from "react";
import { Card } from "antd";

function Result({ result }) {

  const {  photoUrls, location } = result;

  return (
    <div className="post" style={{ display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: "50px" }}>
      <Card 
        style={{ width: '20rem', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', margin: '0 20px' }}
        cover={
          <div style={{ padding: "20px", paddingBottom: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={photoUrls[0]} alt="사진" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover",  width: "200px", height: "200px" }}/>
          </div>
        }
      >
        <Card.Meta
          title={location}
          style={{ marginBottom: "2em" }}
        />
      </Card>
    </div>
  );
}

export default Result;