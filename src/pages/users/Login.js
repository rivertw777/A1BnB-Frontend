// 로그인 페이지
import React, { useState} from "react";
import { Card, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useNavigate, useLocation} from "react-router-dom";
import { axiosInstance } from "../../api";
import { useAppContext, setToken } from "../../store";
import "./Login.scss";

export default function Login() {
    const { dispatch } = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();
    const [fieldErrors, setFieldErrors] = useState({});
  
    const { from: loginRedirectUrl } = location.state || {
      from: { pathname: "/" }
    };
  
    const onFinish = values => {
      async function fn() {
        const { name, password } = values;
  
        setFieldErrors({});
  
        const data = { name, password };
        try {
          const response = await axiosInstance.post("api/security/login", data);
          const {
            data: { token: jwtToken }
          } = response;
          
          dispatch(setToken(jwtToken));
      
          notification.open({
            message: "로그인 완료",
            icon: <SmileOutlined style={{ color: "#108ee9" }} />
          });
  
          navigate(loginRedirectUrl);
        } catch (error) {
          if (error.response) {
            const {status, data:{errorMessage}} = error.response
            notification.open({
              message: "로그인 실패",
              description: errorMessage,
              icon: <FrownOutlined style={{ color: "#ff3333" }} />
            });

            setFieldErrors((prevErrors) => {
              const updatedErrors = {};
    
              for (const [fieldName, errors] of Object.entries(prevErrors)) {
                const errorMessage = errors instanceof Array ? errors.join(" ") : errors;
                updatedErrors[fieldName] = {
                  validateStatus: "error",
                  help: errorMessage,
                };
              }
    
              return {
                ...prevErrors,
                ...updatedErrors,
              };
            });
          }
        }
      }
      fn();
    };
  
    return (
      <div className="Login">
      <Card title={<span style={{ color: '#7788E8' }}>로그인</span>}>
        <Form
          {...layout}
          onFinish={onFinish}
          autoComplete={"false"}
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 5, message: "5글자 입력해주세요." }
            ]}
            hasFeedback
            {...fieldErrors.username}
            {...fieldErrors.non_field_errors}
          >
            <Input />
          </Form.Item>
  
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            {...fieldErrors.password}
          >
            <Input.Password />
          </Form.Item>
  
          <Form.Item {...tailLayout}>
            <Button htmlType="submit">
              Submit
            </Button>
          </Form.Item>
  
          <Form.Item {...tailLayout}>
            <Button>
              <a href="/users/signup">Signup</a>
            </Button>
          </Form.Item>     
        </Form>
      </Card>
      </div>
    );
  }
  
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 10}
  };
    
  const tailLayout = {
    wrapperCol: { offset: 11}
  };