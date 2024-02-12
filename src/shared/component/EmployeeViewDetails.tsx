import {
  EditOutlined,
  ExclamationCircleFilled,
  FileDoneOutlined,
  IssuesCloseOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons"
import { Avatar, Badge, Button, Descriptions, Divider, Modal, Row, Space, Switch, Tooltip, Upload, message } from "antd"
import modal from "antd/es/modal"
import dayjs, { Dayjs } from "dayjs"
import { useNavigate } from "react-router-dom"
import {
  useLazyForgotPasswordQuery,
  useLazyGenerateJoiningLetterQuery,
  useLazyTerminateEmployeeQuery,
  useSearchEmployeeByIdQuery,
} from "../redux/api/feature/employee/api"
import { Role } from "../utils/Role"
import { useAppSelector } from "/src/store"
import { uploadProps } from "/src/configs/UploadConfig"

interface IEmployeeProps {
  employeeId: string
}
export const EmployeeViewDetails = ({ employeeId }: IEmployeeProps) => {
  let navigate = useNavigate()
  const { confirm } = Modal
  const { user } = useAppSelector((state) => state.userAuth)
  const allowerRoles: Role[] = [Role.ADMIN, Role.PRINCIPAL]
  const [forgotPassword] = useLazyForgotPasswordQuery()
  const [generateJoiningLetter] = useLazyGenerateJoiningLetterQuery()
  const [terminateEmployee] = useLazyTerminateEmployeeQuery()
  const { data: employeeData } = useSearchEmployeeByIdQuery(employeeId, { skip: employeeId == "" })

  const showEditConfirm = () => {
    confirm({
      title: `Are you sure to edit details of ${employeeData?.name}  ?`,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      centered: true,
      okType: "danger",
      cancelText: "No",
      width: 600,
      autoFocusButton: "cancel",
      onOk() {
        setTimeout(() => navigate(`/edit/${employeeData?.id}`, { replace: true, state: { type: "employee" } }), 300)
      },
    })
  }
  return (
    <>
      {employeeData && (
        <>
          <Divider orientation="center" plain>
            <h3>
              <Avatar size={120} icon={<UserOutlined />} src={employeeData.profilePictureUrl}></Avatar>
              <div>
                {employeeData?.name}{" "}
                {user?.authority &&
                [Role.PRINCIPAL, Role.ADMIN].includes(user?.authority) &&
                dayjs(employeeData.createdDate)?.isSame(dayjs(new Date()), "month") ? (
                  <Tooltip title="Download Joining Letter">
                    {" "}
                    <Button
                      icon={<FileDoneOutlined />}
                      type="link"
                      onClick={() => generateJoiningLetter(employeeData?.id)}
                    />
                  </Tooltip>
                ) : null}
              </div>
              <div>
                {
                  <Button icon={<EditOutlined />} type="link" disabled onClick={showEditConfirm}>
                    Edit
                  </Button>
                }
              </div>
            </h3>
          </Divider>

          <Descriptions bordered>
            <Descriptions.Item label="Employee ID"> {employeeData?.id}</Descriptions.Item>
            <Descriptions.Item label="Gender">{employeeData?.gender}</Descriptions.Item>
            <Descriptions.Item label="Date Of Birth">{dayjs(employeeData?.dob).format("DD-MM-YYYY")}</Descriptions.Item>

            <Descriptions.Item label="Joined On" span={1}>
              {employeeData?.interview?.doj ? dayjs(employeeData?.interview.doj!).format("DD-MM-YYYY") : "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="Active" span={1}>
              {user?.authority && [Role.PRINCIPAL, Role.ADMIN].includes(user?.authority) ? (
                <Row justify={"space-between"}>
                  <Switch
                    checkedChildren="ACTIVE"
                    unCheckedChildren="INACTIVE"
                    checked={employeeData?.active}
                    onClick={async () => {
                      await modal.confirm({
                        title: "Terminate Employee ?",
                        content: (
                          <>
                            Are you sure to terminate <b>{employeeData?.name}</b> ?
                          </>
                        ),
                        onOk() {
                          terminateEmployee(employeeData.id).then(({ isSuccess }) => {
                            if (isSuccess) {
                              message.info(`${employeeData?.name} has been terminated.`)
                              navigate("/staffs")
                            }
                          })
                        },
                      })
                    }}
                  />
                  {[Role.ADMIN].includes(user?.authority) && (
                    <Tooltip title="Forgot Password">
                      <Button
                        icon={<IssuesCloseOutlined />}
                        type="link"
                        onClick={async () => {
                          await modal.confirm({
                            title: "Forgot Password ?",
                            content: (
                              <>
                                Are you sure to reset <b>{employeeData?.name}</b> password to default ?
                              </>
                            ),
                            onOk() {
                              forgotPassword(employeeData.id).then(
                                ({ isSuccess }) => isSuccess && message.info("Password reset to default.")
                              )
                            },
                          })
                        }}
                      />{" "}
                    </Tooltip>
                  )}
                </Row>
              ) : (
                <Badge
                  status={employeeData?.active ? "success" : "error"}
                  text={employeeData?.active ? "ACTIVE" : "INACTIVE"}
                />
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Address">{employeeData?.address}</Descriptions.Item>
            <Descriptions.Item label="Blood Group">{employeeData?.bloodGroup}</Descriptions.Item>

            <Descriptions.Item label="Religion">{employeeData?.religion}</Descriptions.Item>
            <Descriptions.Item label="Phone Number">
              <Space>
                {" "}
                <Switch
                  checkedChildren={<WhatsAppOutlined />}
                  unCheckedChildren={<WhatsAppOutlined />}
                  defaultChecked={employeeData?.whatsappAvailable}
                  disabled
                />
                {employeeData?.phoneNumber}
              </Space>
            </Descriptions.Item>
          </Descriptions>
          <Upload
            className="row"
            {...uploadProps()}
            fileList={[...employeeData.panCard, ...employeeData.aadhaarCard, ...employeeData.highestQualification]}
            listType="text"
          ></Upload>

          <Divider orientation="left" plain>
            {" "}
            <h3> Dependent Details </h3>{" "}
          </Divider>
          <Space direction="vertical" style={{ width: "100%" }} size={"small"}>
            {employeeData?.dependent.map((item) => {
              return (
                <>
                  <Descriptions bordered>
                    <Descriptions.Item label=" Name"> {item.name}</Descriptions.Item>
                    <Descriptions.Item label="Relation">{item.relationship}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">{item.contact}</Descriptions.Item>
                    <Descriptions.Item label=" Aadhaar Number"> {item.aadhaarNo}</Descriptions.Item>
                    <Descriptions.Item label="Occupation">{item.occupation}</Descriptions.Item>
                    <Descriptions.Item label="Qualification">{item.qualification}</Descriptions.Item>
                  </Descriptions>
                </>
              )
            })}
          </Space>

          {user?.authority && allowerRoles.includes(user?.authority) && (
            <>
              <Divider orientation="left" plain>
                {" "}
                <h3>Bank Details </h3>{" "}
              </Divider>
              <Descriptions bordered>
                <Descriptions.Item label="Account Number"> {employeeData?.bank?.accountNumber}</Descriptions.Item>
                <Descriptions.Item label="IFSC">{employeeData?.bank?.ifsc}</Descriptions.Item>
                <Descriptions.Item label="Bank Name">{employeeData?.bank?.bankName}</Descriptions.Item>
              </Descriptions>
            </>
          )}

          {user?.authority && allowerRoles.includes(user?.authority) && employeeData?.interview && (
            <>
              <Divider orientation="left" plain>
                {" "}
                <h3> Interview Details </h3>{" "}
              </Divider>
              <Descriptions bordered>
                <Descriptions.Item label=" Interviewed On">
                  {" "}
                  {dayjs(employeeData?.interview?.interviewDate).format("DD-MM-YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Joined On">
                  {employeeData?.interview?.doj && dayjs(employeeData?.interview?.doj).format("DD-MM-YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Salary">
                  {employeeData?.interview?.salary.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                    style: "currency",
                    currency: "INR",
                  })}
                </Descriptions.Item>
                <Descriptions.Item label="Comments">{employeeData?.interview?.comments}</Descriptions.Item>
              </Descriptions>
            </>
          )}
        </>
      )}
    </>
  )
}
