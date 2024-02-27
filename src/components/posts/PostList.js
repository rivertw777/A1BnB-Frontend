// 게시물 리스트
import { Button, Pagination, Row, Col, Alert } from "antd";
import React, { useEffect, useState } from "react";
import { useAxios, axiosInstance } from "../../api";
import Post from "./Post";

function PostList({ url, condition }) {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const pageSize = 8; // 페이지 크기
  const [postPage, setPostPage] = useState(null);

  console.log(url);
  console.log(condition);

  useEffect(() => {
    const fetchPosts = async () => {
      const config = {
        params: {
          page: currentPage - 1, // Spring은 페이지 번호가 0부터 시작하므로 1을 빼줍니다.
          size: pageSize,
          sort: "createdAt,desc",
        },
      };

      try {
        let data;
        if (condition) {
          const response = await axiosInstance.post(url, condition, config);
          data = response.data;
        } else {
          const response = await axiosInstance.get(url, config);
          data = response.data;
        }
        setPostPage(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };

    fetchPosts();
  }, [url, condition, currentPage]);

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