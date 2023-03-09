import { Alert, Button, Card, Checkbox, Col, Descriptions, Divider, Form, List, Modal, Row, Select, Space, Table, Tabs, 
    TabsProps, Typography } from "antd"
import { useFetchClassroomDetailsQuery, usePromoteStudentMutation } from "../redux/api/feature/classroom/api";
import { Link } from "react-router-dom";
import { IClassList } from "../interface/IClassList";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useState } from "react";
import { useAppSelector } from "/src/store";
import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";
import { DownloadOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useExportStudentMutation } from "../redux/api/feature/exports/api";
import { Role } from "../utils/Role";

interface IClassDetailsProsp {
    stdList: IClassList,
}

export const ClassroomDetails = ({ stdList }: IClassDetailsProsp) => {
    const { confirm } = Modal;
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' })
    const { Text } = Typography;
    const [promoteStudent, { isSuccess }] = usePromoteStudentMutation();
    const [checkAll, setCheckAll] = useState(false);
    const { data: classDetails } = useFetchClassroomDetailsQuery(stdList.id);
    const { sessionList, classList } = useAppSelector(app => app.commonData);
    const { user } = useAppSelector(app => app.userAuth);
    const [selectedId, setSelectedId] = useState<number[]>([]);
    const [exportStudent] = useExportStudentMutation();
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
        setCheckAll(checkedValues.length === classDetails?.students.length);
    };

    const onCheckAllChange = (e: any) => {
        classDetails?.students && setSelectedId(e.target.checked ? classDetails?.students.map(_ => _.id) : []);
        setCheckAll(e.target.checked);
    };

    const onPromote = (values: any) => {
        console.log('checked = ', selectedId, values);
        promoteStudent({
            ...values,
            studentId: selectedId
        })
    }

    const showPromoteConfirm = (value: any) => {
        confirm({
            icon: <ExclamationCircleFilled />,
            title:`Promoting below student to Class ${value.std} 
            for ${sessionList.filter(item => item.value == value.sessionId).map(item => item.label)} session`,
            content: <List
                bordered
                
                dataSource={selectedId}
                renderItem={(item, name) => (
                    <List.Item>
                      {name+1}. <Typography.Text mark> {classDetails?.students.find(student => student.id == item)?.name}</Typography.Text>
                    </List.Item>
                )}
            />,
            okText: 'Yes',
            centered: true,
            okType: 'danger',
            cancelText: 'No',
            width: 600,
            autoFocusButton: "cancel",
            onOk() {
                onPromote(value)
            }
        });
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Summary`,
            children: <Space direction="vertical" style={{ width: '100%' }}><Card style={{ width: '100%' }}>
                <Descriptions bordered>
                    <Descriptions.Item label="Class Strength">{classDetails?.students.length}</Descriptions.Item>
                    <Descriptions.Item label="Session">{classDetails?.session}</Descriptions.Item>
                    <Descriptions.Item>{<Checkbox onChange={onCheckAllChange} checked={checkAll}>
                        Select All
                    </Checkbox>} </Descriptions.Item>
                </Descriptions>

                {user?.authority && [Role.ADMIN, Role.PRINCIPAL].includes(user?.authority) && import.meta.env.VITE_BASE_PROMOTE_WINDOW === 'enabled' &&
                    <div>
                        <Divider />
                        <div hidden={!isSuccess} style={{ margin: ' 2vh 0' }}>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <Alert showIcon message="All selected students are Promoted." type="success" closable />
                            </Space>
                        </div>
                        <Form name={"promote"} onFinish={showPromoteConfirm} autoComplete="off">
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
                    </div>}
            </Card>

                <Row>

                </Row>

                <Checkbox.Group style={{ width: '100%' }} value={selectedId} onChange={onChange}>
                    <Card style={{ width: '100%' }}>
                        <List
                            size="small"
                            header={selectedId.length > 0 && <Row justify="space-between" align={"middle"}>
                                <Col></Col>
                                <Col > <Text strong mark>{selectedId.length} Student Selected</Text></Col>
                                <Col > <Button shape="round" icon={<DownloadOutlined />} onClick={() => classDetails?.id && exportStudent(classDetails?.id)}>
                                    Export To Excel
                                </Button></Col>
                            </Row>}
                            itemLayout="horizontal"
                            dataSource={classDetails?.students}
                            renderItem={(item, index) => (

                                <List.Item>
                                    <List.Item.Meta
                                        title={<Row>
                                            <Col md={{ span: 2 }} xs={{ span: 0 }}>
                                                <Row> <div style={{ marginRight: '2vh' }} hidden={!(import.meta.env.VITE_BASE_PROMOTE_WINDOW === 'enabled')} ><Checkbox value={item.id} /></div>
                                                    {index + 1}. </Row>
                                            </Col>
                                            <Col md={{ span: 14 }}>
                                                {item.name}
                                            </Col>
                                            <Col md={{ span: 6 }} style={{ fontWeight: 'normal' }}>
                                                {item.pendingFees > 0 ? <Text type="danger">{item.pendingFees} Months dues</Text> :
                                                    <Text type="success"> No Pending dues</Text>}
                                            </Col>
                                        </Row>}
                                        description={<Row justify={"center"}>
                                            <Col md={{ span: 23 }} xs={{ span: 0 }}>
                                                <Space size={"small"}> <> Gender -  {item.gender} |</> <>  Birthday - {dayjs(item.dob).format("DD-MMM-YYYY")} |</> <> Contact - {item.phoneNumber}  </> </Space>
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
            children: <Space direction="vertical" style={{ width: '100%' }} >
                <Table dataSource={classDetails?.feesCatalogs} size="small" columns={feesColumns} />
                <Table dataSource={classDetails?.productCatalogs} size="small" columns={productColumns} />
            </Space >,
        }
    ];

    return (
        <>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Tabs destroyInactiveTabPane centered tabPosition={isTabletOrMobile ? "top" : "right"} defaultActiveKey="1" items={items} />
            </Space>
        </>
    )
}