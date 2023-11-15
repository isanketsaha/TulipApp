import { Card, Col, Divider, Row, Space } from "antd";
import dayjs from "dayjs";
import localeData from 'dayjs/plugin/localeData'
import isBetween from 'dayjs/plugin/isBetween';
import { useFetchFeesGraphQuery } from "../redux/api/feature/payment/api";
import { useFetchAllfeesCatalogQuery } from "../redux/api/feature/catalog/api";
import { FeesRuleType } from "../utils/FeesRuleType";

interface IFeesGraphProps {
  studentId: number
  classId: number | undefined
  transportService: boolean
}
export const FeesCalender = ({ studentId, classId, transportService }: IFeesGraphProps) => {
  dayjs.extend(isBetween)
  const { data } = useFetchFeesGraphQuery(
    {
      studentId,
      classId,
    },
    { skip: !classId }
  )

  const { data: feesCatalog } = useFetchAllfeesCatalogQuery({ classId: classId!, studentId }, { skip: !classId })

  dayjs.extend(localeData)
  const months = dayjs().localeData().monthsShort().slice(3, 12).concat(dayjs().localeData().monthsShort().slice(0, 3))

  const annualFees = feesCatalog?.filter((item) => item.applicableRule == FeesRuleType.Yearly)

  const gridStyle = (item: string) => {
    return {
      width: "8.33%",
      textAlign: "center",
      background: determineColor(item),
    }
  }

  const annualGridStyle = (item: number) => {
    return {
      textAlign: "center",
      background: determineColor(item),
    }
  }

  const determineColor = (month: string | number) => {
    if (data?.paidMonths?.includes(String(month)) || data?.annualFeesPaid?.includes(+month)) {
      return "lightgreen" //light green
    } else {
      return "lightyellow"
    }
  }

  return (
    <>
      <Divider>
        {" "}
        <h3>Fees </h3>
      </Divider>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Card>
          {annualFees?.map((_) => {
            return (
              <Card.Grid style={annualGridStyle(_.id) as React.CSSProperties} key={_.id}>
                {_.name}
              </Card.Grid>
            )
          })}
        </Card>
        <Card>
          {months.map((_) => {
            return (
              <Card.Grid style={gridStyle(_) as React.CSSProperties} key={_}>
                {_}
              </Card.Grid>
            )
          })}
        </Card>
        {transportService && (
          <>
            <Divider>
              {" "}
              <h3>Transport Fees </h3>
            </Divider>
            <Card>
              {months.map((_) => {
                return (
                  <Card.Grid style={gridStyle(_) as React.CSSProperties} key={_}>
                    {_}
                  </Card.Grid>
                )
              })}
            </Card>
          </>
        )}
      </Space>
    </>
  )
}