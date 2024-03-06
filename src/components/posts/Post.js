// 게시물 
import React from "react";
import { Card, Carousel } from "antd";
import { HeartOutlined, HeartTwoTone, FrownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Post({ post }) {

  const { postId, authorName, photoUrls, location, pricePerNight, likeCount } = post;

  // photoUrls 리스트에서 처음 4개의 요소만을 가져와서 새로운 리스트를 만듭니다.
  const limitedPhotoUrls = photoUrls.slice(0, 5);

  const navigate = useNavigate();
  const goToPostDetail = () => {
    navigate(`/posts/${postId}`); 
  };
  
  return (
    <div className="post" style={{ display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: "-10px" }}>
      <Card 
        style={{ width: '300px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', margin: '0 20px' }}
        onClick={goToPostDetail}
        cover={
          <Carousel arrows autoplay={true} speed={3000}>
            {limitedPhotoUrls.map((url, index) => (
              <div key={index} style={{ paddingTop: "0px", paddingBottom: "0px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={url} alt="사진" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover",  width: "300px", height: "210px" }}/>
              </div>
            ))}
          </Carousel>
        }
      >
        <Card.Meta
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {location}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative', top: '-2px'}}>
                <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: '20px', marginRight: '10px' }}/>
                <p style={{ margin: '0' }}>{likeCount}</p>
              </div>
            </div>
          }
          description={`Host: ${authorName}님`}
          style={{ marginBottom: "-0.5em" }}
        />
        <p style={{ marginBottom: "5px" }}><strong>{pricePerNight.toLocaleString()}₩</strong> / 1박</p>
      </Card>
    </div>
  );
}

export default Post;
