import { Col, List, Row, Tag, Typography } from "antd";
import { useFetchTransactionHistoryQuery } from "../../redux/api/feature/report/api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import VirtualList from 'rc-virtual-list';
import { IPayDetailsSummary } from "../../interface/IPayDetailsSummary";


export const TransactionReport = () => {

    const { data: transactionReport } = useFetchTransactionHistoryQuery();
    const [totalCollection, setTotalCollection] = useState(0);
    const[pagination, setPagination] = useState<number>();
    useEffect(() => {
        let total = 0;
        if (transactionReport?.content) {
            transactionReport.content.forEach((item: IPayDetailsSummary) => total += item.total)
        }
        setTotalCollection(total);
    }, [transactionReport])
    return (<>
        {transactionReport && <List
            header={totalCollection > 0 ? <Row><Col offset={17}><Typography.Text mark>{totalCollection.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            })} </Typography.Text></Col></Row> : null}
            bordered
            pagination={{
                onChange: (page: number, pageSize: number) => {setPagination(page-1)},
                pageSize: 5,
                total: transactionReport.totalElements
              }}
           >
            <VirtualList
            height={200}
            fullHeight={false}
            data={transactionReport.content}
            itemKey="email"
          >
            {(item: IPayDetailsSummary, index) => (
                <List.Item key={index} actions={[<Link to={`/purchaseSummary/${item.paymentId}`}>Details</Link>]}>
                    <List.Item.Meta key={index}
                        description={
                            <Row >
                                <Col span={1}>
                                    {index + 1}
                                </Col>
                                <Col span={6}>
                                    {dayjs(item.paymentDateTime).format('MMM D, YYYY h:mm A')}
                                </Col>
                                <Col span={5}>

                                   { item.payType !='EXPENSE' ? <Link to={`studentDetails/${item.studentId}`}>{item.studentName}</Link> : item.paymentReceivedBy}
                                </Col>
                                <Col span={3} offset={1}>
                                    <Tag color={item?.payType == "FEES" ? "purple" : "volcano"}>{item.payType}</Tag>
                                </Col>
                                <Col span={2}>
                                    <Tag color={item?.paymentMode == "CASH" ? "green" : "cyan"}> {item.paymentMode} </Tag>
                                </Col>
                                <Col span={5} >
                                    {
                                    item.total.toLocaleString('en-IN', {
                                        maximumFractionDigits: 2,
                                        style: 'currency',
                                        currency: 'INR'
                                    })}
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