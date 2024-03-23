// 게시물 
import React, { useState, useEffect } from 'react';
import { Card, Carousel } from "antd";
import { useAxios, axiosInstance } from "../../api";
import { HeartOutlined, HeartTwoTone, FrownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import './Post.scss'; // SCSS 파일 임포트

function Post({ post }) {
  const navigate = useNavigate();
  const { postId, hostName, photoUrls, location, pricePerNight } = post;
  const [likeCount, setLikeCount] = useState(0);

  // photoUrls 리스트에서 처음 4개의 요소만을 가져와서 새로운 리스트를 만듭니다.
  const limitedPhotoUrls = photoUrls.slice(0, 5);

  // 게시물 좋아요 수 API 호출
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await axiosInstance.get(`/api/posts/${postId}/like/count`);
        setLikeCount(response.data.likeCount);
      } catch (error) {

      }
    };
    fetchLikeCount();
  }, [postId]);

  const goToPostDetail = () => {
    navigate(`/posts/${postId}`); 
  };
  
  
  return (
    <div className="postContainer">
      <Card 
        className="postCard"
        onClick={goToPostDetail}
        cover={
          <Carousel arrows autoplay={true} speed={3000}>
            {limitedPhotoUrls.map((url, index) => (
              <div key={index} className="carouselImage">
                <img src={url} alt="사진" />
              </div>
            ))}
          </Carousel>
        }
      >
        <Card.Meta
          title={
            <div className="locationAndLike">
              {location}
              <div className="likeCount">
                <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: '20px', marginRight: '10px' }}/>
                <p>{likeCount}</p>
              </div>
            </div>
          }
          description={`Host: ${hostName}님`}
          style={{ marginBottom: "-0.5em" }}
        />
        <p className="pricePerNight"><strong>{pricePerNight.toLocaleString()}₩</strong> / 1박</p>
      </Card>
    </div>
  );
}

export default Post;
  
