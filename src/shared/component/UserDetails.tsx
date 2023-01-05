import { Descriptions, Badge } from "antd"
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSearchStudentQuery } from "../redux/api/feature/student/api";
import { useSearchEmployeeByIdQuery } from "../redux/api/feature/employee/api";
import dayjs from "dayjs";

export const UserDetails = () => {
    const { id } = useParams();
    const { pathname } = useLocation();
    const path: string[] = pathname.split('/');
    const [employeeId, setEmployeeId] = useState<string>("");
    const [studentId, setStudentId] = useState<string>("");
    const { data: studentData } = useSearchStudentQuery(studentId, { skip: studentId == "" });
    const { data: employeeDataData } = useSearchEmployeeByIdQuery(employeeId, { skip: employeeId == "" });

    useEffect(() => {
        if (path.includes('employeeDetails') && id) {
            setEmployeeId(id)
        }
        else if (path.includes('studentDetails') && id) {
            setStudentId(id);
        }
    }, [])
    return (
        <>
            <Descriptions title={path.includes('studentDetails') ? "Student Info" : "Employee Info"} bordered>
                <Descriptions.Item label="Student ID"> {studentData?.id}</Descriptions.Item>
                <Descriptions.Item label="Name">{studentData?.name}</Descriptions.Item>
                <Descriptions.Item label="Gender">{studentData?.gender}</Descriptions.Item>
                <Descriptions.Item label="Date Of Birth">{dayjs(studentData?.dob).format("DD/MM/YYYY")}</Descriptions.Item>
                <Descriptions.Item label="Admission On" span={1}>
                    {dayjs(studentData?.dob).format("DD/MM/YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Active" span={1}>
                    <Badge status={studentData?.active ? "success" : "error"} text={studentData?.active} />
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
                <Descriptions.Item label="Session">{studentData?.classDetails?.session}</Descriptions.Item>
            </Descriptions>
        </>
    )
}