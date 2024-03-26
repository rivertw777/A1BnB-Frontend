// 호스트 정보
import React, { useState, useEffect } from 'react';
import { Button, Card, notification } from 'antd';
import { HomeOutlined, CalendarOutlined, MessageOutlined, FrownOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../../api";
import { useAppContext } from "../../../store";
import { useNavigate } from "react-router-dom";

export default function HostInfo() {
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const navigate = useNavigate();

    // 정산 금액
    const [settleAmount, setSettleAmount] = useState({});

    // 내 정산 금액 조회 API 요청
    useEffect(() => {
        const fetchAmountData = async () => {
            const apiUrl = `/api/users/hosts/amount`;
            try {
                const response = await axiosInstance.get(apiUrl, {headers});
                setSettleAmount(response.data.settleAmount);
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
        fetchAmountData();
    }, []);

    return (
        <div>
          <Card 
              title={<span style={{ color: '#666666', fontWeight: 'bold' }}>정산 금액</span>}
              style={{ width: 400, height: 150, marginTop: 25, marginBottom: 40, color: '#666666', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}
          >    
              <div style={{ textAlign: 'right', fontSize: '20px'}}>
                  <strong>{settleAmount?.toLocaleString()}₩</strong>
              </div>
          </Card>
          <div style={{ display: 'flex', justifyContent: 'space-around', width: 400, marginBottom: "30px" }}>
              <div style={{ textAlign: 'center', width: '100%' }}>
                  <div>
                      <Button 
                          type="primary" 
                          onClick={() => navigate("/users/hosts/posts")}
                          icon={<HomeOutlined style={{ fontSize: '30px' }}/>} 
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
                    숙소 관리
                  </div>
              </div>
              <div style={{ textAlign: 'center', width: '100%' }}>
                  <div>
                      <Button 
                          type="primary" 
                          onClick={() => navigate("/users/hosts/reservations")}
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
                          onClick={() => navigate("/users/chats")}
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