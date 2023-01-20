import { Avatar, Card, Col, Divider, List, Pagination, Row, Tag, message } from "antd"
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
    <Divider><h3>Purchase History</h3></Divider>
    <Row>
      <Col offset={18} span={6}>
        <Pagination defaultCurrent={page} onChange={setPage} total={data?.totalElements} showTotal={(total) => `Total ${total} `} />
      </Col>
    </Row>
    <Card>

      {data && <List>

        <VirtualList
          data={data.content}
          height={300}
          itemHeight={47}
          itemKey="email"
        >
          {(item: IPayDetailsSummary, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                description={
                  <Row>
                    <Col span={4}>
                    {dayjs(item.paymentDateTime).format("DD/MM/YYYY")}
                    </Col>
                    <Col span ={7}>
                   
                    <Tag color={item?.payType == "FEES" ? "purple" : "volcano"}>  {item.payType}</Tag>
                    </Col>
                    <Col span={7}>
                    <Tag color={item?.paymentMode == "CASH" ? "green" : "cyan"}> {item?.paymentMode}</Tag>
                    </Col>
                    
                    <Col span={3}>
                {item.total}
                </Col>
                  </Row>

                }
              />
              <div>
                <Link to={`/purchaseSummary/${item.paymentId}`}>Details</Link>
                </div>
            </List.Item>
          )}
        </VirtualList>
      </List>}
    </Card>
  </>)
}