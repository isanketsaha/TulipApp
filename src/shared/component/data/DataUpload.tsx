import { Button, Col, Form, Row, Select, Space, Switch, Table, UploadFile } from "antd"
import { UploadFiles } from "../UploadFiles"
import { useFetchUploadOptionsQuery } from "../../redux/api/feature/common/api"
import { ColumnsType, TableProps } from "antd/es/table"
import { ITransactionReport } from "../../interface/ITransactionReport"
import { useAddMutation, useFetchAllQuery, useLazyFetchUrlQuery } from "../../redux/api/feature/data/api"
import { CheckCircleTwoTone, CloseCircleOutlined, DownloadOutlined } from "@ant-design/icons"
import dayjs, { Dayjs } from "dayjs"

export const DataUpload = () => {
  const { data: uploadOption } = useFetchUploadOptionsQuery()
  const [add] = useAddMutation()
  const { data: allFiles } = useFetchAllQuery("EXPENSE")
  const [fetchUrl] = useLazyFetchUrlQuery()

  const columns: ColumnsType<UploadFile> = [
    {
      title: "Date",
      width: 130,
      dataIndex: "lastModifiedDate",
      key: "age",
      fixed: "left",
      render: (value, record, index) => {
        return dayjs(value).format("MMMM D, YYYY h:mm A")
      },
    },
    {
      title: "File Name",
      width: 150,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "1",
      align: "center",
      width: 10,
      render: (value, record, index) => {
        return value == "done" ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <CloseCircleOutlined twoToneColor="#eb2f96" />
        )
      },
    },
    {
      title: "Type",
      dataIndex: "documentType",
      key: "2",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "2",
      width: 100,
      render: (_: any, record: UploadFile) => (
        <Space size="middle">
          <Button type="link" onClick={() => fetchUrl(record.response)}>
            <DownloadOutlined /> Download
          </Button>
        </Space>
      ),
    },
  ]

  const onSubmit = (item: { type: string; file: UploadFile[] }) => {
    console.log(item)
    add(item).then((res) => console.log(res))
  }

  const tableProps: TableProps<UploadFile> = {
    footer: () => {
      return (
        <Form onFinish={onSubmit}>
          <Row justify={"space-around"}>
            <Col span={4}>
              <Form.Item name={"type"} style={{ marginBottom: 0 }} rules={[{ required: true }]}>
                <Select style={{ width: "100%" }} options={uploadOption} />
              </Form.Item>
            </Col>

            <Col offset={1} span={16} className="parallel-with-upload">
              <UploadFiles name={"file"} rules={[{ required: true }]} allowedFieldType=".xlsx" />
            </Col>

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
      <Table<UploadFile> {...tableProps} dataSource={allFiles} columns={columns} />
    </>
  )
}
