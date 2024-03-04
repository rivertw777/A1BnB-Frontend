// 사진 등록 폼
import React, { useState } from "react";
import { Button, Form, Modal, Upload, notification, Spin } from "antd";
import { FrownOutlined, PlusOutlined } from "@ant-design/icons";
import { useAppContext } from "../../store";
import { getBase64FromFile } from "../../utils/base64";
import { parseErrorMessages } from "../../utils/forms";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api";

export default function UploadPhotoForm() {
  const {
    store: { jwtToken }
  } = useAppContext();

  const navigate = useNavigate();

  const [fileList, setFileList] = useState([]);
  const [previewPhoto, setPreviewPhoto] = useState({
    visible: false,
    base64: null
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);  // 로딩 상태 추가

  const handleUploadChange = ({ fileList }) => {
    if (fileList.length <= 5) {
      const duplicatePhotos = fileList.filter(
        (file, index, self) =>
          index !== self.findIndex((f) => f.name === file.name)
      );

      if (duplicatePhotos.length > 0) {
        notification.warning({
          message: "중복된 사진",
          description: "다른 사진을 선택해주세요.",
          icon: <FrownOutlined style={{ color: "#ff3333" }} />
        });
      } else {
        setFileList(fileList);
      }
    }
  };

  const handlePreviewPhoto = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64FromFile(file.originFileObj);
    }

    setPreviewPhoto({
      visible: true,
      base64: file.url || file.preview
    });
  };

  // 사진 업로드 API 호출
  const handleFinish = async (fieldValues) => {
    const {
      photos: { fileList }
    } = fieldValues;

    // 사진 개수가 5장 미만인 경우 경고 메시지 표시 후 함수 종료
    if (fileList.length < 5) {
      notification.warning({
        message: "사진 개수 부족",
        description: "사진은 5장을 업로드해야 합니다.",
        icon: <FrownOutlined style={{ color: "#ff3333" }} />
      });
      return;
    }

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("photos", file.originFileObj);
    });

    const headers = { Authorization: `Bearer ${jwtToken}` };
    
    setIsLoading(true);  // 로딩 시작

    try {
      const response = await axiosInstance.post("/api/photos", formData, { headers });

      // 서버에서 반환된 photoIdList를 받아오기
      const photoIdList = response.data;
      navigate("/photos/result", { state: { photoIdList } });
      
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
    } finally {
      setIsLoading(false);  // 로딩 종료
    }
  };

  return (
    <Spin spinning={isLoading} size="large" tip={<div style={{ fontSize: "18px", fontWeight: "bold" }}>사진을 분석중입니다.<br />잠시만 기다려주세요.</div>}>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={handleFinish}
        autoComplete={"false"}
      >
        <Form.Item
          label="Photos"
          name="photos"
          rules={[{ required: true, message: "사진을 입력해주세요." }]}
          hasFeedback
          {...fieldErrors.photo}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={handleUploadChange}
            onPreview={handlePreviewPhoto}
            multiple // 여러 장의 사진을 선택할 수 있도록 multiple 속성 추가
          >
            {fileList.length > -1 && fileList.length < 5 ? (
              <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
              </div>
            ) : null}
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Modal
          visible={previewPhoto.visible}
          footer={null}
          onCancel={() => setPreviewPhoto({ visible: false })}
        >
          <img
            src={previewPhoto.base64}
            style={{ width: "100%" }}
            alt="Preview"
          />
        </Modal>
      </Form>
    </Spin>
  );
}
