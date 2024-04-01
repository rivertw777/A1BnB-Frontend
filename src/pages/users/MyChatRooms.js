// 내 채팅방 정보 페이지
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../api";
import { useAppContext } from "../../store";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { notification } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import './MyChatRooms.scss'; 

const MyChatRooms = () => {
  const { store: { jwtToken } } = useAppContext();
  const headers = { Authorization: `Bearer ${jwtToken}` };
  const navigate = useNavigate();

  // 채팅방 정보
  const [chatRooms, setChatRooms] = useState([]);

  // 내 채팅방 정보 조회 API 요청
  useEffect(() => {
    const fetchChatRooms = async () => {
      const apiUrl = `/api/users/chats`;
      try {
        const response = await axiosInstance.get(apiUrl, { headers });
        setChatRooms(response.data);
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
    fetchChatRooms();        
  }, []);    


  return (
    <div className="chatRoomsContainer">
      {chatRooms.map(chatRoom => (
        <div key={chatRoom.id} className="chatRoom" onClick={() => navigate("/chats", { state: { receiverName: chatRoom.receiverName } })}>
          <div className="receiverName">{chatRoom.receiverName}</div>
          <div className="chatInfo">
            <p className="lastMessage">Last message: {chatRoom.lastMessage}</p>
            <p className="createdAt">{moment(chatRoom.createdAt).fromNow()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyChatRooms;
