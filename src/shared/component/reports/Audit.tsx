import { List, Row, Col, Typography, Tag, Button, Card, Empty } from "antd"
import dayjs from "dayjs"
import { useFetchAuditQuery, useUpdateResolvedMutation } from "../../redux/api/feature/audit/api"

import VirtualList from 'rc-virtual-list';
import { IAudit } from "../../interface/IAudit"
import { useState } from "react"


export const Audit = () => {
    const [pagination, setPagination] = useState<number>(0);
    const [updateResolved] = useUpdateResolvedMutation();
    const { data } = useFetchAuditQuery(pagination);
    const { Text } = Typography;
    return (
        <>
            {data?.content && data.content.length > 0 ?
                <List
                    bordered
                    pagination={{
                        onChange: (page: number, pageSize: number) => { setPagination(page - 1) },
                        pageSize: data.size,
                        hideOnSinglePage: true,
                        showTotal: (total, range) =>`${range[0]}-${range[1]} of ${total} items`,
                        simple: true,
                        total: data?.totalElements,
                    }}
                >
                    <VirtualList
                        height={500}
                        fullHeight={false}
                        data={data?.content}
                        itemKey="email"
                    >
                        {(item: IAudit, index) => (
                            <List.Item key={index}>
                                <List.Item.Meta
                                    description={
                                        <Card>
                                        <Row justify={"space-between"}>
                                            <Col span={1} >
                                                {(index + 1) }.
                                            </Col>
                                            <Col span={4}>
                                                {dayjs(item.dateTime).format('DD-MM-YYYY hh:mm a')}
                                            </Col>
                                            <Col span={2}>
                                                <Tag color="red">  {item.type}</Tag>
                                            </Col>
                                            <Col span={3}>
                                                <Text type="warning"> {item.status} </Text>
                                            </Col>
                                            <Col span={4}>
                                                {item.endpoint}
                                            </Col>
                                            <Col span={7}>
                                                {item.description}
                                            </Col>
                                            <Col span={2}>
                                               <Button onClick={() => updateResolved(item.id)}> Resolved </Button>
                                            </Col>
                                        </Row>
                                        </Card>
                                    }
                                >

                                </List.Item.Meta>
                            </List.Item>
                        )}
                    </VirtualList>

                </List> :
                
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"No recorded errors."}/>
            }
        </>
    )
}