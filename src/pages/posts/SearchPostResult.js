// 게시물 검색 결과 페이지
import React from "react";
import PostList from "../../components/posts/PostList";
import { useLocation } from 'react-router-dom';

function SearchPostResult() {
    const apiUrl = "/api/posts/search";
    const location = useLocation();
    const { searchCondition } = location.state;

    return (
        <div style={{ marginBottom: "20px" }}>
            <h1 style={{ 
                color: '#666666', 
                fontSize: '25px', 
                paddingLeft: '30px'
            }}>검색 결과</h1>
            <PostList apiUrl={apiUrl} condition={searchCondition}/>
        </div>
    );
}

export default SearchPostResult;