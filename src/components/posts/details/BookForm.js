// 숙소 예약 폼
import React, { useState } from "react";
import { Card, Button, DatePicker, Form, notification, InputNumber } from 'antd';
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { useAppContext } from "../../../store";
import { axiosInstance } from "../../../api";
import { format } from 'date-fns';
import moment from 'moment';

import "./BookForm.scss";

export default function BookingForm( {bookFormData} ) {
  const { store: { jwtToken } } = useAppContext();
  const headers = { Authorization: `Bearer ${jwtToken}` };
  const [visible, setVisible] = useState(false);
  const [fieldErrors] = useState({});
  const [form] = Form.useForm();
  
  // 예약 폼 정보
  const { postId, unavailableDates, pricePerNight, maximumOccupancy } = bookFormData;

  const disabledDates = unavailableDates ? unavailableDates.map(dateStr => moment(dateStr).toDate()) : [];

  // 예약 불가능 날짜 초기화
  const disabledDate = (current) => {
    return current.isBefore(moment().startOf('day')) || disabledDates.some(disabledDate =>
      current.isSame(moment(disabledDate), 'day')
    );
  };

  const { RangePicker } = DatePicker;

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 숙소 예약 API 요청
  const onFinish = async fieldValues => {
    if (isSubmitting) return; 

    setIsSubmitting(true); 
    const { dates } = fieldValues;

    const checkInDate = dates[0].toDate(); 
    const checkOutDate = dates[1].toDate();

    const formData = new FormData();
    formData.append("checkInDate", format(checkInDate, "yyyy-MM-dd'T'HH:mm:ss"));
    formData.append("checkOutDate", format(checkOutDate, "yyyy-MM-dd'T'HH:mm:ss"));
    formData.append("paymentAmount", totalPrice);

    try {
      const apiUrl = `/api/posts/${postId}/book`;
      const response = await axiosInstance.post(apiUrl, formData, {headers});
      notification.open({
        message: "예약 완료",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />
      });
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      if (error.response) {
        const {status, data:{errorMessage}} = error.response;
        notification.open({
          message: `${status} 에러`,
          description: errorMessage,
          icon: <FrownOutlined style={{ color: "#ff3333" }} />
        });
      }
    } finally {
      setIsSubmitting(false); 
    }
  };

  // 숙박 기간 계산
  const [dateDifference, setDateDifference] = useState(0);
  const handleDateChange = dates => {
    if (dates && dates.length === 2) {
      const diff = dates[1].diff(dates[0], 'days');
      setDateDifference(diff);
    }
  };

  // 인원 비용 계산
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const totalPeople = adults + children + infants;
  const maxAdults = maximumOccupancy - children - infants;
  const maxChildren = maximumOccupancy - adults - infants;
  const maxInfants = maximumOccupancy - adults - children;

  const handleAdultsChange = value => setAdults(value);
  const handleChildrenChange = value => setChildren(value);
  const handleInfantsChange = value => setInfants(value);

  // 총액 계산
  const totalPrice = dateDifference * ((pricePerNight * adults) + (pricePerNight * 0.5 * children));

  return (
    <Card
      title={
        <p>
          <strong>{pricePerNight?.toLocaleString()}₩</strong> / 1박
        </p>
      }
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
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
                  let day = value[0];
                  const endDay = value[1];
                  const datesInRange = [];
                  while (day.isBefore(endDay)) {
                    datesInRange.push(day);
                    day = day.clone().add(1, 'days');
                  }
                  // 비활성화된 날짜가 포함되어 있는지 확인
                  const isDisabledDateIncluded = datesInRange.some(date => 
                    disabledDates.some(disabledDate => 
                    date.isSame(moment(disabledDate), 'day')
                    )
                  );
                  if (isDisabledDateIncluded) {
                    return Promise.reject(new Error("예약할 수 없는 날짜가 포함되어 있습니다."));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            hasFeedback
            {...fieldErrors.dates}
        >
          <RangePicker
            style={{ width: '100%' }}
            onChange={handleDateChange}
            disabledDate={disabledDate}
          />
        </Form.Item>
  
        <Form.Item 
          label="인원" 
          name="people"
          validateStatus={totalPeople >= maximumOccupancy ? "error" : ""}
          help={totalPeople >= maximumOccupancy ? "최대 인원에 도달했습니다." : ""}
        >
          <Button 
            style={{ width: '100%' }}
            onClick={() => setVisible(!visible)}>인원 선택</Button>
          {visible && (
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <Form.Item 
                label={
                  <>
                    <span>성인</span>
                    <span style={{ fontSize: '0.8em' }}>(13세 이상)</span>
                  </>
                }
                style={{ marginBottom: 0 }}>
                <InputNumber min={0} max={maxAdults} defaultValue={0} onChange={handleAdultsChange} />
              </Form.Item>
  
              <Form.Item 
                label={
                  <>
                    <span>어린이</span>
                    <span style={{ fontSize: '0.8em' }}>(2세~12세)</span>
                  </>
                }
                style={{ marginBottom: 0 }}>
                <InputNumber min={0} max={maxChildren} defaultValue={0} onChange={handleChildrenChange} />
              </Form.Item>
  
              <Form.Item
                label={
                  <>
                    <span>유아</span>
                    <span style={{ fontSize: '0.8em' }}>(2세 미만)</span>
                  </>
                } 
                style={{ marginBottom: 0 }}>
                <InputNumber min={0} max={maxInfants} defaultValue={0} onChange={handleInfantsChange} />
              </Form.Item>
            </div>
          )}
        </Form.Item>
  
        <hr style={{ marginTop: '30px' }} />
  
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>총 합계</p>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{totalPrice?.toLocaleString()}₩</p>
        </div>
  
        <Form.Item>
          <Button 
            className="custom-button" 
            type="primary" 
            block 
            htmlType="submit"
            disabled={!totalPrice || form.getFieldsError().filter(({ errors }) => errors.length).length}
          >
            예약하기
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}