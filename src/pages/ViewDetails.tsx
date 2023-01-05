import { useLocation, useParams } from "react-router-dom";
import { StudentViewDetails } from "../shared/component/StudentViewDetails";
import { useState, useEffect } from "react";
import { useSearchEmployeeByIdQuery } from "../shared/redux/api/feature/employee/api";
import { useSearchStudentQuery } from "../shared/redux/api/feature/student/api";
import { EmployeeViewDetails } from "../shared/component/EmployeeViewDetails";

export const ViewDetails = () => {

    const { id } = useParams();
    const { pathname } = useLocation();
    const path: string[] = pathname.split('/');
    const [employeeId, setEmployeeId] = useState<string>("");
    const [studentId, setStudentId] = useState<string>("");

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
            {studentId != "" && <StudentViewDetails studentId={studentId} />}
            {employeeId != "" && <EmployeeViewDetails employeeId={employeeId} />}
        </>
    )
}