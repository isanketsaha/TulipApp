import { MinusCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons"
import { Button, Col, Divider, Form, FormProps, Input, Row, Select, SelectProps, Space, Typography } from "antd"
import { StoreValue } from "antd/es/form/interface"
import { FC } from "react"
import { IFeesCatalog } from "../../interface/IFeesCatalog"
import { FeesRuleType } from "../../utils/FeesRuleType"

export const Fees: FC<FormProps & SelectProps & { fees?: Record<string, IFeesCatalog[]> }> = (props) => {
  const { form, fees } = props
  const { Text, Link } = Typography

  const feesListByClass = (name: string, parent: string) => {
    return (
      fees && (
        <Form.List
          name={["feesList", name]}
          initialValue={fees[name].map((item) => {
            return {
              label: item.name,
              price: item.amount,
              rule: item.applicableRule,
            }
          })}
        >
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field, name) => (
                <Row justify={"space-around"}>
                  <Col span={1} style={{ marginTop: 3 }}>
                    {name + 1}.
                  </Col>
                  <Col span={0} hidden={true}>
                    <Form.Item name={[name, "std"]}>
                      <Input value={parent} />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Form.Item name={[name, "label"]}>
                      <Input placeholder="label" />
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item name={[name, "price"]}>
                      <Input placeholder="price" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item name={[name, "rule"]}>
                      <Select
                        placeholder="Rule"
                        options={Object.keys(FeesRuleType).map((item) => {
                          return { value: item.toUpperCase(), label: item.toUpperCase() }
                        })}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    {fields.length > 1 ? (
                      <Button
                        type="link"
                        onClick={() => {
                          remove(name)
                        }}
                        icon={<MinusCircleTwoTone style={{ fontSize: "3vh" }} />}
                      />
                    ) : null}
                    <Button
                      type="link"
                      onClick={() => add()}
                      icon={<PlusCircleTwoTone style={{ fontSize: "3vh" }} />}
                    />
                  </Col>
                </Row>
              ))}
            </div>
          )}
        </Form.List>
      )
    )
  }

  const items = (name: string) => {
    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        {" "}
        {form?.getFieldValue("stdList")?.map((item: StoreValue) => {
          return (
            <Space direction="vertical" style={{ width: "100%" }}>
              {" "}
              <Divider>
                <Text strong>{item.label}</Text>
              </Divider>
              {feesListByClass(item.label, name)}
            </Space>
          )
        })}
      </Space>
    )
  }

  return <>{items(FeesRuleType.Monthly.toLocaleLowerCase())}</>
}
