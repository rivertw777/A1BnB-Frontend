import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd'; 
import { axiosInstance } from "../../../api";
import { useAppContext } from "../../../store";
import HostPost from "../../../components/users/hosts/HostPost";

const HostPosts = () => {
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const apiUrl = '/api/users/hosts/posts';
                const response = await axiosInstance.get(apiUrl, {headers});
                setPosts(response.data);
            } catch (error) {
                // 오류 처리
                console.error("예약 정보 조회에 실패했습니다.", error);
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
                                    <HostPost post={post} />
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
                            등록한 숙소가 없습니다..
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    
}

export default HostPosts;
