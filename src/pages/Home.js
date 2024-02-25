// 홈 페이지
import React, { useState } from "react";
import { Button, Modal, Dropdown, Menu } from "antd";
import { FilterOutlined, UnorderedListOutlined } from "@ant-design/icons";
import PostList from "../components/posts/PostList";

function Home() {
  const [selectedOption, setSelectedOption] = useState("최신순");
  const handleOptionChange = (e) => {
    setSelectedOption(e.key);
  };
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const menu = (
    <Menu onClick={handleOptionChange}>
      <Menu.Item key="최신순">
        최신순
      </Menu.Item>
      <Menu.Item key="인기순">
        인기순
      </Menu.Item>
      <Menu.Item key="가격순">
        가격순
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Dropdown overlay={menu} trigger={['hover']}>
          <Button
            type="text"
            icon={<UnorderedListOutlined />}
            shape="round"
            style={{ marginRight: "8px", borderRadius: "8px", width: "100px", height: "40px", border: "1px solid grey" }}
          >
            {selectedOption}
          </Button>
        </Dropdown>
        <Button
          type="text"
          icon={<FilterOutlined />}
          shape="round"
          style={{ marginRight: "8px", borderRadius: "8px", width: "100px", height: "40px", border: "1px solid grey" }}
          onClick={showModal}
        >
          필터
        </Button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <PostList />
      </div>
      <Modal
        title="검색 필터"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {/* 모달 내용 */}
        {/* 여기에 검색 필터 옵션을 추가할 수 있습니다 */}
      </Modal>
    </>
  );
}

export default Home;

