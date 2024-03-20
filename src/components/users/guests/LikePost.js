import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'antd';
import { HeartTwoTone, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../../api";

export default function LikePost({ post }) {
    const navigate = useNavigate();

    const { postId, hostName, thumbnail, location, pricePerNight } = post;
    const [likeCount, setLikeCount] = useState(0);

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
    }

return (
    <>
        <Card
            title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#666666' }}>
                    <span>호스트 {hostName}님의 숙소</span>
                    <RightOutlined />
                </div>
            }
            bordered={false}
            style={{ marginBottom: '20px', width: '470px', color: '#666666', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}
            onClick={goToPostDetail} 
        >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
                { thumbnail && (
                    <img src={ thumbnail} alt="숙소 이미지" style={{ width: '220px', height: '150px', marginRight: '30px', borderRadius: '10px' }} />
                )}
                <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', position: 'relative', top: '-20px', marginRight: '7px'}}>
                        <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: '20px', marginRight: '10px' }}/>
                        <p style={{ margin: '0' }}><strong>{likeCount}</strong></p>
                    </div>
                    <p>위치: {location}</p>
                    <p style={{ marginBottom: "5px" }}><strong>{pricePerNight.toLocaleString()}₩</strong> / 1박</p>
                </div>
            </div>
        </Card>
    </>
);
}
