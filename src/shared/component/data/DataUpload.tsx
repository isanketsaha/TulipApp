import { Button, Col, Form, Row, Select, Space, Switch, Table } from "antd"
import { UploadFiles } from "../UploadFiles"
import { useFetchUploadOptionsQuery } from "../../redux/api/feature/common/api"
import { ColumnsType, TableProps } from "antd/es/table"
import { ITransactionReport } from "../../interface/ITransactionReport"

export const DataUpload = () => {
  const { data: uploadOption } = useFetchUploadOptionsQuery()

  const columns: ColumnsType<ITransactionReport> = [
    {
      title: "File Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Date",
      width: 100,
      dataIndex: "date",
      key: "age",
      fixed: "left",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "1",
      width: 150,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "2",
      width: 150,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "2",
      width: 150,
    },
  ]
  const tableProps: TableProps<ITransactionReport> = {
    footer: () => {
      return (
        <Form>
          <Row justify={"space-around"}>
            <Col span={4}>
              <Form.Item name={"type"} style={{ marginBottom: 0 }} rules={[{ required: true }]}>
                <Select style={{ width: "100%" }} options={uploadOption} />
              </Form.Item>
            </Col>
            <Form.Item name={"file"} style={{ marginBottom: 0 }} rules={[{ required: true }]}>
              <Col offset={1} span={16} className="parallel-with-upload">
                <UploadFiles allowedFieldType=".xlsx" />
              </Col>
            </Form.Item>
            <Col span={2} style={{ marginBottom: 0 }}>
              <Button htmlType="submit">Upload</Button>
            </Col>
          </Row>
        </Form>
      )
    },
  }
  return (
    <>
      <Table {...tableProps} columns={columns} />
    </>
  )
}
