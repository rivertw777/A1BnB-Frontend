// 사진 추론 결과 페이지
import React, { useEffect, useState } from "react";
import Result from "../../components/posts/Result";
import { useAppContext } from "../../store";
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../api";
import { Button } from "antd";
import "./InferenceResult.scss";

function InferenceResult() {
    const {
        store: { jwtToken }
      } = useAppContext();

    const location = useLocation();
    const navigate = useNavigate();
    const [photoIdList] = useState(location.state.photoIdList || []);
    const resultRequest = { photoIdList: photoIdList };
    const [resultList, setResultList] = useState([]);
    
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
        <div>
          <h3 style={{ textAlign: "center", fontSize: "2.5em", marginBottom: "60px", color: '#666666' }}>분석 완료!!</h3>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", gap: "20px" }}>
            {resultList &&
              resultList.map(result => (
                <Result result={result} key={result.resultId} />
              ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "40px" }}>
            <Button 
                className="custom-button" 
                htmlType="submit" 
                style={{ height: "70px", fontSize: "30px" }} 
                onClick={() => navigate("/posts/submit", { state: {photoIdList} })}>
                    Register Your Property
            </Button>
          </div>
        </div>
    );
}
  
export default InferenceResult;
