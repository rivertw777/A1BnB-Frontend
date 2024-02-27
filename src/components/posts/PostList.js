// 게시물 리스트
import { Button, Pagination, Row, Col, Alert } from "antd";
import React, { useEffect, useState } from "react";
import { useAxios, axiosInstance } from "../../api";
import Post from "./Post";

function PostList({postList}) {

  const [localPostList, setLocalPostList] = useState([]); // 이름 변경
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  useEffect(() => {
    if (postList && postList.length > 0) {
      const sortedPostList = postList.sort(
        (a, b) => b.postId - a.postId
      );
      setLocalPostList(sortedPostList); // 변경된 함수 사용

      // 전체 페이지 수 계산
      const totalPages = Math.ceil(sortedPostList.length / 8);
      setTotalPages(totalPages);
    }
  }, [postList]);

  // 페이지 번호 클릭 시 해당 페이지로 이동하는 함수
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // 현재 페이지에 해당하는 포스트 리스트 가져오기
  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * 8;
    const endIndex = startIndex + 8;
    return localPostList.slice(startIndex, endIndex); // 변경된 변수 사용
  };

  return (
    <div>
      <Row>
        {getCurrentPagePosts().map((post) => (
          <Col span={6} key={post.postId}>
            <Post post={post} />
          </Col>
        ))}
      </Row>
      {totalPages > 1 && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={goToPage}
            pageSize={1}
          />
        </div>
      )}
    </div>
  );
}

export default PostList;
