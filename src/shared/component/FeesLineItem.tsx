import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useState } from "react";
const { Option } = Select;


interface FeesLineItem {
  feesType: string,
  fromMonth?: string,
  toMonth?: string,
  amount?: number;
}

interface FeesInputProps {
  value?: FeesLineItem;
  onChange?: (value: FeesLineItem) => void;
}

export const FeesLineItem: React.FC<FeesInputProps> = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);


  return (


    <Row gutter={[8,12]} style={{width:'100%'}}>
      <Col span={6}>
        <Form.Item  name="type">
          <Select
            value="Session Fees"
          >
            <Option value="rmb">RMB</Option>
            <Option value="dollar">Dollar</Option>
          </Select>

        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label="From Month" name="fromMonth">
          <DatePicker picker="month" />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label="From Month" name="toMonth">
          <DatePicker picker="month" />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label="Amount" name="amount">
          <span className="ant-form-text">2132</span>
        </Form.Item>
      </Col>
    </Row>



  );
};