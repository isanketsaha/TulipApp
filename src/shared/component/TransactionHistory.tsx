import { Avatar, Card, Col, Divider, List, Pagination, Row, Tag, Typography, message } from "antd"
import VirtualList from 'rc-virtual-list';
import { useState, useEffect } from "react";
import { IPageRequest } from "../interface/IPageRequest";
import { useFetchPaymentHistoryQuery } from "../redux/api/feature/payment/api";
import { IPayDetailsSummary } from "../interface/IPayDetailsSummary";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface TransactionHistoryProps {
  studentId: number
}

export const TransactionHistory = ({ studentId }: TransactionHistoryProps) => {


  const [page, setPage] = useState<number>(0);

  const { data } = useFetchPaymentHistoryQuery({
    page: page,
    data: studentId
  });

  return (<>
    {data && data.content.length > 0 &&

      <><Divider><h3>Purchase History</h3></Divider><Card>

        <List
          pagination={{
            simple: true,
            hideOnSinglePage: true,
            showTotal: (total, range) =>`${range[0]}-${range[1]} of ${total} items`,
            onChange: (page: number, pageSize: number) => { setPage(page - 1) },
            pageSize: data.size,
            total: data?.totalElements
          }}
        >

          <VirtualList
            data={data.content}
            itemKey="email"
          >
            {(item: IPayDetailsSummary, index) => (
              <List.Item actions={[<Link to={`/purchaseSummary/${item.paymentId}`}>Details</Link>]}>
                <List.Item.Meta
                  description={<Row>
                    <Col span={1}>{(index + 1) * (page + 1)}.</Col>
                    <Col span={4}>
                      {dayjs(item.paymentDateTime).format("DD-MM-YYYY")}
                    </Col>
                    <Col span={7}>

                      <Tag color={item?.payType == "FEES" ? "purple" : "volcano"}>  {item.payType}</Tag>
                    </Col>
                    <Col span={7}>
                      <Tag color={item?.paymentMode == "CASH" ? "green" : "cyan"}> {item?.paymentMode}</Tag>
                    </Col>
                  </Row>} />
                <div>
                  <Typography.Text mark>{item.total.toLocaleString('en-IN', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'INR'
                  })} </Typography.Text>
                </div>
              </List.Item>
            )}
          </VirtualList>
        </List>
      </Card></>
    }
  </>)
}