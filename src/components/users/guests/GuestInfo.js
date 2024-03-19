// 게스트 정보 컴포넌트
import React, { useState, useEffect } from 'react';
import { HeartOutlined, CalendarOutlined, MessageOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../../api";
import { useAppContext } from "../../../store";
import { useNavigate } from "react-router-dom";

import { Button, Card } from 'antd';

export default function GuestInfo() {
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const navigate = useNavigate();

    const [checkInDate, setCheckInDate] = useState(null);

    // 가장 가까운 체크인 날짜 조회 API 요청
    useEffect(() => {
        const fetchCheckInDateData = async () => {
            const apiUrl = `/api/users/guests/checkin`;
            try {
                const response = await axiosInstance.get(apiUrl, {headers});
                if (response.data.checkInDate != null) {
                    const date = new Date(response.data.checkInDate);
                    const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
                    setCheckInDate(formattedDate);
                } else {
                    setCheckInDate(null);
                }
            } catch (error) {
                // 오류 처리
            }
        };
        fetchCheckInDateData();
    }, []);

    return (
        <div>
          <Card 
              title={<span style={{ color: '#666666', fontWeight: 'bold' }}>체크인 예정</span>}
              style={{ width: 400, height: 150, marginTop: 25, marginBottom: 40, color: '#666666',  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}
          >    
            <div style={{ textAlign: 'right', fontSize: '20px'}}>
                <strong>{checkInDate ? checkInDate : "예약이 없습니다."}</strong>
            </div>
          </Card>
          <div style={{ display: 'flex', justifyContent: 'space-around', width: 400, marginBottom: "30px" }}>
              <div style={{ textAlign: 'center', width: '100%' }}>
                  <div>
                      <Button 
                          type="primary" 
                          icon={<HeartOutlined style={{ fontSize: '30px' }}/>} 
                          style={{ 
                              width: '75px',
                              height: '75px',
                              borderRadius: '20px',
                              backgroundColor: '#7788E8', 
                              borderColor: '#7788E8', 
                              marginBottom: '10px',
                              padding: '20px 20px',
                              fontSize: '18px'
                          }}
                      />
                  </div>
                  <div style={{ color: '#666666', fontWeight: 'bold'}}>
                    찜 목록
                  </div>
              </div>
              <div style={{ textAlign: 'center', width: '100%' }}>
                  <div>
                      <Button 
                          type="primary" 
                          onClick={() => navigate("/users/guests/reservations")}
                          icon={<CalendarOutlined style={{ fontSize: '30px' }}/>} 
                          style={{ 
                              width: '75px',
                              height: '75px',
                              borderRadius: '20px',
                              backgroundColor: '#7788E8', 
                              borderColor: '#7788E8', 
                              marginBottom: '10px', 
                              padding: '20px 20px',
                              fontSize: '18px',
                          }}
                      />
                  </div>
                  <div style={{ color: '#666666', fontWeight: 'bold'}}>
                    예약 내역
                  </div>
              </div>
              <div style={{ textAlign: 'center', width: '100%' }}>
                  <div>
                      <Button 
                          type="primary" 
                          icon={<MessageOutlined style={{ fontSize: '30px' }}/>} 
                          style={{ 
                              width: '75px',
                              height: '75px',
                              borderRadius: '20px',
                              backgroundColor: '#7788E8', 
                              borderColor: '#7788E8', 
                              marginBottom: '10px', 
                              padding: '20px 20px',
                              fontSize: '18px',
                          }}
                      />
                  </div>
                  <div style={{ color: '#666666', fontWeight: 'bold'}}>
                    메시지
                  </div> 
              </div>
          </div>
        </div>
    );
}