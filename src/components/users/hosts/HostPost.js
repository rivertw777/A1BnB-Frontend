import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'antd';
import { HeartTwoTone, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../../api";
import { useAppContext } from "../../../store";
import moment from 'moment';

export default function HostPost({ post }) {
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { postId, createdAt, thumbnail, location, pricePerNight, hasReservation } = post;
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
        if (!isModalVisible) {
            navigate(`/posts/${postId}`);
        }
    }

    const showDeleteModal = (event) => {
        event.stopPropagation(); 
        setIsModalVisible(true);
    };

    const handleDelete = () => {
        axiosInstance.delete(`/api/posts/${postId}`, { headers })
            .then(response => {
                setIsModalVisible(false);
                window.location.reload(); // 페이지 새로고침 
            })
            .catch(error => {

            });
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

return (
    <>
        <Card
            title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#666666' }}>
                    <span>{`등록일: ${moment(createdAt).format('YYYY년 MM월 DD일')} `}</span>
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
            <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                <Button 
                    onClick={showDeleteModal} 
                    disabled={hasReservation}
                    style={{ 
                        backgroundColor: '#7788E8', 
                        borderColor: '#7788E8', 
                        color: 'white', 
                        fontSize: '15px', 
                        width: '90px', 
                        height: '45px', 
                        display: 'flex', // Flexbox 레이아웃을 사용합니다.
                        justifyContent: 'center', // 수평 방향에서 중앙 정렬합니다.
                        alignItems: 'center',
                    }}
                >
                    게시물 삭제
                </Button>
            </div>
            <Modal
                title="정말 삭제하시겠습니까?"
                visible={isModalVisible}
                onOk={handleDelete}
                onCancel={handleClose}
                okText="예"
                cancelText="아니요"
                width={500} 
                style={{ top: 200 }} 
                footer={[
                    <div style={{ display: 'flex', justifyContent: 'center' }}> 
                        <Button 
                            key="back" 
                            onClick={handleClose} 
                            style={{ 
                                backgroundColor: 'white', 
                                color: 'black', 
                                marginRight: 10, 
                                marginTop: '20px',
                                width: '80px', 
                                height: '40px'
                            }}
                        >
                            아니요
                        </Button>
                        <Button 
                            key="submit" 
                            onClick={handleDelete} 
                            style={{ 
                                backgroundColor: 'white', 
                                color: 'black', 
                                marginTop: '20px',
                                width: '80px', 
                                height: '40px' 
                                }}
                            >
                            예
                        </Button>
                    </div>
                ]}
            >
            </Modal>
        </Card>
    </>
);
}
