import { Button, Col, Form, FormInstance, Input, InputNumber, Row, Select, Space, Upload, message } from "antd"
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { useAppSelector } from "/src/store";
import { allowedFieldType, uploadProps } from "/src/configs/UploadConfig";
import { UploadOutlined } from '@ant-design/icons';
import { useAddExpenseMutation } from "../redux/api/feature/payment/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Role } from "../utils/Role"

export const AddExpense = () => {
  const { user } = useAppSelector((state) => state.userAuth)
  const [form] = Form.useForm()
  const [isExpenseSubmitted, setIsExpenseSubmitted] = useState(false)
  const selectList = useAppSelector((state) => state.commonData)
  const [addExpense] = useAddExpenseMutation()
  let navigate = useNavigate()
  const getFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const onExpenseSubmit = () => {
    setIsExpenseSubmitted(true)
    const payload = form.getFieldsValue()
    let expense = {
      ...payload,
      total: Number(payload.total.replace(/[^0-9-]+/g, "")) / 100,
    }
    console.log(expense)
    addExpense(expense).then((id: any) => {
      if (id.data) {
        navigate(`/purchaseSummary/${id.data}`)
      } else {
        message.error("Error while creating Expense.")
        setIsExpenseSubmitted(false)
      }
    })
  }

  const calculateTotal = (): void => {
    let total = 0
    const { expenseItem } = form.getFieldsValue()
    expenseItem.map((item: any) => {
      if (item.amount) {
        const amount: number = Number(item.amount)
        total += amount
      }
    })
    form.setFieldsValue({
      total: total.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        style: "currency",
        currency: "INR",
      }),
    })
  }

  const calcAmount = (rowKey: number) => {
    const { expenseItem } = form.getFieldsValue()
    const item = expenseItem[rowKey]
    if (item && item.unitPrice && item.unitPrice > 0 && item.qty && item.qty > 0) {
      expenseItem[rowKey] = {
        ...expenseItem[rowKey],
        amount: item.unitPrice * item.qty,
      }
      form.setFieldsValue({ expenseItem: [...expenseItem] })
      calculateTotal()
    }
  }

  return (
    <>
      <Form
        form={form}
        preserve={true}
        style={{ marginTop: "3vh" }}
        name="expense-form"
        size="large"
        initialValues={{ expenseItem: [{}] }}
        onFinish={onExpenseSubmit}
      >
        <Form.List name="expenseItem">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space direction="vertical" key={key} style={{ width: "100%" }}>
                  <Row justify={"space-around"}>
                    <div style={{ marginTop: "1vmin" }}>{name + 1}.</div>
                    <Col span={5}>
                      <Form.Item name={[name, "itemName"]} rules={[{ required: true, message: "Provide Item Name" }]}>
                        <Input placeholder="Item Name" style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col span={5}>
                      <Form.Item name={[name, "category"]} rules={[{ required: true, message: "Select a Category" }]}>
                        <Select
                          showSearch
                          clearIcon
                          placeholder="Select Category"
                          options={selectList.expenseCategoryOptions}
                        ></Select>
                      </Form.Item>
                    </Col>

                    <Col span={3}>
                      <Form.Item name={[name, "unitPrice"]} rules={[{ required: true, message: "Provide amount" }]}>
                        <InputNumber
                          placeholder="Unit Price"
                          min={1}
                          controls={false}
                          style={{ width: "100%" }}
                          onBlur={(value) => calcAmount(name)}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={2}>
                      <Form.Item name={[name, "qty"]} rules={[{ required: true, message: "Enter Quantity" }]}>
                        <InputNumber
                          placeholder="Quantity"
                          min={1}
                          controls={false}
                          style={{ width: "100%" }}
                          onBlur={(value) => calcAmount(name)}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={3}>
                      <Form.Item name={[name, "amount"]} rules={[{ required: true }]}>
                        <InputNumber disabled placeholder="Amount" min={1} controls={false} style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col span={2}>
                      <Space>
                        {fields.length > 1 ? (
                          <Button
                            type="link"
                            onClick={() => {
                              remove(name)
                              calculateTotal()
                            }}
                            icon={<MinusCircleTwoTone style={{ fontSize: "3vh" }} />}
                          />
                        ) : null}
                        <Button
                          type="link"
                          onClick={() => add()}
                          icon={<PlusCircleTwoTone style={{ fontSize: "3vh" }} />}
                        />
                      </Space>
                    </Col>
                  </Row>
                </Space>
              ))}
            </>
          )}
        </Form.List>
        <Row justify={"space-between"}>
          <Col span={5}>
            <Form.Item label="Payment Mode" name={"paymentMode"} rules={[{ required: true }]}>
              <Select
                style={{ width: "100%" }}
                options={[
                  { value: "CASH", label: "CASH" },
                  { value: "BANK", label: "BANK" },
                  ...(user?.authority && [Role.ADMIN].includes(user?.authority)
                    ? [{ value: "NOT_PAID", label: "NOT PAID" }]
                    : []),
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item name={"comments"}>
              <Input placeholder="Comments" />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item name={"receivedBy"} rules={[{ required: true, message: "Receiver name is required" }]}>
              <Input placeholder="Received By" />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item name={"expenseDocs"} getValueFromEvent={getFile}>
              <Upload
                {...uploadProps()}
                showUploadList={true}
                listType="text"
                name="documents"
                accept={allowedFieldType}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item name={"total"} rules={[{ required: true, message: "Total is required" }]}>
              <Input placeholder="Total" disabled style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Button htmlType={"submit"} disabled={isExpenseSubmitted} style={{ width: "100%" }} type={"primary"}>
              Confirm
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}