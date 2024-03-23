import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../api";
import { useAppContext } from "../../store";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import './MyChatRooms.scss'; // SCSS 파일 임포트

const MyChatRooms = () => {
  const { store: { jwtToken } } = useAppContext();
  const headers = { Authorization: `Bearer ${jwtToken}` };
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const apiUrl = `/api/chats`;
      try {
        const response = await axiosInstance.get(apiUrl, { headers });
        setChatRooms(response.data);
      } catch (error) {
        
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
