import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons'; // Ant Design 아이콘 import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { useAppContext } from "../../store";
import { axiosInstance } from "../../api";
import { API_HOST } from "../../Constants";

import "./ChatRoom.scss"; // SCSS 파일 import

const ChatRoom = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const { store: { jwtToken } } = useAppContext();
  const headers = { Authorization: `Bearer ${jwtToken}` };

  // 수신자 이름
  const { receiverName } = location.state || {};
  const [roomInfo, setRoomInfo] = useState({});

  const findChatRoomRequest = { receiverName: receiverName };

  // 수신자 이름으로 채팅방 조회 API 요청
  useEffect(() => {
    const fetchRoomInfo = async () => {
      const apiUrl = "/api/chats";
      try {
        const response = await axiosInstance.post(apiUrl, findChatRoomRequest, {headers});
        setRoomInfo(response.data);
      } catch (error) {
        // 오류 처리
      }
    };
    fetchRoomInfo();
  }, []);

  const { roomId, messageInfoList } = roomInfo || {};

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 채팅방 정보 조회 후 초기 메시지 리스트 load
  useEffect(() => {
    if (messageInfoList) { 
      const initialMessages = messageInfoList.map(info => ({
        ...info,
        timestamp: new Date(info.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUserMessage: info.senderName !== receiverName, 
      }));
      setMessages(initialMessages);
    }
  }, [roomInfo]);


  // 웹소켓 연결
  useEffect(() => {
    if (Object.keys(roomInfo).length !== 0) {
      const socket = new SockJS(`${API_HOST}/ws`);
      const stompClient = Stomp.over(socket);
      setStompClient(stompClient);

      stompClient.connect(headers, () => {
        stompClient.subscribe(`/subscribe/rooms/${roomId}`, (data) => {
          const newMessage = JSON.parse(data.body);
          const messageTime = new Date();
          const timestamp = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          const isUserMessage = newMessage.receiverName === receiverName; // 현재 사용자의 이름 또는 식별자와 비교

          setMessages(messages => [...messages, { ...newMessage, timestamp, isUserMessage }]);
        });
      });

      return () => {
        if (stompClient !== null) {
          stompClient.disconnect();
        }
      };
    }
  }, [roomInfo]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      stompClient.send("/publish/messages", {}, JSON.stringify({
        roomId: roomInfo.roomId,
        message: message,
        receiverName: receiverName
      }));
      setMessage("");
    }
  };

  return (
    <div className="chat-room">
      <div className="name-box">
        <LeftOutlined
          onClick={() => navigate(-1)}
          style={{ color: '#FFFFFF' }}
        />
        <span className="user-name">{receiverName}</span>
      </div>
      <div className="message-box">
        {messages.map((item, index) => (


          <div key={index} className="message-container">
            <div className={`message ${item.isUserMessage ? 'user-message' : 'other-message'}`}>
              <div>{item.message}</div>
            </div>
            <div className={`timestamp ${item.isUserMessage ? 'user-message' : 'other-message'}`}>
              <div>{item.timestamp}</div>
            </div> 
          </div>
        
        
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-section">
        <input
          className="input-box"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button 
            className="send-button"
            onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} size='1x'/>
        </button>
      </div>
    </div>
  );
  
}

export default ChatRoom;
