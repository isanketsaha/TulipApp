import {
  Descriptions,
  Badge,
  Space,
  Button,
  Divider,
  Switch,
  Modal,
  Row,
  notification,
  Upload,
  Select,
  Avatar,
  Col,
  DatePicker,
  Form,
  message,
} from "antd"
import dayjs from "dayjs"
import {
  useAddTransportMutation,
  useDeactivateStudentMutation,
  useLazyDiscontinueTransportQuery,
  useSearchStudentQuery,
} from "../redux/api/feature/student/api"
import { FeesCalender } from "./FeesCalender"
import { Link, useNavigate } from "react-router-dom"
import { TransactionHistory } from "./TransactionHistory"
import { Error500 } from "/src/error/Error500"
import { ExclamationCircleFilled } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { useAppSelector } from "/src/store"
import { Role } from "../utils/Role"
import { WhatsAppOutlined, EditOutlined, UserOutlined } from "@ant-design/icons"
import { useMediaQuery } from "react-responsive"
import { uploadProps } from "/src/configs/UploadConfig"
import { MdOutlinePayments } from "react-icons/md"
import { TbStatusChange } from "react-icons/tb"
import modal from "antd/es/modal"
import { IoMdAddCircle } from "react-icons/io"
import { useFetchAllTransportCatalogQuery } from "../redux/api/feature/catalog/api"
import { ITransportCatalog } from "../interface/ITransportCatalog"
import { useForm } from "antd/es/form/Form"
import { BiBus } from "react-icons/bi"

interface IStudentViewProps {
  studentId: string
}

