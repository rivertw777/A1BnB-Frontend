// 게시물 정렬 페이지
import React, { useState } from "react";
import PostList from "../../components/posts/PostList";

function SortedPostResult() {
    const apiUrl = "/api/posts/like";

    return (
        <div style={{ marginBottom: "20px" }}>
            <h1 style={{ 
                color: '#666666', 
                fontSize: '25px', 
                paddingLeft: '30px'
            }}>정렬 결과</h1>
            <PostList apiUrl={apiUrl} />
        </div>
    );
}

export default SortedPostResult;