import { Descriptions, Badge } from "antd"
import dayjs from "dayjs";
import { IUserDetails } from "../interface/IUserDetails";
import { useSearchStudentQuery } from "../redux/api/feature/student/api";

interface IStudentViewProps {
    studentId: string  
}

export const StudentViewDetails = ({studentId} : IStudentViewProps ) => {
   

    const { data: studentData } = useSearchStudentQuery(studentId, { skip: studentId == "" });
    return (
        <>
            <Descriptions title="Student Info" bordered>
                <Descriptions.Item label="Student ID"> {studentData?.id}</Descriptions.Item>
                <Descriptions.Item label="Name">{studentData?.name}</Descriptions.Item>
                <Descriptions.Item label="Gender">{studentData?.gender}</Descriptions.Item>
                <Descriptions.Item label="Date Of Birth">{dayjs(studentData?.dob).format("DD/MM/YYYY")}</Descriptions.Item>
                <Descriptions.Item label="Admission On" span={1}>
                    {dayjs(studentData?.dob).format("DD/MM/YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Active" span={1}>
                    <Badge status={studentData?.active ? "success" : "error"} text={studentData?.active? "ACTIVE" : "INACTIVE"} />
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