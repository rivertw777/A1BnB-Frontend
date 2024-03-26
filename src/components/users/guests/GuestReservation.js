// 게스트 예약 정보 카드
import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, notification } from 'antd';
import { RightOutlined, FrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../../api";
import { useAppContext } from "../../../store";
import moment from 'moment';

export default function GuestReservation({ reservation }) {
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const navigate = useNavigate();   
    const [isModalVisible, setIsModalVisible] = useState(false);

    // 게스트 예약 정보
    const { bookId, postId, checkInDate, checkOutDate, thumbnail, location, paymentAmount, hostName } = reservation;

    // 본인 여부
    const [sameMemberCheck, setSameMemberCheck] = useState({});

    // 게시물 상세 페이지 이동
    const goToPostDetail = () => {
        navigate(`/posts/${postId}`);
    };

    // 예약 취소 모달
    const showCancelModal = (event) => {
        event.stopPropagation(); 
        setIsModalVisible(true);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

    // 게시물 예약 삭제 요청 API 호출
    const handleCancel = () => {
        axiosInstance.delete(`/api/posts/${postId}/book/${bookId}`, { headers })
            .then(response => {
                setIsModalVisible(false);
                window.location.reload(); // 페이지 새로고침 
            })
            .catch(error => {
                if (error.response) {
                    const {status, data:{errorMessage}} = error.response
                    notification.open({
                      message: `${status} 에러`,
                      description: errorMessage,
                      icon: <FrownOutlined style={{ color: "#ff3333" }} />
                    });
                  }
            });
    };

    // 채팅 페이지 이동
    const goToChat = () => {
        const receiverName = hostName;
        navigate("/chats", { state: { receiverName } })
    }

    // 본인 여부 API 요청
    useEffect(() => {
        const fetchSamePersonCheck = async () => {
            const apiUrl = `/api/users/same`;
            try {
              const ckeckSameMemberRequest = { memberName: hostName };
              const response = await axiosInstance.post(apiUrl, ckeckSameMemberRequest, {headers});
              setSameMemberCheck(response.data.isSameMember);
            } catch (error) {
            
            }    
        };
        fetchSamePersonCheck();        
    }, []);

    // 본인 여부 확인
    const checkSameMember = (event) => {
        event.stopPropagation(); 
        if (sameMemberCheck) {
            notification.open({
                message: '본인과의 대화는 불가합니다!',
                icon: <FrownOutlined style={{ color: "#ff3333" }} />
            });    
            return;
        } else {
            goToChat();
        }
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
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
                    {thumbnail && (
                        <img src={thumbnail} alt="숙소 이미지" style={{ width: '220px', height: '150px', marginRight: '30px', borderRadius: '10px' }} />
                    )}
                    <div style={{ flexGrow: 1 }}>
                        <p>위치: {location}</p>
                        <strong><p>결제 금액: {paymentAmount?.toLocaleString()}₩</p></strong>
                        <p>호스트: {hostName}</p>
                    </div>
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                    <Button 
                        onClick={showCancelModal} 
                        style={{ 
                            backgroundColor: '#7788E8', 
                            borderColor: '#7788E8', 
                            color: 'white', 
                            fontSize: '18px', 
                            width: '90px', 
                            height: '45px', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            marginRight: '80px'
                        }}
                    >
                        예약 취소
                    </Button>
                    <Button 
                        onClick={checkSameMember}
                        style={{ 
                            backgroundColor: '#7788E8', 
                            borderColor: '#7788E8', 
                            color: 'white', 
                            fontSize: '18px', 
                            width: '90px', 
                            height: '45px', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                        }}
                    >
                        메시지
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
