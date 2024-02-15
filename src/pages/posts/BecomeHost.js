import React from "react";
import { Card } from "antd";
import PostNewForm from "../../components/posts/PostNewForm";
import "./BecomeHost.scss";

export default function BecomeHost() {
  return (
    <div className="BecomeHost">
      <Card title={<span style={{ color: '#FF5A5F' }}>새 포스팅 쓰기</span>}>
        <PostNewForm />
      </Card>
    </div>
  );
}
