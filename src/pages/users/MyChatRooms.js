import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../api";
import { useAppContext } from "../../store";
import { List, Card } from 'antd';
import moment from 'moment';

const MyChatRooms = () => {
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const [chatRooms, setChatRooms] = useState([]);

    // 내 채팅방 조회 API 요청
    useEffect(() => {
        const fetchChatRooms = async () => {
            const apiUrl = `/api/chats`;
            try {
              const response = await axiosInstance.get(apiUrl, {headers});
              setChatRooms(response.data);
            } catch (error) {
            
            }    
        };
        fetchChatRooms();        
    }, []);    

    return (
        <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={chatRooms}
            renderItem={chatRoom => (
                <List.Item key={chatRoom.id}>
                    <Card title={chatRoom.receiverName}>
                        <p>Last message: {chatRoom.lastMessage}</p>
                        <p>{moment(chatRoom.createdAt).fromNow()}</p>
                    </Card>
                </List.Item>
            )}
        />
    );
  };
  
  export default MyChatRooms;