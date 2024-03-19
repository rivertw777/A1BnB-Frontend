import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd'; 
import { axiosInstance } from "../../../api";
import { useAppContext } from "../../../store";
import HostReservationCard from "../../../components/users/hosts/HostReservationCard";

const HostReservations = () => {
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const apiUrl = '/api/users/hosts/reservations';
                const response = await axiosInstance.get(apiUrl, {headers});
                setReservations(response.data);
            } catch (error) {
                // 오류 처리
                console.error("예약 정보 조회에 실패했습니다.", error);
            }
        };
        
        fetchReservations();
    }, []);

    return (
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'center' }}>
            <div>
                {reservations.length > 0 ? (
                    <Row gutter={[16, 16]} justify="center">
                        {reservations.map((reservation, index) => (
                            <Col span={24} key={index}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <HostReservationCard reservation={reservation} />
                                </div>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div style={{ width: '100%' }}> {/* 외부 div의 너비를 100%로 설정 */}
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
