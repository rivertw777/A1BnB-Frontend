import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd'; 
import { axiosInstance } from "../../../api";
import { useAppContext } from "../../../store";
import GuestReservationCard from "../../../components/users/guests/GuestReservationCard";

const GuestReservations = () => { 
    const { store: { jwtToken } } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const [reservations, setReservations] = useState([]);

    // 게스트 예약 정보 조회 API 호출
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const apiUrl = '/api/users/guests/reservations';
                const response = await axiosInstance.get(apiUrl, {headers});
                setReservations(response.data);
                console.log(reservations);
            } catch (error) {

            }
        };
        
        fetchReservations();
    }, []);

    return (
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'center' }}>
            <div>
                <Row gutter={[16, 16]} justify="center">
                    {reservations.map((reservation, index) => (
                        <Col span={24} key={index}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}> {/* 여기에 스타일을 추가합니다 */}
                                <GuestReservationCard reservation={reservation} />
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default GuestReservations; 
