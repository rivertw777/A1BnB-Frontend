// 좋아요 게시물 정보 페이지
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd'; 
import { axiosInstance } from "../../../api";
import { useAppContext } from "../../../store";
import LikePost from "../../../components/users/guests/LikePost";
import { notification } from "antd";
import { FrownOutlined } from "@ant-design/icons";

const LikePosts = () => {
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };

    // 게시물 정보
    const [posts, setPosts] = useState([]);

    // 좋아요 게시물 정보 조회 API 요청
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const apiUrl = '/api/users/guests/posts';
                const response = await axiosInstance.get(apiUrl, {headers});
                setPosts(response.data);
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
        
        fetchPosts();
    }, []);

    return (
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '100%', width: '100%' }}>
                {posts.length > 0 ? (
                    <Row gutter={[0, 16]} justify="center" style={{ width: '100%' }}>
                        {posts.map((post, index) => (
                            <Col span={10} key={index} style={{ margin: '0 -30px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', minWidth: '470px' }}>
                                    <LikePost post={post} />
                                </div>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div style={{ width: '100%' }}>
                        <div
                            style={{
                                color: '#666666',
                                fontSize: '30px',
                                fontWeight: 'bold',
                                textAlign: 'left',
                                marginTop: '50px',
                                marginBottom: '50px'
                            }}
                        >
                            찜해둔 숙소가 없습니다..
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    
}

export default LikePosts;
