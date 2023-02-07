import { Descriptions, Badge,  Space, Button, Divider, Switch, Modal } from "antd"
import dayjs from "dayjs";
import { useDeactivateStudentMutation, useSearchStudentQuery } from "../redux/api/feature/student/api";
import { FeesCalender } from "./FeesCalender";
import { Link } from "react-router-dom";
import { TransactionHistory } from "./TransactionHistory";
import { Error500 } from "/src/error/Error500";
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useAppSelector } from "/src/store";
import { Role } from "/src/Role";

interface IStudentViewProps {
    studentId: string
}

export const StudentViewDetails = ({ studentId }: IStudentViewProps) => {

    const { user } = useAppSelector(state => state.userAuth);
    const [sessionIndex, setSessionIndex] = useState<number>(0);
    const [open, setOpen] = useState(false);

    const { data: studentData, isFetching } = useSearchStudentQuery(studentId, { skip: studentId == "" });
    const [deactivateStudent] = useDeactivateStudentMutation();

  


    return (
        <>
            {studentData &&
                <><Divider> <h3>Student Detail</h3></Divider><Space direction="vertical" style={{ width: '100%' }} size={"small"}>
                    <Descriptions bordered>
                        <Descriptions.Item label="Student ID"> {studentData?.id}</Descriptions.Item>
                        <Descriptions.Item label="Name">{studentData?.name}</Descriptions.Item>
                        <Descriptions.Item label="Gender">{studentData?.gender}</Descriptions.Item>
                        <Descriptions.Item label="Date Of Birth">{dayjs(studentData?.dob).format("DD/MM/YYYY")}</Descriptions.Item>
                        <Descriptions.Item label="Admission On" span={1}>
                            {dayjs(studentData?.admissionDate).format("DD/MM/YYYY")}
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
                            {studentData?.phoneNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Classroom">{studentData?.classDetails[sessionIndex]?.std}</Descriptions.Item>
                        <Descriptions.Item label="Class Teacher">{studentData?.classDetails[sessionIndex]?.headTeacher}</Descriptions.Item>
                        <Descriptions.Item label="Previous School">{studentData?.previousSchool}</Descriptions.Item>
                        <Descriptions.Item label="Session"> {studentData?.classDetails.length > 1 && !(studentData?.classDetails.length == sessionIndex + 1) && <Button onClick={() => setSessionIndex(sessionIndex + 1)} type="link" icon={<CaretLeftOutlined />} />}{studentData?.classDetails[sessionIndex]?.session} {studentData?.classDetails.length > 1 && !(sessionIndex == 0) && <Button onClick={() => setSessionIndex(sessionIndex - 1)} type="link" icon={<CaretRightOutlined />} />}</Descriptions.Item>
                        <Descriptions.Item label="Payment">
                            <Link to={`/payment/${studentData?.id}/${studentData?.classDetails[sessionIndex]?.id}`}>
                                <Button type="primary">
                                    Pay
                                </Button>
                            </Link>
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider> <h3>Guardian Details</h3></Divider>
                    <Space direction="vertical" style={{ width: '100%' }} size={"small"}>
                        {studentData?.dependent.map(item => {
                            return (
                                <Descriptions key={item.id} bordered>
                                    <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
                                    <Descriptions.Item label="Relation"> {item.relationship}</Descriptions.Item>
                                    <Descriptions.Item label="Contact">{item.contact}</Descriptions.Item>
                                </Descriptions>
                            );
                        })}
                    </Space>
                    {studentData?.id && <FeesCalender studentId={studentData?.id} classId={studentData.classDetails[sessionIndex]?.id} />}
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
                onOk={() =>  deactivateStudent(studentId).then(data => setOpen(false))}
                onCancel={() => setOpen(false)}
            >
                <b>{studentData?.name}</b> will be removed from School. Are you sure ?
            </Modal>
        </>
    )
}