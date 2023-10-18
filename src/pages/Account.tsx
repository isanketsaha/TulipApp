import { DownloadOutlined } from "@ant-design/icons"
import { Button, Col, DatePicker, Row, Space, Tabs, TabsProps } from "antd"
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import { Bar } from "react-chartjs-2"
import { Audit } from "../shared/component/reports/Audit"
import { FinanceReport } from "../shared/component/reports/FinanceReport"
import { Projections } from "../shared/component/reports/Projections"
import { Stock } from "../shared/component/reports/Stock"
import { useFetchTransactionReportQuery } from "../shared/redux/api/feature/account/api"
import { useTransactionDownloadMutation } from "../shared/redux/api/feature/exports/api"

export const Accounts = () => {
  const { RangePicker } = DatePicker
  const [transactionDownload] = useTransactionDownloadMutation()
  const [selectedTransactionMonth, setSelectedTransactionMonth] = useState<string[]>([])
  const [selectedRange, setSelectedRange] = useState<Dayjs[]>([
    dayjs(new Date()).startOf("month").add(-3, "month").startOf("month"),
    dayjs(new Date()),
  ])

  const { data: financeReportData } = useFetchTransactionReportQuery({
    fromDate: selectedRange[0].format("DD-MM-YYYY"),
    toDate: selectedRange[1].endOf("month").format("DD-MM-YYYY"),
    groupByType: "MONTHLY",
  })
  const transactionData = {
    labels: financeReportData?.reportList?.map((item) => dayjs(item.transactionDate).format("MMM-YYYY")),
    datasets: [
      {
        label: "Fees",
        data: financeReportData?.reportList?.map((item) => item.fees),
        backgroundColor: "#82B4E1",
      },
      {
        label: "Purchase",
        data: financeReportData?.reportList?.map((item) => item.purchase),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  }

  const graphOption = (title: string) => {
    return {
      indexAxis: "x" as const,
      filler: {
        propagate: false, // To disable the default behavior of filling under the line
      },
      elements: {
        bar: {
          borderWidth: 1,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: true,
          fillStyle: "red",
          labels: {
            color: "black",
            usePointStyle: true,
          },
          position: "top" as const,
        },
        title: {
          display: true,
          text: title,
        },
      },
      redraw: true,
      tooltip: {
        mode: "index",
        intersect: false,
      },
    }
  }

  const tabList: TabsProps["items"] = [
    {
      key: "1",
      label: "Transaction",
      children: <FinanceReport selectedTransactionMonth={setSelectedTransactionMonth} selectedRange={selectedRange} />,
    },
    {
      key: "2",
      label: "Audit",
      children: <Audit />,
    },
  ]
  const disabledDate = (current: Dayjs) => {
    return current && current > dayjs().endOf("day") // Disable future dates
  }

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }} size={"large"}>
        <Row justify={"space-between"} align={"bottom"}>
          <Col span={11}>
            <Projections />
          </Col>
          <Col span={11}>
            <Bar options={graphOption("Monthly Transaction")} data={transactionData} />
          </Col>
        </Row>

        <Row>
          <Tabs
            style={{ width: "100%" }}
            size="large"
            defaultActiveKey="1"
            tabBarExtraContent={
              <Row justify={"space-evenly"}>
                <Col>
                  <Button
                    disabled={selectedTransactionMonth.length == 0}
                    onClick={() => transactionDownload(selectedTransactionMonth)}
                    icon={<DownloadOutlined />}
                  >
                    Export To Excel
                  </Button>
                </Col>

                <Col>
                  {" "}
                  <RangePicker
                    picker="month"
                    disabledDate={disabledDate}
                    allowClear={false}
                    onCalendarChange={(val: null | (Dayjs | null)[]) =>
                      val && setSelectedRange(val.filter(Boolean) as Dayjs[])
                    }
                    format={"MMM-YYYY"}
                    defaultValue={[selectedRange[0], selectedRange[1]]}
                  />{" "}
                </Col>
              </Row>
            }
            items={tabList}
          />
        </Row>
      </Space>
    </>
  )
}
