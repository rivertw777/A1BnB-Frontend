import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons'; // Ant Design 아이콘 import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import "./ChatRoom.scss"; // SCSS 파일 import

const ChatRoom = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const { partnerName } = location.state || {};

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);
    setStompClient(stompClient);
    
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/public', (data) => {
        const newMessage = JSON.parse(data.body);
        const now = new Date();
        const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

        setMessages(messages => [...messages, { ...newMessage, timestamp, isUserMessage: true }]);
      });
    });

    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      stompClient.send("/app/chat.sendMessage", {}, JSON.stringify({content: message}));
      setMessage("");
    }
  };

  return (
    <div className="chat-room">
      <div className="name-box" >
        <LeftOutlined
          onClick={() => navigate(-1)} 
          style={{ color: '#FFFFFF' }} 
        /> 
        <span className="user-name">{partnerName}</span>
      </div>
      <div className="message-box">
        {messages.map((item, index) => (
          <div key={index} className={`message ${item.isUserMessage ? 'user-message' : 'other-message'}`}>
            <div>{item.content}</div>
            <div className="timestamp">{item.timestamp}</div>
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
            <FontAwesomeIcon icon={faPaperPlane} size='30px'/>
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
