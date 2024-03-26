// 채팅방 페이지
import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { useAppContext } from "../../store";
import { axiosInstance } from "../../api";
import { API_HOST } from "../../Constants";
import { notification } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import "./ChatRoom.scss"; 

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

  // 채팅방 정보
  const [roomInfo, setRoomInfo] = useState({});
  const { roomId, messageInfoList } = roomInfo || {};

  // 수신자 이름으로 채팅방 조회 API 요청
  useEffect(() => {
    const fetchRoomInfo = async () => {
      const apiUrl = "/api/chats";
      try {
        const findChatRoomRequest = { receiverName: receiverName };
        const response = await axiosInstance.post(apiUrl, findChatRoomRequest, {headers});
        setRoomInfo(response.data);
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
    fetchRoomInfo();
  }, []);

  // 아래로 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 메시지 리스트 불러오기
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
          
          const isUserMessage = newMessage.receiverName === receiverName; // 수신자 이름 같으면 본인 메시지

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

  // 메시지 전송
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
