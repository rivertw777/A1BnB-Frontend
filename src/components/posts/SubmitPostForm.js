// 게시물 등록 폼
import React, { useState } from "react";
import { Button, Form, Input, DatePicker, InputNumber, notification, Select } from "antd";
import { FrownOutlined, PlusOutlined, SmileOutlined } from "@ant-design/icons";
import { useAppContext } from "../../store";
import { parseErrorMessages } from "../../utils/forms";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api";

export default function SubmitPostForm({ photoIdList }) {
  const {
    store: { jwtToken }
  } = useAppContext();
  const { Option } = Select;

  const navigate = useNavigate();

  const [fieldErrors, setFieldErrors] = useState({});

  const locationList = [
    "서울", "부산", "속초", "강릉", "전주", 
    "대구", "경주", "여수", "서귀포", "대전", 
    "제주도", "인천"
  ];

  // 게시물 등록 API 요청
  const handleFinish = async fieldValues => {
    const {
      caption,
      location,
      pricePerNight,
      maximumOccupancy
    } = fieldValues;

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("location", location);
    formData.append("pricePerNight", pricePerNight);
    formData.append("photoIdList", photoIdList);
    formData.append("maximumOccupancy", maximumOccupancy);

    const headers = { Authorization: `Bearer ${jwtToken}` };
    try {
      const response = await axiosInstance.post("/api/posts", formData, {
        headers
      });

      notification.open({
        message: "게시물 작성 완료",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />
      });
      navigate('/');
    } catch (error) {
      if (error.response) {
        if (error.response) {
          const {status, data:{errorMessage}} = error.response
          notification.open({
            message: `${status} 에러`,
            description: (
              <>
                <p>{errorMessage}</p>
                <p>호스트로 로그인해주세요.</p>
              </>
            ),
            icon: <FrownOutlined style={{ color: "#ff3333" }} />
          });
        }
      }
    }
  };

  return (
    <Form {...layout} onFinish={handleFinish} autoComplete={"false"}>
      <Form.Item
        label="위치"
        name="location"
        rules={[{ required: true, message: "위치를 선택해주세요." }]}
        hasFeedback
        {...fieldErrors.location}
      >
        <Select placeholder="위치를 선택해주세요">
          {locationList.map(location => (
            <Option key={location}>{location}</Option>
          ))}
        </Select>
      </Form.Item>
  
      <Form.Item
        label="소개글"
        name="caption"
        rules={[{ required: true, message: "소개글을 작성해주세요." }]}
        hasFeedback
        {...fieldErrors.caption}
        {...fieldErrors.non_field_errors}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="수용 가능 인원"
        name="maximumOccupancy"
        rules={[
          { required: true, message: "최대 수용 가능 인원을 입력해주세요." },
          { type: "number", min: 1, message: "1 이상의 숫자를 입력해주세요." }
        ]}
        hasFeedback
        {...fieldErrors.maximumOccupancy}
      >
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>
  
      <Form.Item
        label="숙박 비용(1박)"
        name="pricePerNight"
        rules={[
          { required: true, message: "가격을 입력해주세요." },
          { type: "number", min: 10000, message: "10,000원 이상의 가격을 입력해주세요." }
        ]}
        hasFeedback
        {...fieldErrors.pricePerNight}
      >
        <InputNumber min={0} step={10000} style={{ width: "100%" }} />
      </Form.Item>
  
      <Form.Item wrapperCol={{ offset: 10, span: 8 }}>
        <Button htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};
