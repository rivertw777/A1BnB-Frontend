// 게시물 등록 폼
import React, { useState } from "react";
import { Button, Form, Input, Modal, Upload, notification } from "antd";
import { FrownOutlined, PlusOutlined, SmileOutlined } from "@ant-design/icons";
import { useAppContext } from "../../store";
import { parseErrorMessages } from "../../utils/forms";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api";

export default function SubmitPostForm({ photoIdList }) {
  const {
    store: { jwtToken }
  } = useAppContext();

  const navigate = useNavigate();

  const [fieldErrors, setFieldErrors] = useState({});

  const handleFinish = async fieldValues => {
    const {
      caption,
      location,
    } = fieldValues;

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("location", location);
    formData.append("photoIdList", photoIdList)

    const headers = { Authorization: `Bearer ${jwtToken}` };
    try {
      const response = await axiosInstance.post("/api/posts", formData, {
        headers
      });
      console.log("success response :", response);

      notification.open({
        message: "게시물 작성 완료",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />
      });

      navigate("/");
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      if (error.response) {
        const { status, data: fieldsErrorMessages } = error.response;
        if (typeof fieldsErrorMessages === "string") {
          notification.open({
            message: "서버 오류",
            description: `에러) ${status} 응답을 받았습니다. 서버 에러를 확인해주세요.`,
            icon: <FrownOutlined style={{ color: "#ff3333" }} />
          });
        } else {
          setFieldErrors(parseErrorMessages(fieldsErrorMessages));
        }
      }
    }
  };

  return (
    <Form {...layout} onFinish={handleFinish} autoComplete={"false"}>
      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: "Location을 입력해주세요." }]}
        hasFeedback
        {...fieldErrors.location}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Caption"
        name="caption"
        rules={[{ required: true, message: "Caption을 입력해주세요." }]}
        hasFeedback
        {...fieldErrors.caption}
        {...fieldErrors.non_field_errors}
      >
        <Input.TextArea />
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
