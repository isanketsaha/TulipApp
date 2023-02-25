import { Descriptions, Divider, Space, Switch, Typography } from "antd";
import dayjs from "dayjs";
import { useAppSelector } from "/src/store";
import { WhatsAppOutlined } from '@ant-design/icons';

interface IStudentConfirmProps {
    studentData: any,
    editedData: any,
}
export const StudentConfirm = ({ studentData, editedData }: IStudentConfirmProps) => {
    const { Text } = Typography;
    const { bloodGroupList, sessionList } = useAppSelector(state => state.commonData);
    const editFlow = Object.keys(editedData).length > 1;
    return (
        <><Descriptions bordered>
            <Descriptions.Item label="Name"> {editFlow && editedData.hasOwnProperty('name')
                ? <Text mark>{studentData?.name}</Text> : studentData?.name}</Descriptions.Item>
            <Descriptions.Item label="Phone Number">
                <Space> <Switch
                    checkedChildren={<WhatsAppOutlined />}
                    unCheckedChildren={<WhatsAppOutlined />}
                    defaultChecked={studentData?.whatsappAvailable}
                    disabled
                />  {editFlow && editedData.hasOwnProperty('contact')
                    ? <Text mark>{studentData.contact} </Text> : studentData.contact} </Space>
            </Descriptions.Item>

            <Descriptions.Item label="Date Of Birth">{editFlow && editedData.hasOwnProperty('dob')
                ? <Text mark>{dayjs(studentData?.dob).format("DD-MM-YYYY")}</Text> : dayjs(studentData?.dob).format("DD-MM-YYYY")} </Descriptions.Item>
            <Descriptions.Item label="Address">{editFlow && editedData.hasOwnProperty('address')
                ? <Text mark>{studentData?.address} </Text> : studentData?.address}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">{editFlow && editedData.hasOwnProperty('gender')
                ? <Text mark>{studentData?.gender}</Text> : studentData?.gender} </Descriptions.Item>
            <Descriptions.Item label="Classroom">{editFlow && editedData.hasOwnProperty('std')
                ? <Text mark>{studentData?.std} </Text> : studentData?.std}</Descriptions.Item>
            <Descriptions.Item label="Session">{editFlow && sessionList.find(item => (item.value == studentData?.session))?.label} </Descriptions.Item>

            <Descriptions.Item label="Blood Group">
                {editFlow && editedData.hasOwnProperty('bloodGroup')
                    ? <Text mark> {bloodGroupList.find(item => (item.value == studentData?.bloodGroup))?.label}</Text> :
                    bloodGroupList.find(item => (item.value == studentData?.bloodGroup))?.label}
            </Descriptions.Item>
            <Descriptions.Item label="Religion">
                {editFlow && editedData.hasOwnProperty('religion')
                    ? <Text mark>
                        {studentData?.religion}</Text> : studentData?.religion}
            </Descriptions.Item>
            {studentData?.previousSchool && <Descriptions.Item label="Previous School">
                {editFlow && editedData.hasOwnProperty('previousSchool')
                    ? <Text mark>{studentData?.previousSchool}</Text> : studentData?.previousSchool}</Descriptions.Item>}
        </Descriptions><Divider> <h3>Guardian Details</h3></Divider><Space direction="vertical" style={{ width: '100%' }} size={"small"}>
                {studentData?.dependent.map((item: any, index: number) => {
                    return (
                        <Descriptions key={item.id} bordered>
                            <Descriptions.Item label="Name">{editFlow && editedData.hasOwnProperty('dependent')
                                && editedData.dependent[index]?.hasOwnProperty('name')
                                ? <Text mark>{item.name}</Text> : item.name}</Descriptions.Item>
                            <Descriptions.Item label="Relation"> {editFlow && editedData.hasOwnProperty('dependent')
                                && editedData.dependent[index]?.hasOwnProperty('relation')
                                ? <Text mark>{item.relation}</Text> : item.relation}</Descriptions.Item>
                            <Descriptions.Item label="Contact"><Space> <Switch
                                checkedChildren={<WhatsAppOutlined />}
                                unCheckedChildren={<WhatsAppOutlined />}
                                defaultChecked={item?.whatsappAvailable}
                                disabled
                            /> {editFlow && editedData?.hasOwnProperty('dependent')
                                && editedData.dependent[index]?.hasOwnProperty('contact')
                                ? <Text mark>{item.contact} </Text> : item.contact}</Space></Descriptions.Item>
                            <Descriptions.Item label="Qualification">{editFlow && editedData.hasOwnProperty('dependent')
                                && editedData.dependent[index]?.hasOwnProperty('qualification')
                                ? <Text mark>{item.qualification} </Text> : item.qualification}</Descriptions.Item>
                            <Descriptions.Item label="Aadhar Number">{editFlow && editedData.hasOwnProperty('dependent')
                                && editedData.dependent[index]?.hasOwnProperty('aadhaar')
                                ? <Text mark> {item.aadhaar}</Text> : item.aadhaar}</Descriptions.Item>
                            <Descriptions.Item label="Occupation">{editFlow && editedData.hasOwnProperty('dependent')
                                && editedData.dependent[index]?.hasOwnProperty('occupation')
                                ? <Text mark>{item.occupation}</Text> : item.occupation}</Descriptions.Item>
                        </Descriptions>
                    );
                })}
            </Space></>)
}