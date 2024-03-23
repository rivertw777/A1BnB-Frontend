// 사진 추론 결과 페이지
import React, { useEffect, useState } from "react";
import InferenceResult from "../../components/photos/InferenceResult";
import { useAppContext } from "../../store";
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../api";
import { Button } from "antd";
import "./InferResult.scss";

function InferResult() {
  const {
    store: { jwtToken }
  } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();
  const [photoIdList] = useState(location.state.photoIdList || []);
  const resultRequest = { photoIdList: photoIdList };
  const [resultList, setResultList] = useState([]);
  
  // 추론 결과 API 요청
  useEffect(() => {
    const fetchData = async () => {
      const headers = { Authorization: `Bearer ${jwtToken}` };
      try {
        const response = await axiosInstance.post("/api/photos/results", resultRequest, {
          headers
        });
        setResultList(response.data);
      } catch (error) {
        // 오류 처리
      }
    };
    fetchData();
  }, []);

  return (
    <div className="inferResultContainer">  {/* 클래스 이름 추가 */}
      <h3>분석 완료!!</h3>
      <div className="resultsWrapper"> {/* 클래스 이름 추가 */}
        {resultList &&
          resultList.map(result => (
            <InferenceResult result={result} key={result.photoId} />
          ))}
      </div>
      <div className="navigationWrapper"> {/* 클래스 이름 추가 */}
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
