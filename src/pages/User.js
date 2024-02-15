// 마이 페이지 
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function User() {
    const navigate = useNavigate();
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // const postid = searchParams.get('postid');
            const response = await axios.get(`localhost:8080/user`);
            const userData = response.data; // user 데이터 배열

            setImageList(userData); // 이미지 리스트에 최신 데이터 할당
        } catch (error) {
            console.error('Error fetching images:', error);
        }
  };
  const handleCardClick = (postId) => {
      navigate(`/room?postid=${postId}`);
};
  return (
      <div>
        <h1 style={{ textAlign: 'center', margin: '30px'}}>마이 페이지</h1>
        <Row sx={1} md={4} className="g-4">
            {imageList.map((info, idx) => (
                <Col key={idx}>
                <Card style={{ width: '18rem' }}>
                     <Card.Img variant="top" src={`localhost:8080/`} />
                    <Card.Body>
                        <Card.Title>{info.title}</Card.Title>
                        <Button variant="primary" onClick={() => handleCardClick(info.postId)}>이동</Button>
                    </Card.Body>
                </Card>
            </Col>
        ))}
        </Row>

      </div>
  );
};

export default User;