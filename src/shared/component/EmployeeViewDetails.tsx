import { Descriptions, Badge, Divider, Space, Switch } from "antd";
import dayjs from "dayjs";
import { useSearchEmployeeByIdQuery } from "../redux/api/feature/employee/api";
import { WhatsAppOutlined } from '@ant-design/icons';
import { useAppSelector } from "/src/store";
import { Role } from "../utils/Role";

interface IEmployeeProps {
    employeeId: string
}
export const EmployeeViewDetails = ({ employeeId }: IEmployeeProps) => {

const {user} = useAppSelector(state => state.userAuth);
const allowerRoles: Role[] = [Role.ADMIN, Role.PRINCIPAL];
    const { data: employeeData } = useSearchEmployeeByIdQuery(employeeId, { skip: employeeId == "" });
    return (<>

        <Divider orientation="center" plain><h3> {employeeData?.name} </h3></Divider>

        <Descriptions bordered>
            <Descriptions.Item label="Employee ID"> {employeeData?.id}</Descriptions.Item>
            <Descriptions.Item label="Gender">{employeeData?.gender}</Descriptions.Item>
            <Descriptions.Item label="Date Of Birth">{dayjs(employeeData?.dob).format("DD-MM-YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Joined On" span={1}>
                {employeeData?.interview.doj ? dayjs(employeeData?.interview.doj).format("DD-MM-YYYY") : 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Active" span={1}>
                <Badge status={employeeData?.active ? "success" : "error"} text={employeeData?.active ? "ACTIVE" : "INACTIVE"} />
            </Descriptions.Item>

            <Descriptions.Item label="Address">
                {employeeData?.address}
            </Descriptions.Item>
            <Descriptions.Item label="Blood Group">
                {employeeData?.bloodGroup}
            </Descriptions.Item>

            <Descriptions.Item label="Religion">
                {employeeData?.religion}
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number">
            <Space> <Switch
                    checkedChildren={<WhatsAppOutlined />}
                    unCheckedChildren={<WhatsAppOutlined />}
                    defaultChecked={employeeData?.whatsappAvailable}
                    disabled
                /> 
                {employeeData?.phoneNumber}
                </Space>
            </Descriptions.Item>
        </Descriptions>


        <Divider orientation="left" plain> <h3> Dependent Details </h3> </Divider>
        <Space direction="vertical" style={{ width: '100%' }} size={"small"}>
            {
                employeeData?.dependent.map(item => {
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


        {
        user?.authority && allowerRoles.includes(user?.authority) && 
        <><Divider orientation="left" plain> <h3>Bank Details </h3> </Divider><Descriptions bordered>
            <Descriptions.Item label="Account Number"> {employeeData?.bank?.accountNumber}</Descriptions.Item>
            <Descriptions.Item label="IFSC">{employeeData?.bank?.ifsc}</Descriptions.Item>
            <Descriptions.Item label="Bank Name">{employeeData?.bank?.bankName}</Descriptions.Item>
        </Descriptions></>
        }

        {user?.authority && allowerRoles.includes(user?.authority) && employeeData?.interview &&  
            <><Divider orientation="left" plain> <h3> Interview Details </h3> </Divider><Descriptions bordered>
            <Descriptions.Item label=" Interviewed On"> {dayjs(employeeData?.interview?.interviewDate).format("DD-MM-YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Joined On">{dayjs(employeeData?.interview?.doj).format("DD-MM-YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Salary">{employeeData?.interview?.salary}</Descriptions.Item>
            <Descriptions.Item label="Comments">{employeeData?.interview?.comments}</Descriptions.Item>
        </Descriptions></>
        }
    </>)
}