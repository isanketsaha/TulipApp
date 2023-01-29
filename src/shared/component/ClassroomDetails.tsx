import { Card, Col, Descriptions, Divider, List, Row, Space, Table, Tabs, TabsProps } from "antd"
import { useFetchClassroomDetailsQuery } from "../redux/api/feature/classroom/api";
import { Link } from "react-router-dom";
import { IClassList } from "../interface/IClassList";

interface IClassDetailsProsp {
    stdList: IClassList,
}

export const ClassroomDetails = ({ stdList }: IClassDetailsProsp) => {

    const { data: classDetails } = useFetchClassroomDetailsQuery(stdList.id);

    const feesColumns = [
        {
            title: 'Fees',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Type',
            dataIndex: 'applicableRule',
            key: 'applicableRule',
        },
    ];

    const productColumns = [
        {
            title: 'Product',
            dataIndex: 'itemName',
            key: 'itemName',
        },
        {
            title: 'Amount',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Type',
            dataIndex: 'applicableRule',
            key: 'applicableRule',
        }
    ];

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Summary`,
            children: <Space  direction="vertical" style={{ width: '100%' }}><Card style={{ width: '100%' }}>
                <Descriptions>
                    <Descriptions.Item label="Head Teacher">{classDetails?.headTeacher}</Descriptions.Item>
                    <Descriptions.Item label="Class Strength">{classDetails?.students.length}</Descriptions.Item>
                    <Descriptions.Item label="Session">{classDetails?.session}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Card style={{ width: '100%' }}>
            <List
                    size="small"
                    itemLayout="horizontal"
                    dataSource={classDetails?.students}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<Row>
                                    <Col span={1}>
                                        {index + 1}
                                    </Col>
                                    <Col>
                                        {item.name}
                                    </Col>
                                </Row>}
                                description={<Row>
                                    <Col offset={1}>
                                        {item.gender}
                                    </Col>
                                </Row>} />
                            <div><Link to={`../studentDetails/${item.id}`}>Details</Link></div>
                        </List.Item>
                    )} />
                    </Card>
                    </Space>
            ,
        },
        {
            key: '2',
            label: `Fees`,
            children: <Space direction="vertical"  style={{ width: '100%' }} ><Table dataSource={classDetails?.feesCatalogs} size="small" columns={feesColumns} />
                <Table dataSource={classDetails?.productCatalogs} size="small" columns={productColumns} />
            </Space >,
        }
    ];

    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Tabs centered  tabPosition={"right"} defaultActiveKey="1" items={items} />
                {/* <Card title="Student List" style={{ width: '100%' }}>
                </Card> */}
            </Space>
        </>
    )
}