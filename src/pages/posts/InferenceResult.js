import React, { useEffect, useState } from "react";
import Result from "../../components/posts/Result";
import { useAppContext } from "../../store";
import { useLocation } from 'react-router-dom';
import { axiosInstance } from "../../api";

function InferenceResult() {
    const {
        store: { jwtToken }
      } = useAppContext();

    const location = useLocation();
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

    console.log(resultList);

    return (
        <div>
          {resultList &&
            resultList.map(result => (
              <Result result={result} key={result.resultId} />
            ))}
        </div>
    );
}
  
export default InferenceResult;
