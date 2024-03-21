// 게시물 상세 페이지
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from "../../../api";
import { Card, Row, Col, Typography, Modal, notification } from 'antd';
import { HeartOutlined, HeartTwoTone, FrownOutlined, MessageOutlined } from "@ant-design/icons";
import { useAppContext } from "../../../store";
import BookForm from "../../../components/posts/details/BookForm";
import PropertyInfo from "../../../components/posts/details/PropertyInfo";
import { useLocation, useNavigate } from 'react-router-dom';

const { Title } = Typography;

export default function PostDetail() {
  const navigate = useNavigate();

  const { postId } = useParams();
  const [postData, setPostData] = useState({});
  const [postLikeCheck, setPostLikeCheck] = useState({});

  const [visible, setVisible] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const { store: { jwtToken, isAuthenticated } } = useAppContext();
  const headers = { Authorization: `Bearer ${jwtToken}` };

  // 게시물 상세 API 요청
  useEffect(() => {
    const fetchPostData = async () => {
      const apiUrl = `/api/posts/${postId}`;
      try {
        const response = await axiosInstance.get(apiUrl);
        setPostData(response.data);
      } catch (error) {

      }
    };
    fetchPostData();
  }, []);

  // 회원 게시물 좋아요 여부 확인 API 요청
  const fetchPostLike = async () => {
    if (isAuthenticated) {
      const apiUrl = `/api/posts/${postId}/like/check`;
      try {
        const response = await axiosInstance.get(apiUrl, { headers });
        setPostLikeCheck(response.data);
      } catch (error) {
        // 에러 처리 코드
      }
    } else {
      setPostLikeCheck({isLike:false});
    }
  };

  useEffect(() => {
    fetchPostLike();
  }, [postId]);

  // 게시물 좋아요 API 요청
  const handleLike = async ({isLike}) => { 
    const apiUrl = `/api/posts/${postId}/like`;
    const method = isLike ? "POST" : "DELETE";
    try {
      await axiosInstance({
        url: apiUrl,
        method,
        headers
      });
      fetchPostLike();
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

  const handleImageClick = (image) => {
    setModalImage(image);
    setVisible(true);
  }

  const handleModalClose = () => {
    setVisible(false);
  }

  const { hostName, unavailableDates, location, pricePerNight, photoInfoList, maximumOccupancy, caption } = postData || {};
  const { isLike } = postLikeCheck || {};

  // Booingform을 위한 데이터
  let bookFormData = {};

  // PropertyInfo를 위한 데이터
  let propertyInfoData = {};
  if (postData) {
    bookFormData = { postId, unavailableDates, pricePerNight, maximumOccupancy };
    propertyInfoData = { maximumOccupancy, photoInfoList, location, caption };
  }

  const goToChat = () => {
    if (isAuthenticated) {
      const partnerName = hostName;
      navigate("/chat", { state: { partnerName } })
    } else {
      notification.open({
        message: '로그인이 필요합니다!',
        icon: <FrownOutlined style={{ color: "#ff3333" }} />
      });
    }
  }
  
  return (
    <div>
      <Card style={{ width: '80%', margin: '16px auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "30px" }}>
          <Title style={{ marginTop: "0px", color: '#666666' }}>호스트 {hostName}님의 숙소</Title>
          <div>
            <MessageOutlined
              style={{ fontSize: '30px', marginRight:'20px', color: '#7788E8'}}
              onClick={goToChat}
            />  
            {isLike ? (
              <HeartTwoTone
                twoToneColor="#eb2f96"
                style={{ fontSize: '30px', marginRight: '20px' }}
                onClick={() => handleLike({ isLike: false })}
              />
            ) : (
              <HeartOutlined
                style={{ fontSize: '30px', marginRight: '20px' }}
                onClick={() => handleLike({ isLike: true })}
              />
            )}
          </div>
        </div>
        <Row gutter={[16, 16]}>
          {photoInfoList && photoInfoList.length > 0 &&
            <Col span={12}>
              <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '75%', borderRadius: '10px' }}>
                <img src={photoInfoList[0].originalUrl} alt={`Photo 1`} onClick={() => handleImageClick(photoInfoList[0].detectedUrl)} style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
                <div style={{position: 'absolute', bottom: '0', padding: '10px', color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>{photoInfoList[0].roomType}</div>
              </div>
            </Col>
          }
          <Col span={12}>
            <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
              {photoInfoList && photoInfoList.slice(1, 3).map((photo, index) => (
                <Col span={12} key={index}>
                  <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '75%', borderRadius: '10px' }}>
                    <img src={photo.originalUrl} alt={`Photo ${index + 2}`} onClick={() => handleImageClick(photo.detectedUrl)} style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
                    <div style={{position: 'absolute', bottom: '0', padding: '10px', color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>{photo.roomType}</div>
                  </div>
                </Col>
              ))}
            </Row>
            <Row gutter={[16, 16]}>
              {photoInfoList && photoInfoList.slice(3, 5).map((photo, index) => (
                <Col span={12} key={index}>
                  <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '75%', borderRadius: '10px' }}>
                    <img src={photo.originalUrl} alt={`Photo ${index + 4}`} onClick={() => handleImageClick(photo.detectedUrl)} style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }} />
                    <div style={{position: 'absolute', bottom: '0', padding: '10px', color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>{photo.roomType}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Card>
      <Modal visible={visible} onCancel={handleModalClose} footer={null} centered>
        <img src={modalImage} style={{ width: '100%', height: '100%' }} alt="Selected" />
      </Modal>
      <Row style={{ width: '80%', margin: '16px auto', padding: '16px' }}>
        <Col span={16}>
          <div>
            <PropertyInfo propertyInfoData = {propertyInfoData}/>
          </div>
        </Col>
        <Col span={8}>
          <div style={{ position: 'sticky', top: '0' }}>
            <BookForm bookFormData = {bookFormData} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
