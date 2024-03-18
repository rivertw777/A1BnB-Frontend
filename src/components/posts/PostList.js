// 게시물 리스트
import { Button, Pagination, Row, Col, Alert } from "antd";
import React, { useEffect, useState } from "react";
import { useAxios, axiosInstance } from "../../api";
import Post from "./Post";

function PostList({ apiUrl, condition }) {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const pageSize = 8; // 페이지 크기
  const [postPage, setPostPage] = useState(null);


  // 조건에 따른 게시물 조회 API 호출
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let data;
        // 조건 조회
        if (condition) {
          const pageConfig = {
            params: {
              page: currentPage - 1, 
              size: pageSize,
            },
          };
          const response = await axiosInstance.post(apiUrl, condition, pageConfig);
          data = response.data;
        console.log(data);
        // 일반 조회 
        } else {
          const pageConfig = {
            params: {
              page: currentPage - 1, 
              size: pageSize,
              sort: "createdAt,desc",
            },
          };
          const response = await axiosInstance.get(apiUrl, pageConfig);
          data = response.data;
        }
        setPostPage(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };

    fetchPosts();
  }, [apiUrl, condition, currentPage]);

  // 페이지 변경 시 해당 페이지의 데이터를 가져오는 함수
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Row>
        {postPage?.content.map((post) => (
          <Col span={6} key={post.postId}>
            <Post post={post} />
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Pagination
          current={currentPage}
          total={postPage?.totalElements}
          onChange={handlePageChange}
          pageSize={pageSize}
          showSizeChanger={false} // 페이지 크기 변경 기능 끄기
        />
      </div>
    </div>
  );
}

export default PostList;