// 게시물 검색 결과 페이지
import React, { useState } from "react";
import { Button, Modal, Dropdown, Menu } from "antd";
import { FilterOutlined, UnorderedListOutlined } from "@ant-design/icons";
import PostList from "../../components/posts/PostList";
import { useLocation, useNavigate } from 'react-router-dom';

function SearchPostResult() {
    const apiUrl = "/api/posts/search";
    const location = useLocation();
    const { searchCondition } = location.state;

    return (
        <div style={{ marginBottom: "20px" }}>
            <PostList apiUrl={apiUrl} condition={searchCondition}/>
        </div>
    );
}

export default SearchPostResult;