import { Alert, Button, Card, Checkbox, Col, Descriptions, Divider, Form, List, Row, Select, Space, Table, Tabs, TabsProps } from "antd"
import { useFetchClassroomDetailsQuery, usePromoteStudentMutation } from "../redux/api/feature/classroom/api";
import { Link } from "react-router-dom";
import { IClassList } from "../interface/IClassList";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useEffect, useState } from "react";
import { useAppSelector } from "/src/store";


interface IClassDetailsProsp {
    stdList: IClassList,
}

export const ClassroomDetails = ({ stdList }: IClassDetailsProsp) => {
    const [promoteStudent, { isSuccess }] = usePromoteStudentMutation();
    const { data: classDetails } = useFetchClassroomDetailsQuery(stdList.id);
    const { sessionList, classList } = useAppSelector(app => app.commonData);
    const [selectedId, setSelectedId] = useState<number[]>([]);
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

    const onChange = (checkedValues: CheckboxValueType[]) => {
        console.log('checked = ', checkedValues);
        setSelectedId(checkedValues as number[])
    };

    const onPromote = (values: any) => {
        console.log('checked = ', selectedId, values);
        promoteStudent({
            ...values,
            studentId: selectedId
        })
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Summary`,
            children: <Space direction="vertical" style={{ width: '100%' }}><Card style={{ width: '100%' }}>
                <Descriptions bordered>
                    <Descriptions.Item label="Head Teacher">{classDetails?.headTeacher}</Descriptions.Item>
                    <Descriptions.Item label="Class Strength">{classDetails?.students.length}</Descriptions.Item>
                    <Descriptions.Item label="Session">{classDetails?.session}</Descriptions.Item>
                </Descriptions>

                <div hidden={selectedId.length < 1}>
                    <Divider />
                    <div hidden={!isSuccess} style={{ margin: ' 2vh 0' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Alert showIcon message="All selected students are Promoted." type="success" closable />
                        </Space>
                    </div>
                    <Form name={"promote"} onFinish={onPromote} autoComplete="off">
                        <Row>
                            <Col span={5} offset={1}>
                                <Form.Item label="Class"
                                    name="std" rules={[{ required: true }]}>
                                    <Select options={classList} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={5} offset={5}>
                                <Form.Item label="Session"
                                    name="sessionId" rules={[{ required: true }]}>
                                    <Select options={sessionList} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={2} offset={5}>
                                <Button type={"primary"} htmlType="submit"> Promote </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Card>

                <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
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
                                                <div hidden={!(import.meta.env.VITE_BASE_PROMOTE_WINDOW === 'enabled')} ><Checkbox value={item.id} /></div>
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
                </Checkbox.Group>
            </Space>
            ,
        },
        {
            key: '2',
            label: `Fees`,
            children: <Space direction="vertical" style={{ width: '100%' }} ><Table dataSource={classDetails?.feesCatalogs} size="small" columns={feesColumns} />
                <Table dataSource={classDetails?.productCatalogs} size="small" columns={productColumns} />
            </Space >,
        }
    ];

    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Tabs centered tabPosition={"right"} defaultActiveKey="1" items={items} />
                {/* <Card title="Student List" style={{ width: '100%' }}>
                </Card> */}
            </Space>
        </>
    )
}