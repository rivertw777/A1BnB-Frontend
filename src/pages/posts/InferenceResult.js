import React, { useEffect, useState } from "react";
import ResultList from "../../components/posts/ResultList";
import { useLocation } from 'react-router-dom';

function InferenceResult() {
    const location = useLocation();
    const [photoIdList] = useState(location.state.photoIdList || []);

    
    return (
      <>
        <ResultList />
      </>
    );
  }
  
export default InferenceResult;
  
  