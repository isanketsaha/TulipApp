import { Col, Empty, List, Row, Tag, Typography } from "antd";
import { useFetchTransactionHistoryQuery } from "../../redux/api/feature/report/api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import VirtualList from 'rc-virtual-list';
import { IPayDetailsSummary } from "../../interface/IPayDetailsSummary";

interface ITransactionProps{

    transactionDate:Dayjs

}

export const TransactionReport = ({transactionDate}:ITransactionProps) => {
    
    const [totalCollection, setTotalCollection] = useState(0);
    const[pagination, setPagination] = useState<number>(0);
    const { data: transactionReport } = useFetchTransactionHistoryQuery({
        page : pagination,
        data : transactionDate.toDate().toString()
    });
    useEffect(() => {
        let total = 0;
        if (transactionReport?.content) {
            transactionReport.content.forEach((item: IPayDetailsSummary) => total += item.total)
        }
        setTotalCollection(total);
    }, [transactionReport])
    return (<>
        {transactionReport?.content && transactionReport?.content.length > 0 ? <List 
            header={totalCollection > 0 ? <Row><Col offset={17}><Typography.Text mark>{totalCollection.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            })} </Typography.Text></Col></Row> : null}
            bordered
            pagination={{
                simple:true,
                showTotal: (total, range) =>`${range[0]}-${range[1]} of ${total} items`,
                onChange: (page: number, pageSize: number) => {setPagination(page-1)},
                pageSize: transactionReport.size,
                hideOnSinglePage: true,
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
                            <Row key={index}>
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
            :
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"No recorded transactions."}/>
        }
    </>);
}