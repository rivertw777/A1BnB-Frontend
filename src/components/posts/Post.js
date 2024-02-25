// 게시물 
import React from "react";
import { Card } from "antd";


function Post({ post }) {

  const { authorName, photoUrls, location } = post;

  const Description = ({ authorName }) => (
    <div>
      Host: {authorName}님<br />
      2월 25일~26일
    </div>
  );

  return (
    <div className="post" style={{ display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: "0px" }}>
      <Card 
        style={{ width: '20rem', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', margin: '0 20px' }}
        cover={
          <div style={{ paddingTop: "0px", paddingBottom: "0px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={photoUrls[0]} alt="사진" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover",  width: "300px", height: "200px" }}/>
          </div>
        }
      >
        <Card.Meta
          title={location}
          description={<Description authorName={authorName} />}
          style={{ marginBottom: "2em" }}
        />
      </Card>
    </div>
  );
}

export default Post;