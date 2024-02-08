import { Button, Card, Col, List, Modal, Row, Select, Space, Typography, message } from "antd"
import { useEffect, useState } from "react"
import { Session } from "../shared/component/data/Session"
import { useAppSelector } from "../store"
import modal from "antd/es/modal"
import { Stock } from "../shared/component/reports/Stock"
import { ITransportCatalog } from "../shared/interface/ITransportCatalog"
import { useFetchAllTransportCatalogQuery } from "../shared/redux/api/feature/catalog/api"
import VirtualList from "rc-virtual-list"

export const Data = () => {
  const { selectedSession } = useAppSelector((app) => app.commonData)
  const { data: transport, isLoading } = useFetchAllTransportCatalogQuery(selectedSession.value, {
    skip: !selectedSession.value,
  })
  const { Text } = Typography

  return (
    <Row justify={"space-between"} gutter={[16, 16]}>
      <Col xs={24} md={17}>
        <Stock />
      </Col>
      <Col xs={24} md={6}>
        <Card loading={isLoading} bordered={false} title="Transport Fees">
          {transport && (
            <List>
              <VirtualList data={transport} height={300} itemKey="transportCatalog">
                {(item: ITransportCatalog, index) => (
                  <List.Item key={item.id} style={{ borderBlockEnd: 0 }}>
                    <div style={{ marginRight: "2vmin" }}>{index + 1}.</div>
                    <List.Item.Meta title={item.location} />
                    <Text type="success">
                      {item.amount.toLocaleString("en-IN", {
                        maximumFractionDigits: 1,
                        style: "currency",
                        currency: "INR",
                      })}
                    </Text>
                  </List.Item>
                )}
              </VirtualList>
            </List>
          )}
        </Card>
      </Col>
    </Row>
  )
}
