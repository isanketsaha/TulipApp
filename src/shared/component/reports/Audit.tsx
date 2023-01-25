import { List, Row, Col, Typography, Tag } from "antd"
import dayjs from "dayjs"
import { useFetchAuditQuery } from "../../redux/api/feature/audit/api"

import VirtualList from 'rc-virtual-list';
import { IAudit } from "../../interface/IAudit"
import { useState } from "react"


export const Audit = () => {
    const [pagination, setPagination] = useState<number>(0);
    const { data } = useFetchAuditQuery(pagination);
    const { Text } = Typography;
    return (
        <>
            {data?.content &&
                <List
                    bordered
                    extra={"Hello"}
                    pagination={{
                        onChange: (page: number, pageSize: number) => { setPagination(page - 1) },
                        pageSize: 5,
                        simple: true,
                        total: data?.totalElements,
                        showTotal: (total) => `Total ${total} items`
                    }}
                >
                    <VirtualList
                        height={300}
                        fullHeight={false}
                        data={data?.content}
                        itemKey="email"
                    >
                        {(item: IAudit, index) => (
                            <List.Item key={index}>
                                <List.Item.Meta
                                    description={
                                        <Row >
                                            <Col span={1} >
                                                {(index + 1) }.
                                            </Col>
                                            <Col span={6} offset={1}>
                                                {dayjs(item.dateTime).format('DD/MM/YYYY hh:mm a')}
                                            </Col>
                                            <Col span={5}>
                                                <Tag color="red">  {item.type}</Tag>
                                            </Col>
                                            <Col span={3}>
                                                <Text type="warning"> {item.status} </Text>
                                            </Col>
                                            <Col span={8}>
                                                {item.endpoint}
                                            </Col>
                                        </Row>
                                    }
                                >

                                </List.Item.Meta>
                            </List.Item>
                        )}
                    </VirtualList>

                </List>
            }
        </>
    )
}