export const StudentViewDetails = ({ studentId }: IStudentViewProps) => {
  const [transportForm] = useForm()
  const { confirm } = Modal
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" })
  const { user } = useAppSelector((state) => state.userAuth)
  const [sessionId, setSessionId] = useState<number>()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [discountinue] = useLazyDiscontinueTransportQuery()
  const [addTransport] = useAddTransportMutation()
  const { data: studentData, isFetching } = useSearchStudentQuery(studentId, { skip: studentId == "" })
  const [deactivateStudent] = useDeactivateStudentMutation()
  useEffect(() => {
    setSessionId(studentData?.classDetails[0]?.sessionId)
  }, [studentData])
  const showEditConfirm = () => {
    confirm({
      title: `Are you sure to edit details of ${studentData?.name}  ?`,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      centered: true,
      okType: "danger",
      cancelText: "No",
      width: 600,
      autoFocusButton: "cancel",
      onOk() {
        setTimeout(() => navigate(`/edit/${studentData?.id}`, { replace: true, state: { type: "student" } }), 300)
      },
    })
  }

  const selectedSession = () => {
    return studentData?.classDetails.find((item) => item.sessionId == sessionId)
  }

  const { data: transportCatalog } = useFetchAllTransportCatalogQuery(selectedSession()?.sessionId, {
    skip: !selectedSession(),
  })

  const addTransportService = () => {
    transportForm.validateFields().then(() => {
      const transport = { ...transportForm.getFieldsValue(true), studentId: studentData?.id }
      addTransport(transport).then((res) => message.success("Success"))
    })
  }

  const addTransportLayout = (
    <Form form={transportForm}>
      <Row align={"middle"} justify={"space-around"}>
        <Col span={10}>
          <Form.Item name={"locationId"} label={"Pickup Location"} rules={[{ required: true }]}>
            <Select
              allowClear
              options={transportCatalog?.map((item: ITransportCatalog) => {
                return {
                  label: (
                    <Row justify={"space-between"}>
                      <Col>{item.location} </Col>
                      <Col style={{ color: "green" }}>
                        {item.amount.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                          style: "currency",
                          currency: "INR",
                        })}
                      </Col>
                    </Row>
                  ),
                  value: item.id,
                }
              })}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name={"startDate"} label={"Start Date"} rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  return (
    <>
      {studentData && (
        <>
          <Divider style={{ marginTop: "-2vh" }} dashed>
            <h3>
              <Avatar size={120} icon={<UserOutlined />} src={studentData.profilePictureUrl}></Avatar>
              <div>
                {studentData?.name}{" "}
                <div>
                  {isMobile ? null : (
                    <>
                      <Button icon={<EditOutlined />} type="link" onClick={showEditConfirm}>
                        {" "}
                        Edit
                      </Button>
                      <Divider type="vertical" />
                      <Link to={`/payment/${studentData?.id}/${selectedSession()?.id}`}>
                        <Button type="link" icon={<MdOutlinePayments />}>
                          Payment
                        </Button>{" "}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </h3>
          </Divider>
          <Space direction="vertical" style={{ width: "100%" }} size={"small"}>
            <Descriptions bordered>
              <Descriptions.Item label="Student ID"> {studentData?.id}</Descriptions.Item>
              <Descriptions.Item label="Gender">{studentData?.gender}</Descriptions.Item>
              <Descriptions.Item label="Date Of Birth">
                {dayjs(studentData?.dob).format("DD-MM-YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Admission On" span={1}>
                {dayjs(studentData?.admissionDate).format("DD-MM-YYYY")}
              </Descriptions.Item>
              <Descriptions.Item label="Active" span={1}>
                {user?.authority && [Role.PRINCIPAL, Role.ADMIN].includes(user?.authority) ? (
                  <Switch
                    checkedChildren="ACTIVE"
                    unCheckedChildren="INACTIVE"
                    checked={studentData?.active}
                    onClick={(checked) => setOpen(!checked)}
                  />
                ) : (
                  <Badge
                    status={studentData?.active ? "success" : "error"}
                    text={studentData?.active ? "ACTIVE" : "INACTIVE"}
                  />
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Address">{studentData?.address}</Descriptions.Item>
              <Descriptions.Item label="Blood Group">{studentData?.bloodGroup}</Descriptions.Item>
              <Descriptions.Item label="Religion">{studentData?.religion}</Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                <Space>
                  {" "}
                  <Switch
                    checkedChildren={<WhatsAppOutlined />}
                    unCheckedChildren={<WhatsAppOutlined />}
                    defaultChecked={studentData?.whatsappAvailable}
                    disabled
                  />
                  {studentData?.phoneNumber}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Classroom">{selectedSession()?.std}</Descriptions.Item>
              <Descriptions.Item label="Class Teacher">{selectedSession()?.headTeacher}</Descriptions.Item>
              <Descriptions.Item label="Aadhaar">{studentData?.aadhaar}</Descriptions.Item>

              <Descriptions.Item label="Session">
                {studentData?.classDetails.length > 1 ? (
                  <Select
                    bordered={false}
                    onSelect={setSessionId}
                    defaultValue={studentData?.classDetails[0]?.sessionId}
                    style={{ width: "20vmin" }}
                    options={studentData?.classDetails.map((item) => {
                      return {
                        label: item.session,
                        value: item.sessionId,
                      }
                    })}
                  />
                ) : (
                  studentData?.classDetails[0]?.session
                )}{" "}
              </Descriptions.Item>
              <Descriptions.Item label="Transport Service">
                <Switch
                  style={{ marginRight: "2vmin" }}
                  checkedChildren={<BiBus />}
                  unCheckedChildren={<BiBus />}
                  defaultChecked={studentData?.transports != null}
                  onChange={async (checked) =>
                    checked
                      ? modal.info({
                          title: "Transport Service",
                          width: 800,
                          onOk: addTransportService,
                          content: addTransportLayout,
                        })
                      : modal.info({
                          title: "Transport Service",
                          width: 500,
                          onOk: () =>
                            discountinue({ studentId: studentData.id, locationId: studentData?.transports?.id }).then(
                              (res) => res.isSuccess && message.info("Transport Service discontinued")
                            ),
                          content: "Are you sure to discontinue the transport ?",
                        })
                  }
                  disabled={![Role.PRINCIPAL, Role.ADMIN, Role.STAFF].includes(user!.authority)}
                />
                {studentData?.transports?.location.toUpperCase()}
              </Descriptions.Item>
            </Descriptions>
            <Upload
              className="row"
              {...uploadProps()}
              fileList={[...studentData.birthCertificate, ...studentData.aadhaarCard]}
              listType="text"
            ></Upload>
            <Divider>
              {" "}
              <h3>Guardian Details</h3>
            </Divider>
            <Space direction="vertical" style={{ width: "100%" }} size={"small"}>
              {studentData?.dependent.map((item) => {
                return (
                  <Descriptions key={item.id} bordered>
                    <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
                    <Descriptions.Item label="Relation"> {item.relationship}</Descriptions.Item>
                    <Descriptions.Item label="Contact">
                      {" "}
                      <Space>
                        {" "}
                        <Switch
                          checkedChildren={<WhatsAppOutlined />}
                          unCheckedChildren={<WhatsAppOutlined />}
                          defaultChecked={item?.whatsappAvailable}
                          disabled
                        />{" "}
                        {item.contact}{" "}
                      </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label=" Aadhaar Number"> {item.aadhaarNo}</Descriptions.Item>
                    <Descriptions.Item label="Occupation">{item.occupation}</Descriptions.Item>
                    <Descriptions.Item label="Qualification">{item.qualification}</Descriptions.Item>
                    <Descriptions.Item label="Aadhaar Document">
                      <Upload {...uploadProps()} fileList={item.aadhaarCard} listType="text"></Upload>
                    </Descriptions.Item>
                  </Descriptions>
                )
              })}
            </Space>

            {studentData?.id && selectedSession() && (
              <FeesCalender
                studentId={studentData?.id}
                classId={selectedSession()?.id}
                transportService={studentData?.transports != null}
              />
            )}
            {studentData?.id && <TransactionHistory studentId={studentData?.id} />}
          </Space>
        </>
      )}
      {!studentData && !isFetching && <Error500 />}
      <Modal
        centered
        open={open}
        maskClosable={false}
        okText={"Confirm"}
        onOk={() => deactivateStudent(studentId).then((data) => setOpen(false))}
        onCancel={() => setOpen(false)}
      >
        <b>{studentData?.name}</b> will be removed from School. Are you sure ?
      </Modal>
    </>
  )
}
