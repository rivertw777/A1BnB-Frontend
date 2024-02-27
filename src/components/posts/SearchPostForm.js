// 게시물 검색 폼
import React, { useState } from "react";
import { Button, Form, Input, DatePicker, InputNumber, Select } from "antd";
import { useAppContext } from "../../store";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from 'date-fns';

export default function SearchPostForm({ handleSearch, handleCancel }) {
    const {
        store: { jwtToken }
    } = useAppContext();
  
    const navigate = useNavigate();

    const [fieldErrors, setFieldErrors] = useState({});

    const amenityList = [
        'Bathtub', 'Bed', 'Chest of drawers', 'Closet', 'Computer monitor', 
        'Couch', 'Frying pan', 'Hair dryer', 'Home appliance', 'Jacuzzi', 
        'Kitchen appliance', 'Microwave oven', 'Oven', 'Pressure cooker', 
        'Printer', 'Refrigerator', 'Sink', 'Sofa bed', 'Swimming pool', 
        'Table', 'Wardrobe', 'Washing machine', 'Television', 'toaster'
    ];
    const { Option } = Select;

    const handleFinish = async fieldValues => {
        const {
            authorName,
            location,
            dates,
            minPrice,
            maxPrice,
            amenities
        } = fieldValues;
        
        let checkIn, checkOut;

        if (dates) {
            checkIn = dates[0].toDate(); // Moment.js 객체를 Date 객체로 변환
            checkOut = dates[1].toDate();
        }
        
        const searchCondition = {
            authorName: authorName ? authorName : null,
            location: location ? location : null,
            checkIn: checkIn ? format(checkIn, "yyyy-MM-dd'T'HH:mm:ss") : null,
            checkOut: checkOut ? format(checkOut, "yyyy-MM-dd'T'HH:mm:ss") : null,
            minPrice: minPrice ? minPrice : null,
            maxPrice: maxPrice ? maxPrice : null,
            amenities: amenities ? amenities : null
        };

        navigate("/posts/search", {
            state: { searchCondition: searchCondition }
        });
    };
    
    return (
        <Form {...layout} onFinish={handleFinish} autoComplete={"false"}>
        <Form.Item
            label="작성자 이름"
            name="authorName"
        >
            <Input />
        </Form.Item>
     
        <Form.Item
            label="위치"
            name="location"
        >
            <Input />
        </Form.Item>
      
        <Form.Item
            label="체크인/체크아웃"
            name="dates"
            rules={[
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || value.length === 0) {
                            return Promise.resolve();
                        }
                        if (value.length === 1) {
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
            label="최소 가격(1박)"
            name="minPrice"
            rules={[
                { type: "number",  message: "숫자를 입력해주세요." },
                {
                    validator: async (_, value) => {
                        if (value !== undefined && isNaN(value)) {
                            return Promise.reject(new Error("숫자 값을 입력해주세요."));
                        }
                    },
                }
            ]}
            hasFeedback
            {...fieldErrors.pricePerNight}
        >
            <InputNumber min={0} step={1000} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
            label="최대 가격(1박)"
            name="maxPrice"
            rules={[
                { type: "number",  message: "숫자를 입력해주세요." },
                {
                    validator: async (_, value) => {
                        if (value !== undefined && isNaN(value)) {
                            return Promise.reject(new Error("숫자 값을 입력해주세요."));
                        }
                    },
                }
            ]}
            hasFeedback
            {...fieldErrors.pricePerNight}
        >
            <InputNumber min={0} step={1000} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
            label="어메니티"
            name="amenities"
        >
            <Select
                mode="multiple"
                placeholder="어메니티를 선택하세요"
            >
                {amenityList.map((amenity) => (
                    <Option key={amenity}>{amenity}</Option>
                ))}
            </Select>
        </Form.Item>
        
        <Form.Item wrapperCol={{ offset: 10, span: 8 }}>
            <Button type="primary" htmlType="submit">
                검색
            </Button>
        </Form.Item>
    </Form>
  );
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 }
};
