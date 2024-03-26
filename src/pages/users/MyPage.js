// 내 정보 페이지
import React, { useState } from 'react';
import { Button, Card } from 'antd';
import HostInfo from "../../components/users/hosts/HostInfo";
import GuestInfo from "../../components/users/guests/GuestInfo";
import './MyPage.scss'; 

export default function MyPage() {
  const [role, setRole] = useState('host'); 

  return (
    <Card 
        style={{ 
            width: 500, 
            margin: 'auto', 
            marginTop: '20px',
            marginBottom: '20px', 
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' 
        }}> 
      <div className="page-container">
        <div className="button-group">
          <Button
            style={{
              width: '110px',
              height: '55px',
              borderRadius: '20px',
              margin: '10px 0', 
              fontSize: '20px', 
            }} 
            className={`role-button ${role === 'host' ? 'host' : 'default'}`}
            onClick={() => setRole('host')}
          >
            호스트
          </Button>
          <Button
            style={{ 
              width: '110px', 
              height: '55px', 
              borderRadius: '20px', 
              margin: '10px 0', 
              fontSize: '20px', 
            }} 
            className={`role-button ${role === 'guest' ? 'guest' : 'default'}`}
            onClick={() => setRole('guest')}
          >
            게스트
          </Button>
        </div>
        {role === 'host' && <HostInfo />}
        {role === 'guest' && <GuestInfo />}
      </div>
    </Card>
  );
}
