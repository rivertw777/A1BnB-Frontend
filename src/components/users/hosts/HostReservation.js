// 호스트 예약 정보 카드
import React, { useState, useEffect } from 'react';
import { Card, Button, notification } from 'antd';
import { RightOutlined, FrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../../api";
import { useAppContext } from "../../../store";
import moment from 'moment';

export default function HostReservation({ reservation }) {
    const navigate = useNavigate();
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    
    // 예약 정보
    const { postId, checkInDate, checkOutDate, thumbnail, location, paymentAmount, guestName } = reservation;

    // 본인 여부
    const [sameMemberCheck, setSameMemberCheck] = useState({});

    // 게시물 상세 페이지 이동
    const goToPostDetail = () => {
        navigate(`/posts/${postId}`);
    };

    // 채팅 페이지 이동
    const goToChat = () => {
        const receiverName = guestName;
        navigate("/chats", { state: { receiverName } })
    }

    // 본인 여부 API 요청
    useEffect(() => {
        const fetchSamePersonCheck = async () => {
            const apiUrl = `/api/users/same`;
            try {
              const ckeckSameMemberRequest = { memberName: guestName };
              const response = await axiosInstance.post(apiUrl, ckeckSameMemberRequest, {headers});
              setSameMemberCheck(response.data.isSameMember);
            } catch (error) {
                if (error.response) {
                    const {status, data:{errorMessage}} = error.response
                    notification.open({
                      message: `${status} 에러`,
                      description: errorMessage,
                      icon: <FrownOutlined style={{ color: "#ff3333" }} />
                    });
                }
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
                        <p>게스트: {guestName}</p>
                    </div>
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                    <Button 
                        onClick={checkSameMember}
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
                        메시지
                    </Button>
                </div>
            </Card>
        </>
    );
}
