import { Descriptions, Badge, Calendar, Col, Radio, Row, Select, Typography, Space, Button, Divider } from "antd"
import dayjs, { Dayjs } from "dayjs";
import { IUserDetails } from "../interface/IUserDetails";
import { useSearchStudentQuery } from "../redux/api/feature/student/api";
import { CalendarMode } from "antd/es/calendar/generateCalendar";
import { FeesCalender } from "./FeesCalender";
import { Link } from "react-router-dom";
import { TransactionHistory } from "./TransactionHistory";
import { Error500 } from "/src/error/Error500";

interface IStudentViewProps {
    studentId: string
}

export const StudentViewDetails = ({ studentId }: IStudentViewProps) => {

    const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const { data: studentData, isFetching } = useSearchStudentQuery(studentId, { skip: studentId == "" });
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
                            <Badge status={studentData?.active ? "success" : "error"} text={studentData?.active ? "ACTIVE" : "INACTIVE"} />
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

                        <Descriptions.Item label="Classroom">{studentData?.classDetails?.std}</Descriptions.Item>
                        <Descriptions.Item label="Class Teacher">{studentData?.classDetails?.headTeacher}</Descriptions.Item>
                        <Descriptions.Item label="Previous School">{studentData?.religion}</Descriptions.Item>
                        <Descriptions.Item label="Session">{studentData?.classDetails?.session}</Descriptions.Item>
                        <Descriptions.Item label="Payment">
                            <Link to={`/payment/${studentData?.id}`}>
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
                    {studentData?.id && <FeesCalender studentId={studentData?.id} classId={studentData.classDetails?.id} />}
                    {studentData?.id && <TransactionHistory studentId={studentData?.id} />}
                </Space></>
            }
            {
                !studentData && !isFetching  && <Error500/>
            }
        </>
    )
}