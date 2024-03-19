import React, { useState } from 'react';
import { Card, Button, Modal } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../../api";
import { useAppContext } from "../../../store";
import moment from 'moment';

export default function ReservationCard({ reservation }) {
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const navigate = useNavigate();
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { bookId, postId, checkInDate, checkOutDate, thumbnail, location, paymentAmount, hostName } = reservation;

    const goToPostDetail = () => {
        navigate(`/posts/${postId}`);
    };

    const showCancelModal = (event) => {
        event.stopPropagation(); 
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        axiosInstance.delete(`/api/posts/${postId}/book/${bookId}`, { headers })
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
                        <span>{`${moment(checkInDate).format('YYYY년 MM월 DD일')} - ${moment(checkOutDate).format('YYYY년 MM월 DD일')}`}</span>
                        <RightOutlined />
                    </div>
                }
                bordered={false}
                style={{ marginBottom: '20px', width: '470px', color: '#666666', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}
                onClick={goToPostDetail} 
            >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    {thumbnail && (
                        <img src={thumbnail} alt="숙소 이미지" style={{ width: '200px', marginRight: '30px', borderRadius: '10px' }} />
                    )}
                    <div style={{ flexGrow: 1 }}>
                        <p>위치: {location}</p>
                        <strong><p>결제 금액: {paymentAmount}₩</p></strong>
                        <p>호스트: {hostName}</p>
                    </div>
                </div>
                <div style={{ marginTop: '5px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                    <Button 
                        onClick={showCancelModal} 
                        style={{ 
                            backgroundColor: '#7788E8', 
                            borderColor: '#7788E8', 
                            color: 'white', 
                            fontSize: '18px', 
                            width: '90px', 
                            height: '45px', 
                            display: 'flex', // Flexbox 레이아웃을 사용합니다.
                            justifyContent: 'center', // 수평 방향에서 중앙 정렬합니다.
                            alignItems: 'center',
                        }}
                    >
                        예약 취소
                    </Button>
                </div>
            </Card>
            <Modal
                title="정말 취소하시겠습니까?"
                visible={isModalVisible}
                onOk={handleCancel}
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
                            onClick={handleCancel} 
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
        </>
    );
}
