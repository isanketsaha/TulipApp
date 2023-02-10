import { Descriptions, Divider, Space, Switch } from "antd";
import dayjs from "dayjs";
import { useAppSelector } from "/src/store";

import { WhatsAppOutlined } from '@ant-design/icons';


interface IEmployeeConfirmProps {
    employeeData: any
}
export const ExployeeConfirm = ({ employeeData }: IEmployeeConfirmProps) => {

    const { bloodGroupList, sessionList } = useAppSelector(state => state.commonData);

    return (<>
        <Space direction="vertical" style={{ width: '100%' }}>

            <Descriptions bordered>
                <Descriptions.Item label="Name">{employeeData?.name}</Descriptions.Item>
                <Descriptions.Item label="Gender">{employeeData?.gender}</Descriptions.Item>
                <Descriptions.Item label="Date Of Birth">{dayjs(employeeData?.dob).format("DD/MM/YYYY")}</Descriptions.Item>

                <Descriptions.Item label="Address">
                    {employeeData?.address}
                </Descriptions.Item>

                <Descriptions.Item label="Phone Number">
                    <Space> <Switch
                        checkedChildren={<WhatsAppOutlined />}
                        unCheckedChildren={<WhatsAppOutlined />}
                        defaultChecked={employeeData?.whatsappAvailable}
                        disabled
                    />  {employeeData?.contact} </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Blood Group">
                    {bloodGroupList.find(item => (item.value == employeeData?.bloodGroup))?.label}
                </Descriptions.Item>
                <Descriptions.Item label="Experince">
                    {employeeData?.experince}
                </Descriptions.Item>

                <Descriptions.Item label="Qualification">
                    {employeeData?.qualification}
                </Descriptions.Item>
                <Descriptions.Item label="Aadhar">
                    {employeeData?.aadhaar}
                </Descriptions.Item>

                <Descriptions.Item label="Religion">
                    {employeeData?.religion}
                </Descriptions.Item>
            </Descriptions>

            <Space direction="vertical" style={{ width: '100%' }} size={"small"}>
                {
                    employeeData?.dependent.map((item: any) => {
                        return (<>
                            <Descriptions bordered>
                                <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
                                <Descriptions.Item label="Relation"> {item.relation}</Descriptions.Item>
                                <Descriptions.Item label="Contact"> <Space> <Switch
                                    checkedChildren={<WhatsAppOutlined />}
                                    unCheckedChildren={<WhatsAppOutlined />}
                                    defaultChecked={item?.whatsappAvailable}
                                    disabled
                                />  {item.contact} </Space></Descriptions.Item>
                                <Descriptions.Item label="Qualification">{item.qualification}</Descriptions.Item>
                                <Descriptions.Item label="Aadhar Number"> {item.aadhaar}</Descriptions.Item>
                                <Descriptions.Item label="Occupation">{item.occupation}</Descriptions.Item>
                            </Descriptions>
                        </>);
                    })
                }
            </Space>

            <Descriptions bordered>
            <Descriptions.Item label="Joined On">{dayjs(employeeData?.interview?.doj).format("DD/MM/YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Salary">{employeeData?.interview?.salary}</Descriptions.Item>
            <Descriptions.Item label="Role">{employeeData?.interview?.role}</Descriptions.Item>
            </Descriptions>

            <Descriptions bordered>
                <Descriptions.Item label="Account Number"> {employeeData?.bank?.accountNumber}</Descriptions.Item>
                <Descriptions.Item label="IFSC">{employeeData?.bank?.ifsc}</Descriptions.Item>
                <Descriptions.Item label="Bank Name">{employeeData?.bank?.bankName}</Descriptions.Item>
            </Descriptions>
        </Space>
    </>)
}