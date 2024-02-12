import { WhatsAppOutlined } from "@ant-design/icons"
import { Checkbox, Col, DatePicker, Divider, Form, FormProps, Input, InputNumber, Row, Select } from "antd"
import type { Dayjs } from "dayjs"
import { FC } from "react"
import relativeTime from "dayjs/plugin/relativeTime"
import { useLocation } from "react-router-dom"
import { useAppSelector } from "../../../store"
import { UploadFiles } from "../UploadFiles"
import dayjs from "dayjs"

export const AddBasic: FC<FormProps> = (formProps) => {
  dayjs.extend(relativeTime)
  const { state } = useLocation()
  const { classList, sessionList, selectedSession, bloodGroupList, genderList, religionList } = useAppSelector(
    (state) => state.commonData
  )
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
          <Form.Item
            name="dob"
            label="Date Of Birth"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator: async (rule, value) => {
                  if (value) {
                    return state.type == "employee"
                      ? value && dayjs().diff(value, "y") >= 18
                        ? Promise.resolve()
                        : Promise.reject(new Error("Employee should be 18+"))
                      : Promise.resolve()
                  }
                },
              }),
            ]}
          >
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
              <Select options={classList} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="session" label="Session" rules={[{ required: true }]}>
              <Select options={sessionList?.filter((item) => Number(item.value) >= selectedSession?.value)} />
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
              rules={[{ required: false, type: "number", min: 0, max: 50 }]}
            >
              <InputNumber controls={false} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Row gutter={[40, 40]}>
        <Col span={8}>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select options={genderList} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="bloodGroup" label="Blood Group" rules={[{ required: true }]}>
            <Select options={bloodGroupList} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="religion" label="Religion">
            <Select options={religionList} />
          </Form.Item>
        </Col>
      </Row>
      {state.type == "student" && (
        <Row gutter={[40, 40]}>
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
            <>
              <UploadFiles listType={"text"} showUploadList={false} name="panCard" label="Pan Card" />
              <UploadFiles
                listType={"text"}
                showUploadList={false}
                name="highestQualification"
                label="Highest Qualification"
              />
            </>
          )}
        </Col>
      </Row>
    </>
  )
}
