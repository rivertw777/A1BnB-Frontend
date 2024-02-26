import React from "react";
import { Form, Input, DatePicker, InputNumber, Button } from "antd";

function SearchPostForm({ handleSearch, handleCancel }) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSearch}
    >
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
      >
        <DatePicker.RangePicker 
          format="YYYY-MM-DD"
        />
      </Form.Item>
      <Form.Item
        label="가격 (1박)"
        name="pricePerNight"
      >
        <InputNumber 
          min={0}
          formatter={value => `₩ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/₩\s?|(,*)/g, '')}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">검색</Button>
      </Form.Item>
    </Form>
  );
}

export default SearchPostForm;
