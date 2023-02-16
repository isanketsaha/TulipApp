import { Descriptions, Divider, Space, Switch } from "antd";
import dayjs from "dayjs";
import { useAppSelector } from "/src/store";
import { WhatsAppOutlined } from '@ant-design/icons';

interface IStudentConfirmProps {
    studentData: any
}
export const StudentConfirm = ({ studentData }: IStudentConfirmProps) => {


    const { bloodGroupList, sessionList } = useAppSelector(state => state.commonData);

    return (
        <><Descriptions bordered>
            <Descriptions.Item label="Name">{studentData?.name}</Descriptions.Item>
            <Descriptions.Item label="Phone Number">
                <Space> <Switch
                    checkedChildren={<WhatsAppOutlined />}
                    unCheckedChildren={<WhatsAppOutlined />}
                    defaultChecked={studentData?.whatsappAvailable}
                    disabled
                />  {studentData.contact} </Space>
            </Descriptions.Item>
            
            <Descriptions.Item label="Date Of Birth">{dayjs(studentData?.dob).format("DD-MM-YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Address">
                {studentData?.address}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">{studentData?.gender}</Descriptions.Item>
            <Descriptions.Item label="Classroom">{studentData?.std}</Descriptions.Item>
            <Descriptions.Item label="Session">{sessionList.find(item => (item.value == studentData?.session))?.label} </Descriptions.Item>

            <Descriptions.Item label="Blood Group">
                {bloodGroupList.find(item => (item.value == studentData?.bloodGroup))?.label}
            </Descriptions.Item>
            <Descriptions.Item label="Religion">
                {studentData?.religion}
            </Descriptions.Item>
            {studentData?.previousSchool && <Descriptions.Item label="Previous School">{studentData?.previousSchool}</Descriptions.Item>}
        </Descriptions><Divider> <h3>Guardian Details</h3></Divider><Space direction="vertical" style={{ width: '100%' }} size={"small"}>
                {studentData?.dependent.map((item: any) => {
                    return (
                        <Descriptions key={item.id} bordered>
                            <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
                            <Descriptions.Item label="Relation"> {item.relation}</Descriptions.Item>
                            <Descriptions.Item label="Contact"><Space> <Switch
                                checkedChildren={<WhatsAppOutlined />}
                                unCheckedChildren={<WhatsAppOutlined />}
                                defaultChecked={item?.whatsappAvailable}
                                disabled
                            />  {item.contact} </Space></Descriptions.Item>
                            <Descriptions.Item label="Qualification">{item.qualification}</Descriptions.Item>
                            <Descriptions.Item label="Aadhar Number"> {item.aadhaar}</Descriptions.Item>
                            <Descriptions.Item label="Occupation">{item.occupation}</Descriptions.Item>
                        </Descriptions>
                    );
                })}
            </Space></>)
}