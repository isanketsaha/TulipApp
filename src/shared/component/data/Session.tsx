import { MinusCircleTwoTone, PlusCircleTwoTone, RetweetOutlined } from "@ant-design/icons"
import { Alert, Button, Col, DatePicker, Form, Input, Row, Select, Space, Steps, Typography, message } from "antd"
import { useForm } from "antd/es/form/Form"
import { StoreValue } from "antd/es/form/interface"
import { SelectProps } from "antd/es/select"
import { FC, useState } from "react"
import { IBasicDetails } from "../../interface/IBasicDetails"
import { IClassDetails } from "../../interface/IClassDetails"
import { IFeesCatalog } from "../../interface/IFeesCatalog"
import { useFeesByRuleMutation, useLazyFetchAllClassroomQuery } from "../../redux/api/feature/classroom/api"
import { useLazyFetchAllActiveEmployeeQuery } from "../../redux/api/feature/employee/api"
import { Role } from "../../utils/Role"
import { Fees } from "./Fees"
import { useFetchCurrentSessionQuery } from "../../redux/api/feature/common/api"
import dayjs, { Dayjs } from "dayjs"
import { useAddSessionMutation } from "../../redux/api/feature/data/api"
import { useNavigate } from "react-router-dom"

export const Session: FC<SelectProps> = (props) => {
  const { value } = props
  const [classList, setClassList] = useState<IClassDetails[]>()
  const [current, setCurrent] = useState(0)
  const [error, setError] = useState<boolean>(false)
  const [form] = useForm()
  const [feesByRule] = useFeesByRuleMutation()
  const [addSession] = useAddSessionMutation()
  const [fees, setFees] = useState<Record<string, IFeesCatalog[]>>()
  const [teacher, setTeacher] = useState<IBasicDetails[]>([])
  const { data: currectSession } = useFetchCurrentSessionQuery()

  const [fetchActiveEmployee] = useLazyFetchAllActiveEmployeeQuery()
  const navigate = useNavigate()
  const next = () => {
    form.validateFields().then((value) => (form.getFieldValue("stdList") ? setCurrent(current + 1) : setError(true)))
  }

  const submit = () => {
    form.validateFields().then((value) => {
      let data = form.getFieldsValue(true)
      data = {
        ...data,
        startDate: data.startDate.format("YYYY-MM-DD"),
        endDate: data.endDate.format("YYYY-MM-DD"),
      }
      addSession(data).then((res: any) => {
        if (res?.data) {
          message.info("Session created succesfully.")
          navigate("/data")
          form.resetFields()
        }
      })
    })
  }

  const getFees = () => {
    const keys = form?.getFieldValue("stdList")?.map((item: StoreValue) => item.id)
    feesByRule({ std: keys }).then((val: any) => {
      if (val.data) setFees(val.data)
    })
  }

  const [fetchAllClassroom] = useLazyFetchAllClassroomQuery()

  const fetchClasses = () => {
    fetchAllClassroom(value[0]?.value).then((res: any) => setClassList(res.data))
    fetchActiveEmployee(Role.TEACHER.split("_")[1]).then((res: any) => setTeacher(res.data))
  }

  const getClassListForm = () => {
    return (
      classList && (
        <Row>
          <Form.List
            name="stdList"
            initialValue={classList?.map((list) => {
              return { id: list.id, label: list.std }
            })}
          >
            {(fields, { add, remove }, { errors }) => (
              <Space direction="vertical" style={{ width: "100%" }}>
                <Row justify={"space-around"}>
                  {fields.map(({ key, name }) => (
                    <Col span={9}>
                      <Row justify={"space-between"}>
                        <Col hidden={true}>
                          <Form.Item name={[name, "id"]}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item name={[name, "label"]} rules={[{ required: true }]}>
                            <Input placeholder="NURSERY" />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Form.Item
                            name={[name, "classTeacher"]}
                            rules={[{ required: true, message: "Class Teacher is Manditory" }]}
                          >
                            <Select
                              placeholder="Class Teacher"
                              options={teacher.map((item) => {
                                return { label: item.name, value: item.id }
                              })}
                            />
                          </Form.Item>
                        </Col>

                        <Col span={2}>
                          <Space>
                            {fields.length > 1 ? (
                              <Button
                                type="link"
                                onClick={() => {
                                  remove(name)
                                }}
                                icon={<MinusCircleTwoTone style={{ fontSize: "3vh" }} />}
                              />
                            ) : null}
                            <Button
                              type="link"
                              onClick={() => add()}
                              icon={<PlusCircleTwoTone style={{ fontSize: "3vh" }} />}
                            />
                          </Space>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </Row>
              </Space>
            )}
          </Form.List>
        </Row>
      )
    )
  }

  const steps = [
    {
      title: "Class",
      content: getClassListForm(),
    },
    {
      title: "Fees",
      content: <Fees form={form} fees={fees} />,
    },
  ]

  const sessionVal = () =>
    form.getFieldValue("startDate") &&
    form.getFieldValue("startDate")?.format("YYYY") +
      "-" +
      (form.getFieldValue("endDate") ? form.getFieldValue("endDate")?.format("YYYY") : "")

  const prev = () => {
    setCurrent(current - 1)
  }
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={"large"}>
      <Steps current={current} items={steps.map((item) => ({ key: item.title, title: item.title }))} />
      {error && (
        <Alert
          message="Session should have classes added."
          type="error"
          showIcon
          closable
          afterClose={() => setError(false)}
        />
      )}
      {currectSession && (
        <Form form={form} initialValues={{ startDate: dayjs(currectSession?.toDate).add(1, "day") }}>
          <Row justify={"space-around"}>
            <Form.Item label="Session" name={"label"} rules={[{ required: true }]}>
              <Input disabled />
            </Form.Item>
            <Form.Item label="Start Date" name={"startDate"} rules={[{ required: true }]}>
              <DatePicker
                format={"DD/MMM/YYYY"}
                onChange={() => form.setFieldValue("label", sessionVal())}
                disabledDate={(currentDate) => currentDate.isBefore(dayjs(currectSession?.toDate).add(1, "D"))}
              />
            </Form.Item>
            <Form.Item label="End Date" name={"endDate"} rules={[{ required: true }]}>
              <DatePicker
                format={"DD/MMM/YYYY"}
                onChange={() => form.setFieldValue("label", sessionVal())}
                disabledDate={(currentDate) => currentDate.isBefore(dayjs(currectSession?.toDate).add(10, "M"))}
              />
            </Form.Item>
            <Form.Item>
              {current == 0 && (
                <Button type="link" icon={<RetweetOutlined />} onClick={fetchClasses}>
                  Copy Classes
                </Button>
              )}
              {current == 1 && (
                <Button type="link" icon={<RetweetOutlined />} onClick={getFees}>
                  Copy Fees
                </Button>
              )}
            </Form.Item>
            <Form.Item>
              <Space>
                {current > 0 && (
                  <Button type="default" onClick={prev}>
                    Back
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <Button type="default" onClick={next}>
                    Next
                  </Button>
                )}
                {current === steps.length - 1 && (
                  <Button type="default" onClick={submit}>
                    Submit
                  </Button>
                )}
              </Space>
            </Form.Item>
          </Row>
          {steps[current].content}
        </Form>
      )}
    </Space>
  )
}
