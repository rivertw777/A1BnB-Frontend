// 게스트 정보 컴포넌트
import React, { useState, useEffect } from 'react';
import { HeartOutlined, CalendarOutlined, MessageOutlined } from "@ant-design/icons";

import { Button, Card } from 'antd';

export default function GuestInfo() {
    return (
        <div>
          <Card 
              title={<span style={{ color: '#666666', fontWeight: 'bold' }}>체크인 예정</span>}
              style={{ width: 400, height: 150, marginTop: 25, marginBottom: 40, color: '#666666',  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}
          >    
              <div style={{ textAlign: 'right', fontSize: '20px'}}>
                  <strong>₩</strong>
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
                    좋아요
                  </div>
              </div>
              <div style={{ textAlign: 'center', width: '100%' }}>
                  <div>
                      <Button 
                          type="primary" 
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