import { UploadOutlined, WhatsAppOutlined } from "@ant-design/icons"
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  FormProps,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Upload,
} from "antd"
import type { Dayjs } from "dayjs"
import { FC } from "react"
import { useLocation } from "react-router-dom"
import { useAppSelector } from "../../../store"
import { UploadFiles } from "../UploadFiles"
import { allowedFieldType, uploadProps } from "/src/configs/UploadConfig"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"

export const AddBasic: FC<FormProps> = (formProps) => {
  const { state } = useLocation()
  const { form } = formProps
  const transportAvail = Form.useWatch("transportServiceFlag", form)
  const selectList = useAppSelector((state) => state.commonData)
  const disableDate = (currentDate: Dayjs) => {
    return currentDate.isAfter(new Date())
  }

  const normFile = (e: any) => {
    console.log("Upload event:", e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const prefixSelector = (
    <Form.Item name="whatsappAvailable" valuePropName="checked" noStyle>
      <Checkbox>
        <WhatsAppOutlined />
      </Checkbox>
    </Form.Item>
  )

  const prefixEveningClass = (
    <Form.Item name="eveningClass" valuePropName="checked" noStyle>
      <Checkbox>Evening </Checkbox>
    </Form.Item>
  )

  return (
    <>
      <Form.Item hidden={true} name="type">
        <Input />
      </Form.Item>
      <Row gutter={[40, 40]}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true },
              {
                pattern: new RegExp("[A-Za-z ]+$"),
                message: "Name does not accept numbers or special character",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="dob" label="Date Of Birth" rules={[{ required: true }]}>
            <DatePicker format={"DD-MM-YYYY"} style={{ width: "100%" }} disabledDate={disableDate} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[40, 40]}>
        <Col span={12}>
          <Form.Item name="contact" label="Phone Number" rules={[{ required: true, type: "number" }]}>
            <InputNumber addonBefore={prefixSelector} maxLength={12} controls={false} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      {state.type == "student" ? (
        <Row gutter={[40, 40]}>
          <Col span={8}>
            <Form.Item name="std" label="Class" rules={[{ required: true }]}>
              <Select options={selectList.classList} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="session" label="Session" rules={[{ required: true }]}>
              <Select options={selectList.sessionList} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="previousSchool" label="Previous School">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      ) : (
        <Row gutter={[40, 40]}>
          <Col span={8}>
            <Form.Item
              name="aadhaar"
              label="Aadhaar"
              rules={[
                { required: true },
                {
                  pattern: new RegExp("^[0-9]*$"),
                  message: "No Alphabets Allowed",
                },
              ]}
            >
              <Input maxLength={12} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="qualification" label="Qualification" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="experince"
              label="Experience"
              rules={[{ required: true, type: "number", min: 0, max: 50 }]}
            >
              <InputNumber controls={false} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Row gutter={[40, 40]}>
        <Col span={8}>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select options={selectList.genderList} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="bloodGroup" label="Blood Group" rules={[{ required: true }]}>
            <Select options={selectList.bloodGroupList} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="religion" label="Religion">
            <Select options={selectList.religionList} />
          </Form.Item>
        </Col>
      </Row>
      {state.type == "student" && (
        <Row gutter={[40, 40]}>
          {/* <Col span={8}>
            <Form.Item name="transportService" label="Transport" style={{ width: "100%" }}>
              <Row style={{ width: "100%" }} justify={"space-between"}>
                <span>
                  <Form.Item name="transportServiceFlag" valuePropName="checked">
                    <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
                  </Form.Item>
                </span>
                <span style={{ width: "75%" }}>
                  <Form.Item name="transportServiceValue" dependencies={["session", "transportAvail"]}>
                    <Select
                      disabled={!transportAvail}
                      showSearch
                      allowClear
                      options={[
                        { value: true, label: "Yes" },
                        { value: false, label: "No" },
                      ]}
                    />
                  </Form.Item>
                </span>
              </Row>
            </Form.Item>
          </Col> */}
          <Col span={8}>
            <Form.Item
              name="aadhaar"
              label="Aadhaar"
              rules={[
                {
                  pattern: new RegExp("^[0-9]*$"),
                  message: "No Alphabets Allowed",
                },
              ]}
            >
              <Input maxLength={12} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Divider>Document Upload</Divider>
      <Row align={"middle"} justify={"end"}>
        <Col span={12}>
          <UploadFiles listType={"text"} showUploadList={false} name="aadhaarCard" label="Aadhaar Card" maxCount={2} />
        </Col>
        <Col span={12}>
          {state.type == "student" ? (
            <UploadFiles listType={"text"} showUploadList={false} name="birthCertificate" label="Birth Certificate" />
          ) : (
            <UploadFiles listType={"text"} showUploadList={false} name="panCard" label="Pan Card" />
          )}
        </Col>
      </Row>
    </>
  )
}
