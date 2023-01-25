import { List, Row, Col, Tag, Typography } from "antd"
import VirtualList from 'rc-virtual-list';
import { useFetchInventoryReportQuery } from "../../redux/api/feature/report/api";
import { IStockReport } from "../../interface/IStockReport";


export const Stock = () => {

    const { data } = useFetchInventoryReportQuery();
    const { Text } = Typography;
    return (
        <>
            {data &&
                <List
                    bordered

                >
                    <VirtualList
                        height={200}
                        fullHeight={false}
                        data={data}
                        itemKey="email"
                    >
                        {(item: IStockReport, index) => (
                            <List.Item key={index}>
                                <List.Item.Meta
                                    description={
                                        <Row >
                                            <Col span={1} >
                                                {(index + 1)}.
                                            </Col>
                                            <Col span={4} offset={1}>
                                                {item.product.itemName}
                                            </Col>
                                            <Col span={4}>
                                                {item.lowStock ? <Tag color="red">  {item.availableQty}</Tag> : <Tag color="blue">  {item.availableQty}</Tag>}
                                            </Col>
                                            <Col span={3}>
                                                {item.product.size ? item.product.size : item.product.std ? item.product.std : 'N/A'}

                                            </Col>
                                            <Col span={4}>
                                            <Tag color="pink"> {item.product.type} </Tag>
                                            </Col>
                                            <Col span={4}>
                                             {item.vendor} 
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


        </>);
}