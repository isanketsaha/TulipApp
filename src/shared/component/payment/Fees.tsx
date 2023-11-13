import { Button, Col, DatePicker, Form, FormInstance, Input, InputNumber, Row, Select, Space, Typography } from "antd"
import { InfoCircleOutlined, MinusCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons"
import { Dayjs } from "dayjs"
import { useEffect, useState } from "react"
import { useFetchAllfeesCatalogQuery } from "../../redux/api/feature/catalog/api"
import { FeesRuleType } from "../../utils/FeesRuleType"

interface IFeesPros {
  form: FormInstance
  classId: number
  studentId: number
  calculate: boolean
  duesAmount: number
  calculatePriceBreakDown: (subTotal: number, dueAmount: number) => void
}

export const Fees = ({ form, classId, studentId, calculate, duesAmount, calculatePriceBreakDown }: IFeesPros) => {
  const { Text } = Typography

  const { data: feesCatalog } = useFetchAllfeesCatalogQuery({ classId, studentId })

  const [selectedFees, addSelectedFees] = useState<number[]>([])

  useEffect(() => {
    if (calculate || duesAmount) {
      calculateTotal()
    }
  }, [calculate, duesAmount])
  const fetchFeeRows = () => {
    const fields = form.getFieldsValue()
    const { feeItem } = fields
    return feeItem
  }
  const onMonthSelection = (date: Dayjs, rowKey: number, inputType: string) => {
    const input = date.get("month")
    const feeItem = fetchFeeRows()
    const currentFees = feeItem[rowKey]
    if (inputType == "to" && currentFees.from) {
      const monthNumber = date.diff(currentFees.from, "month")
      // const monthNumber = input - currentFees.from.get('month');
      calculateAmount(rowKey, monthNumber + 1)
    } else if (inputType == "from" && currentFees.to) {
      const monthNumber = date.diff(currentFees.to, "month")
      // const monthNumber = currentFees.to.get('month') - input;
      calculateAmount(rowKey, monthNumber + 1)
    }
  }

  const calculateAmount = (rowKey: number, monthNumber: number) => {
    const feeItem = fetchFeeRows()
    const currentFees = feeItem[rowKey]
    const selectedFees = feesCatalog?.find((item) => item.id === currentFees.feesId)

    if (monthNumber > 0) {
      feeItem[rowKey] = {
        ...feeItem[rowKey],
        feesTitle: selectedFees?.name,
        rule: selectedFees?.applicableRule,
        unitPrice: selectedFees?.amount.toLocaleString("en-IN", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        }),
        amount:
          selectedFees?.applicableRule.toUpperCase() == "Monthly".toUpperCase()
            ? (monthNumber * (selectedFees?.amount ? selectedFees?.amount : 0)).toLocaleString("en-IN", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "INR",
              })
            : selectedFees?.amount.toLocaleString("en-IN", {
                maximumFractionDigits: 2,
                style: "currency",
                currency: "INR",
              }),
      }
      form.setFieldsValue({ feeItem: [...feeItem] })
      calculateTotal()
    }
  }

  const onSelectFees = (elementId: number, rowKey: number) => {
    const feeItem = fetchFeeRows()
    const selectedFees = feesCatalog?.find((item) => item.id === elementId)

    feeItem[rowKey] = {
      feesTitle: selectedFees?.name,
      feesId: elementId,
      type: selectedFees?.type,
      rule: selectedFees?.applicableRule,
      unitPrice: selectedFees?.amount.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        style: "currency",
        currency: "INR",
      }),
      amount: selectedFees?.amount.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        style: "currency",
        currency: "INR",
      }),
    }
    form.setFieldsValue({ feeItem: [...feeItem] })
    calculateTotal()
    selectedFees?.name && addSelectedFees((oldArray) => [...oldArray, selectedFees?.id])
  }

  const calculateTotal = () => {
    let total = 0
    let subTotal = 0
    fetchFeeRows().map((item: any) => {
      if (item?.amount) {
        const amount: number = Number(item.amount.replace(/[^0-9-]+/g, "")) / 100
        total += amount
      }
    })
    subTotal = total
    const fields = form.getFieldsValue()
    const { dueOpted } = fields
    const { dueInfo } = fields
    if (dueOpted == true) {
      if (total >= dueInfo[0].dueAmount) {
        total = total - dueInfo[0].dueAmount
      } else {
        form.setFields([
          {
            name: ["total"],
            errors: ["Due Amount is greater than total."],
          },
        ])
      }
    }
    form.setFieldsValue({
      total: total.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        style: "currency",
        currency: "INR",
      }),
    })
    calculatePriceBreakDown(subTotal, dueOpted && subTotal >= dueInfo[0]?.dueAmount ? -dueInfo[0].dueAmount : 0)
  }

  const disableDate = (currentDate: Dayjs, rowKey: number) => {
    const feeItem = fetchFeeRows()
    const currentFees = feeItem[rowKey]

    if (currentFees.from) {
      return currentDate.isBefore(currentFees.from)
    }
    return true
  }

  const filterListConstruct = (rowKey: number) => {
    const feeItem = fetchFeeRows()
    const id = feeItem[rowKey].feesId
    const fees = selectedFees?.filter((item) => {
      return item !== id
    })
    addSelectedFees([...fees])
  }
  const filteredOptions = feesCatalog?.filter((catalog) => !selectedFees.includes(catalog.id))

  return (
    <>
      <Form.List name="feeItem">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Space direction="vertical" key={key} style={{ width: "100%" }}>
                <div key={key}>
                  <Row justify={"space-between"}>
                    <Col span={1}>{name + 1}.</Col>
                    <Col span={6}>
                      <Form.Item name={[name, "feesTitle"]} rules={[{ required: true }]}>
                        <Select
                          placeholder="Select Fees"
                          notFoundContent={null}
                          onSelect={(e) => onSelectFees(e, name)}
                          options={filteredOptions?.map((d) => ({
                            value: d.id,
                            label: (
                              <>
                                <Row>{d.name}</Row>
                                {d.description && (
                                  <Text type="secondary" style={{ fontSize: 11 }}>
                                    <InfoCircleOutlined style={{ marginRight: "1vmin" }} />
                                    {d.description?.toUpperCase()}
                                  </Text>
                                )}
                              </>
                            ),
                          }))}
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col hidden={true}>
                      <Form.Item name={[name, "feesId"]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col hidden={true}>
                      <Form.Item name={[name, "type"]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col hidden={true}>
                      <Form.Item name={[name, "rule"]}>
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={4}>
                      <Form.Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.from !== curValues.from}>
                        {({ getFieldValue }) => {
                          return (
                            getFieldValue(["feeItem", name, "rule"]) === FeesRuleType.Monthly && (
                              <Form.Item name={[name, "from"]} rules={[{ required: true }]}>
                                <DatePicker
                                  format="MMM-YYYY"
                                  placeholder="From Date"
                                  onSelect={(value) => onMonthSelection(value, name, "from")}
                                  picker="month"
                                />
                              </Form.Item>
                            )
                          )
                        }}
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.from !== curValues.from}>
                        {({ getFieldValue }) => {
                          return (
                            getFieldValue(["feeItem", name, "rule"]) === FeesRuleType.Monthly && (
                              <Form.Item name={[name, "to"]} rules={[{ required: true }]}>
                                <DatePicker
                                  format="MMM-YYYY"
                                  picker="month"
                                  placeholder="To Date"
                                  onSelect={(value) => onMonthSelection(value, name, "to")}
                                  disabledDate={(value) => disableDate(value, name)}
                                />
                              </Form.Item>
                            )
                          )
                        }}
                      </Form.Item>
                    </Col>

                    <Col span={3}>
                      <Form.Item name={[name, "unitPrice"]} rules={[{ required: true }]}>
                        <InputNumber
                          min={1}
                          max={10000}
                          placeholder="Unit Price"
                          controls={false}
                          disabled={true}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Form.Item name={[name, "amount"]} rules={[{ required: true }]}>
                        <InputNumber controls={false} placeholder="Amount" disabled={true} style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Space>
                        {fields.length > 1 ? (
                          <Button
                            type="link"
                            onClick={() => {
                              filterListConstruct(name)
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
                </div>
              </Space>
            ))}
          </>
        )}
      </Form.List>
    </>
  )
}