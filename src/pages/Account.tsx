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
import { useFetchAllClassroomQuery } from "../shared/redux/api/feature/classroom/api"
import { useTransactionDownloadMutation } from "../shared/redux/api/feature/exports/api"
import { useAppSelector } from "../store"

export const Accounts = () => {
  const { RangePicker } = DatePicker
  const [transactionDownload] = useTransactionDownloadMutation()
  const { selectedSession } = useAppSelector((state) => state.commonData)
  const { data: classList } = useFetchAllClassroomQuery(selectedSession.value)
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

  const graphOption = (title: string, aspectRatio: number) => {
    return {
      indexAxis: "x" as const,
      aspectRatio,
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

  const chartData = {
    labels: classList?.map((item) => item.std),
    datasets: [
      {
        label: "Student Strength",
        data: classList?.map((item) => item.studentStrength),
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(75, 192, 192, 0.3)",
          "rgba(153, 102, 255, 0.3)",
          "rgba(255, 159, 64, 0.3)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
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
    {
      key: "3",
      label: "",
      children: <Stock />,
    },
  ]
  const disabledDate = (current: Dayjs) => {
    return current && current > dayjs().endOf("day") // Disable future dates
  }

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }} size={"large"}>
        <Row justify={"space-around"}>
          <Bar options={graphOption("Monthly Transaction", 5)} data={transactionData} />
        </Row>
        <Row justify={"space-around"}>
          <Col span={10}>
            <Projections />
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
