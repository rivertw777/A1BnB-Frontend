// 사진 추론 결과 페이지
import React, { useEffect, useState } from "react";
import InferenceResult from "../../components/photos/InferenceResult";
import { useAppContext } from "../../store";
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../api";
import { Button, notification } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import "./InferResult.scss";

function InferResult() {
  const {
    store: { jwtToken }
  } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();

  // 사진 Id 리스트
  const [photoIdList] = useState(location.state.photoIdList || []);
  
  // 추론 결과 리스트
  const [resultList, setResultList] = useState([]);
  
  // 추론 결과 API 요청
  useEffect(() => {
    const fetchData = async () => {
      const headers = { Authorization: `Bearer ${jwtToken}` };
      try {
        const resultRequest = { photoIdList: photoIdList };
        const response = await axiosInstance.post("/api/photos/results", resultRequest, {
          headers
        });
        setResultList(response.data);
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
    fetchData();
  }, []);

  return (
    <div className="inferResultContainer">  
      <h3>분석 완료!!</h3>
      <div className="resultsWrapper"> 
        {resultList &&
          resultList.map(result => (
            <InferenceResult result={result} key={result.photoId} />
          ))}
      </div>
      <div className="navigationWrapper"> 
        <Button 
          className="custom-button" 
          htmlType="submit"
          onClick={() => navigate("/posts/submit", { state: { photoIdList, from: 'InferResult' } })}>
            Register Your Property
        </Button>
      </div>
    </div>
  );
}

  
export default InferResult;
