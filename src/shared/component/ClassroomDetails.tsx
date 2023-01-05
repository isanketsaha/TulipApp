import { Avatar, Card, Descriptions, List, Space } from "antd"
import { IClassDetails } from "../interface/IClassDetails"
import { IBasicDetails } from "../interface/IBasicDetails"
import { useFetchStudentListQuery } from "../redux/api/feature/classroom/api";
import { Link } from "react-router-dom";

interface IClassDetailsProsp {
    classDetails: IClassDetails,
}

export const ClassroomDetails = ({ classDetails }: IClassDetailsProsp) => {

    const { data: studentList } = useFetchStudentListQuery(classDetails.id);
    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Card title="Basic Details" style={{ width: '100%' }}>
                    <Descriptions >
                        <Descriptions.Item label="Head Teacher">{classDetails?.headTeacher}</Descriptions.Item>
                        <Descriptions.Item label="Class Strength">{classDetails?.studentStrength}</Descriptions.Item>
                        <Descriptions.Item label="Session">{classDetails?.session}</Descriptions.Item>
                    </Descriptions>
                </Card>

                <Card title="Student List" style={{ width: '100%' }}>
                    <List
                        size="small"
                        itemLayout="horizontal"
                        dataSource={studentList}
                        renderItem={(item, index) => (
                            <List.Item>

                                <List.Item.Meta
                                    title={`${index+1}. ${item.name}`}
                                    description={item.gender}
                                />
                                <div><Link to={`../studentDetails/${item.id}`}>Details</Link></div>
                            </List.Item>
                        )}
                    />
            </Card>

        </Space>
        </>
    )
}