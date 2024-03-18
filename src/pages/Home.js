// 홈 페이지
import React, { useState } from "react";
import { Button, Modal, Dropdown, Menu, Typography } from "antd";
import { FilterOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import PostList from "../components/posts/PostList";
import SearchForm from "../components/posts/SearchPostForm";

function Home() {
  const { Title } = Typography;
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("최신순");
  
  const handleOptionChange = ({ key }) => {
    if (key === "인기순") {
      navigate("posts/sort");
    }
  };
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleSearch = (values) => {
    console.log(values);
    handleCancel();
  };

  const menu = (
    <Menu onClick={handleOptionChange}>
      <Menu.Item key="최신순">
        최신순
      </Menu.Item>
      <Menu.Item key="인기순">
        인기순
      </Menu.Item>
    </Menu>
  );

  const apiUrl = "/api/posts";

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
          Search
        </Button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <PostList apiUrl={apiUrl}/>
      </div>
      <Modal
        title={
          <Title level={3} style={{ color: '#666666', marginBottom: '30px' }}>검색 필터</Title>
        }
        visible={modalVisible}
        onCancel={handleCancel}
        destroyOnClose={true}  
        footer={null}
      >
        <SearchForm handleSearch={handleSearch} handleCancel={handleCancel} />
      </Modal>
    </>
  );
}

export default Home;

