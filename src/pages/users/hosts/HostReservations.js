// 호스트 예약 정보 페이지
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd'; 
import { axiosInstance } from "../../../api";
import { useAppContext } from "../../../store";
import HostReservation from "../../../components/users/hosts/HostReservation";
import { notification } from "antd";
import { FrownOutlined } from "@ant-design/icons";

const HostReservations = () => {
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };

    // 예약 정보
    const [reservations, setReservations] = useState([]);

    // 호스트 예약 정보 조회 API 요청
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const apiUrl = '/api/users/hosts/reservations';
                const response = await axiosInstance.get(apiUrl, {headers});
                setReservations(response.data);
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
        
        fetchReservations();
    }, []);

    return (
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '100%', width: '100%' }}>
                {reservations.length > 0 ? (
                    <Row gutter={[0, 16]} justify="center" style={{ width: '100%' }}>
                        {reservations.map((reservation, index) => (
                            <Col span={10} key={index} style={{ margin: '0 -30px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', minWidth: '470px' }}>
                                    <HostReservation reservation={reservation} />
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
                            예약이 없습니다..
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    
}

export default HostReservations;
