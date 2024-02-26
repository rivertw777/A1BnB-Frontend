// 게시물 등록 폼
import React, { useState } from "react";
import { Button, Form, Input, DatePicker, InputNumber, notification } from "antd";
import { FrownOutlined, PlusOutlined, SmileOutlined } from "@ant-design/icons";
import { useAppContext } from "../../store";
import { parseErrorMessages } from "../../utils/forms";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api";
import { format } from 'date-fns';

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
      dates,
      pricePerNight
    } = fieldValues;

    const checkIn = dates[0].toDate(); // Moment.js 객체를 Date 객체로 변환
    const checkOut = dates[1].toDate();

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("location", location);
    formData.append("checkIn", format(checkIn, "yyyy-MM-dd'T'HH:mm:ss"));
    formData.append("checkOut", format(checkOut, "yyyy-MM-dd'T'HH:mm:ss"));
    formData.append("pricePerNight", pricePerNight);
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

      navigate('/');
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

      <Form.Item
        label="Check-In/Out"
        name="dates"
        rules={[
            { 
                required: true, 
                message: "체크인/체크아웃 날짜를 선택해주세요." 
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || value.length !== 2) {
                        return Promise.reject(new Error("두 개의 날짜를 선택해주세요."));
            }
            if (value[0].isSame(value[1], 'day')) {
                return Promise.reject(new Error("체크인과 체크아웃 날짜는 같을 수 없습니다."));
            }
            return Promise.resolve();
        },
    }),
  ]}
  hasFeedback
  {...fieldErrors.dates}
>
  <DatePicker.RangePicker />
</Form.Item>

      <Form.Item
        label="Price Per Night"
        name="pricePerNight"
        rules={[
          { required: true, message: "가격을 입력해주세요." },
          { type: "number", min: 1000, message: "1000원 이상의 가격을 입력해주세요." }
        ]}
        hasFeedback
        {...fieldErrors.pricePerNight}
      >
        <InputNumber min={0} step={1000} style={{ width: "100%" }} />
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
