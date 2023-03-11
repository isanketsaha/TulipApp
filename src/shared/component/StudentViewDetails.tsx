import { Descriptions, Badge, Space, Button, Divider, Switch, Modal, Row, notification, Upload, Select } from "antd"
import dayjs from "dayjs";
import { useDeactivateStudentMutation, useSearchStudentQuery } from "../redux/api/feature/student/api";
import { FeesCalender } from "./FeesCalender";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TransactionHistory } from "./TransactionHistory";
import { Error500 } from "/src/error/Error500";
import { CaretLeftOutlined, CaretRightOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useAppSelector } from "/src/store";
import { Role } from "../utils/Role";
import { WhatsAppOutlined, EditOutlined, PrinterOutlined } from '@ant-design/icons';
import { useMediaQuery } from "react-responsive";
import { uploadProps } from "/src/configs/UploadConfig";


interface IStudentViewProps {
    studentId: string
}

export const StudentViewDetails = ({ studentId }: IStudentViewProps) => {
    const { confirm } = Modal;
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const { user } = useAppSelector(state => state.userAuth);
    const [sessionId, setSessionId] = useState<number>();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { data: studentData, isFetching } = useSearchStudentQuery(studentId, { skip: studentId == "" });
    const [deactivateStudent] = useDeactivateStudentMutation();
    useEffect(() => {
        setSessionId(studentData?.classDetails[0]?.sessionId)
    }, [studentData]);
    const showEditConfirm = () => {
        confirm({
            title: `Are you sure to edit details of ${studentData?.name}  ?`,
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            centered: true,
            okType: 'danger',
            cancelText: 'No',
            width: 600,
            autoFocusButton: "cancel",
            onOk() {
                setTimeout(() => navigate(`/edit/${studentData?.id}`, { replace: true, state: { type: 'student' } }), 300);
                ;
            }
        });
    };

    const selectedSession = () => {
        return studentData?.classDetails.find(item => item.sessionId == sessionId);
    }

    return (
        <>
            {studentData &&
                <>
                    <Row justify={"end"}>
                        <Space size={"large"}>
                            {/* <Button icon={<PrinterOutlined />} type="text">Admission Letter</Button> */}
                            <Button icon={<EditOutlined />} type="text"
                                onClick={showEditConfirm}>
                                Edit Details
                            </Button>
                        </Space></Row>
                    <Divider style={{ marginTop: '-2vh' }}> <h3>Student Detail</h3></Divider><Space direction="vertical" style={{ width: '100%' }} size={"small"}>

                        <Descriptions bordered>
                            <Descriptions.Item label="Student ID"> <Space size={"large"}> {studentData?.id} </Space></Descriptions.Item>
                            <Descriptions.Item label="Name">{studentData?.name}</Descriptions.Item>
                            <Descriptions.Item label="Gender">{studentData?.gender}</Descriptions.Item>
                            <Descriptions.Item label="Date Of Birth">{dayjs(studentData?.dob).format("DD-MM-YYYY")}</Descriptions.Item>
                            <Descriptions.Item label="Admission On" span={1}>
                                {dayjs(studentData?.admissionDate).format("DD-MM-YYYY")}
                            </Descriptions.Item>
                            <Descriptions.Item label="Active" span={1}>
                                {user?.authority && [Role.PRINCIPAL].includes(user?.authority) ?
                                    <Switch checkedChildren="ACTIVE" unCheckedChildren="INACTIVE" checked={studentData?.active} onClick={(checked) => setOpen(!checked)} />
                                    : <Badge status={studentData?.active ? "success" : "error"} text={studentData?.active ? "ACTIVE" : "INACTIVE"} />
                                }
                            </Descriptions.Item>
                            <Descriptions.Item label="Address">
                                {studentData?.address}
                            </Descriptions.Item>
                            <Descriptions.Item label="Blood Group">
                                {studentData?.bloodGroup}
                            </Descriptions.Item>
                            <Descriptions.Item label="Religion">
                                {studentData?.religion}
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone Number">
                                <Space> <Switch
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
                            <Descriptions.Item label="Evening Class">{
                            <Badge status={studentData?.eveningClass ? "success" : "error"} text={studentData?.eveningClass ? "Opted" : "Not-Opted"} />}</Descriptions.Item>
                            {/* <Descriptions.Item label="Session"> {studentData?.classDetails.length > 1 && !(studentData?.classDetails.length == sessionIndex + 1) &&
                                <Button onClick={() => setSessionIndex(sessionIndex + 1)} type="link" icon={<CaretLeftOutlined />} />}
                                {studentData?.classDetails[sessionIndex]?.session} {studentData?.classDetails.length > 1
                                    && !(sessionIndex == 0) &&
                                    <Button onClick={() => setSessionIndex(sessionIndex - 1)} type="link" icon={<CaretRightOutlined />} />}</Descriptions.Item> */}
                            <Descriptions.Item label="Session">{studentData?.classDetails.length > 1 ?
                                <Select
                                    bordered={false}
                                    onSelect={setSessionId}
                                    defaultValue={studentData?.classDetails[0]?.sessionId}
                                    style={{ width: '20vmin' }}

                                    options={studentData?.classDetails.map(item => {
                                        return {
                                            label: item.session,
                                            value: item.sessionId
                                        }
                                    })}
                                />
                                : studentData?.classDetails[0]?.session}  </Descriptions.Item>
                            {isMobile ? null :
                                <Descriptions.Item >
                                    <Link to={`/payment/${studentData?.id}/${selectedSession()?.id}`}>
                                        <Button type="primary">
                                            Payment
                                        </Button>

                                    </Link>
                                </Descriptions.Item>
                            }
                            <Descriptions.Item label="Birth Certificate">{<Upload {...uploadProps}
                                fileList={studentData.birthCertificate}
                                listType="text" ></Upload>}</Descriptions.Item>
                            <Descriptions.Item label="Aadhaar Card">{<Upload {...uploadProps}
                                fileList={studentData.aadhaarCard}
                                listType="text" ></Upload>}</Descriptions.Item>

                        </Descriptions>

                        <Divider> <h3>Guardian Details</h3></Divider>
                        <Space direction="vertical" style={{ width: '100%' }} size={"small"}>
                            {studentData?.dependent.map(item => {
                                return (
                                    <Descriptions key={item.id} bordered>
                                        <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
                                        <Descriptions.Item label="Relation"> {item.relationship}</Descriptions.Item>
                                        <Descriptions.Item label="Contact">  <Space> <Switch
                                            checkedChildren={<WhatsAppOutlined />}
                                            unCheckedChildren={<WhatsAppOutlined />}
                                            defaultChecked={item?.whatsappAvailable}
                                            disabled
                                        /> {item.contact} </Space></Descriptions.Item>
                                        <Descriptions.Item label=" Aadhaar Number"> {item.aadhaarNo}</Descriptions.Item>
                                        <Descriptions.Item label="Occupation">{item.occupation}</Descriptions.Item>
                                        <Descriptions.Item label="Qualification">{item.qualification}</Descriptions.Item>
                                        <Descriptions.Item label="Aadhaar Document">
                                            <Upload {...uploadProps}
                                                fileList={item.aadhaarCard}
                                                listType="text" ></Upload>
                                        </Descriptions.Item>
                                    </Descriptions>
                                );
                            })}
                        </Space>

                        {studentData?.id  && selectedSession() && <FeesCalender studentId={studentData?.id} classId={selectedSession()?.id } />}
                        {studentData?.id && <TransactionHistory studentId={studentData?.id} />}
                    </Space></>
            }
            {
                !studentData && !isFetching && <Error500 />
            }
            <Modal
                centered
                open={open}
                okText={"Confirm"}
                onOk={() => deactivateStudent(studentId).then(data => setOpen(false))}
                onCancel={() => setOpen(false)}
            >
                <b>{studentData?.name}</b> will be removed from School. Are you sure ?
            </Modal>
        </>
    )
}