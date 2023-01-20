import { Descriptions, Badge, Divider, Space } from "antd";
import dayjs from "dayjs";
import { useSearchEmployeeByIdQuery } from "../redux/api/feature/employee/api";

interface IEmployeeProps {
    employeeId: string
}
export const EmployeeViewDetails = ({ employeeId }: IEmployeeProps) => {


    const { data: employeeDataData } = useSearchEmployeeByIdQuery(employeeId, { skip: employeeId == "" });
    return (<>

        <Divider orientation="left" plain><h3> Basic Details </h3></Divider>

        <Descriptions >
            <Descriptions.Item label="Employee ID"> {employeeDataData?.id}</Descriptions.Item>
            <Descriptions.Item label="Name">{employeeDataData?.name}</Descriptions.Item>
            <Descriptions.Item label="Gender">{employeeDataData?.gender}</Descriptions.Item>
            <Descriptions.Item label="Date Of Birth">{dayjs(employeeDataData?.dob).format("DD/MM/YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Joined On" span={1}>
                {employeeDataData?.interview.doj ? dayjs(employeeDataData?.interview.doj).format("DD/MM/YYYY") : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Active" span={1}>
                <Badge status={employeeDataData?.active ? "success" : "error"} text={employeeDataData?.active ? "ACTIVE" : "INACTIVE"} />
            </Descriptions.Item>

            <Descriptions.Item label="Address">
                {employeeDataData?.address}
            </Descriptions.Item>
            <Descriptions.Item label="Blood Group">
                {employeeDataData?.bloodGroup}
            </Descriptions.Item>

            <Descriptions.Item label="Religion">
                {employeeDataData?.religion}
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number">
                {employeeDataData?.phoneNumber}
            </Descriptions.Item>
        </Descriptions>


        <Divider orientation="left" plain> <h3> Dependent Details </h3> </Divider>
        <Space direction="vertical" style={{ width: '100%' }} size={"small"}>
            {
                employeeDataData?.dependent.map(item => {
                    return (<>
                        <Descriptions bordered>
                            <Descriptions.Item label=" Name"> {item.name}</Descriptions.Item>
                            <Descriptions.Item label="Relation">{item.relationship}</Descriptions.Item>
                            <Descriptions.Item label="Phone Number">{item.contact}</Descriptions.Item>
                            <Descriptions.Item label=" Aadhaar Number"> {item.aadhaarNo}</Descriptions.Item>
                            <Descriptions.Item label="Occupation">{item.occupation}</Descriptions.Item>
                            <Descriptions.Item label="Qualification">{item.qualification}</Descriptions.Item>
                        </Descriptions>
                    </>);
                })
            }
        </Space>


        <Divider orientation="left" plain> <h3>Bank Details </h3> </Divider>

        <Descriptions bordered>
            <Descriptions.Item label="Account Number"> {employeeDataData?.bank?.accountNumber}</Descriptions.Item>
            <Descriptions.Item label="IFSC">{employeeDataData?.bank?.ifsc}</Descriptions.Item>
            <Descriptions.Item label="Bank Name">{employeeDataData?.bank?.bankName}</Descriptions.Item>
        </Descriptions>

        <Divider orientation="left" plain> <h3> Interview Details </h3> </Divider>
        {employeeDataData?.interview && <Descriptions bordered>
            <Descriptions.Item label=" Interviewed On"> {dayjs(employeeDataData?.interview?.interviewDate).format("DD/MM/YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Joined On">{dayjs(employeeDataData?.interview?.doj).format("DD/MM/YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Salary">{employeeDataData?.interview?.salary}</Descriptions.Item>
            <Descriptions.Item label="Comments">{employeeDataData?.interview?.comments}</Descriptions.Item>
        </Descriptions>
        }

    </>)
}