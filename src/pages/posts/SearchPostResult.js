// 게시물 검색 결과 페이지
import React, { useState } from "react";
import { Button, Modal, Dropdown, Menu } from "antd";
import { FilterOutlined, UnorderedListOutlined } from "@ant-design/icons";
import PostList from "../../components/posts/PostList";
import { useLocation, useNavigate } from 'react-router-dom';

function SearchPostResult() {
    const location = useLocation();
    const [postList] = useState(location?.state?.postList || []);

    return (
        <div style={{ marginBottom: "20px" }}>
            <PostList postList={postList}/>
        </div>
    );
}

export default SearchPostResult;