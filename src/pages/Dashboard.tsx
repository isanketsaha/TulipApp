import { Card, Col, Row, Space } from "antd"
import { ChartData } from "chart.js"
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2"
import { StaffReport } from "../shared/component/reports/StaffReport"
import { StudentReport } from "../shared/component/reports/Student"
import { CollectionReport } from "../shared/component/reports/CollectionReport"
import { useFetchAllClassroomQuery } from "../shared/redux/api/feature/classroom/api"
import { useFetchSalesReportQuery, useFetchTransportReportQuery } from "../shared/redux/api/feature/report/api"
import { useAdmissionByMonthQuery, useExpenseReportQuery } from "../shared/redux/api/feature/vizualize/api"
import { monthToNumber } from "../shared/utils/Constants"
import { useAppSelector } from "../store"
import dayjs from "dayjs"
import { AcademicCalender } from "../shared/component/AcademicCalender"

export const Dashboard = () => {
  const { selectedSession } = useAppSelector((state) => state.commonData)
  const { data: classList } = useFetchAllClassroomQuery(selectedSession.value, { skip: !selectedSession.value })
  const { data: admissionMonthly } = useAdmissionByMonthQuery()
  const { data: expenseMonthly } = useExpenseReportQuery()
  const { data: transport } = useFetchTransportReportQuery()
  const { data: sales } = useFetchSalesReportQuery(dayjs(new Date()).format("DD/MM/YYYY"))
  const graphOption = (title: string, aspectRatio = 1, intersect = false) => {
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
      interaction: {
        mode: "index" as const,
        intersect,
      },
      responsive: true,
      plugins: {
        colors: {
          forceOverride: true,
        },
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

  const chartData: ChartData<"pie", number[], string> = {
    labels: classList?.map((item) => item.std),
    datasets: [
      {
        data: (classList && classList?.map((item) => item.studentStrength)) ?? [],
        borderWidth: 1,
      },
    ],
  }

  const tansportData: ChartData<"doughnut", number[], string> = {
    labels: transport && Object.keys(transport!),
    datasets: [
      {
        data: transport ? Object.values(transport!) : [],
        borderWidth: 1,
      },
    ],
  }

  const salesData: ChartData<"doughnut", number[], string> = {
    labels:
      sales &&
      Object.entries(sales).flatMap(([category, subCategories]) =>
        Object.keys(subCategories).map((subCategory) => `${category} - ${subCategory}`)
      ),
    datasets: [
      {
        data: sales ? Object.values(sales!).flatMap((subCategories) => Object.values(subCategories)) : [],
        borderWidth: 1,
      },
    ],
  }

  const admission: ChartData<"line", number[], string> = {
    labels:
      admissionMonthly &&
      Object.keys(admissionMonthly)
        .map((item) => new Date(`${item} 1, 2000`))
        .map((label) => label.toLocaleString("en-US", { month: "short" })),
    datasets: [
      {
        label: "Admission",
        data: (admissionMonthly && Object.values(admissionMonthly)) ?? [],
      },
    ],
  }

  const monthArray: string[] = [
    ...new Set(expenseMonthly && Object.values(expenseMonthly).flatMap((innerRecord) => Object.keys(innerRecord))),
  ]

  const expenseLabel: string[] = monthArray.sort(
    (a, b) => monthToNumber[a.toUpperCase()] - monthToNumber[b.toUpperCase()]
  )

  const expense = {
    labels: expenseLabel,
    datasets:
      (expenseMonthly &&
        Object.entries(expenseMonthly).map(([category, expenses]) => {
          return {
            label: category,
            data: expenseLabel.map((month) => (expenses[month] ? expenses[month] : 0)),
          }
        })) ??
      [],
  }

  return (
    <Row justify={"space-between"}>
      <Col span={24}>
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Row justify={"space-between"}>
            <Col span={24}>
              <Space direction="vertical" size="middle" style={{ display: "flex" }}>
                <Row justify={"space-between"}>
                  <Col lg={{ span: 6 }}>
                    {classList && (
                      <Pie
                        data={chartData}
                        options={graphOption(
                          "Student - " + classList?.reduce((partialSum, a) => partialSum + a.studentStrength, 0),
                          1,
                          true
                        )}
                      />
                    )}
                  </Col>
                  <Col lg={{ span: 6 }}>
                    {sales && (
                      <Doughnut
                        data={salesData}
                        options={graphOption(
                          "Sales - " +
                            Object.values(sales!).reduce(
                              (outerAcc, innerRecord) =>
                                outerAcc +
                                Object.values(innerRecord).reduce((innerAcc, number) => innerAcc + number, 0),
                              0
                            ),
                          1,
                          true
                        )}
                      />
                    )}
                  </Col>
                  <Col lg={{ span: 6 }}>
                    {transport && (
                      <Doughnut
                        options={graphOption(
                          "Transport - " + Object.entries(transport).reduce((acc, [key, value]) => acc + value, 0),
                          1,
                          true
                        )}
                        data={tansportData}
                      />
                    )}
                  </Col>
                  <Col lg={{ span: 6 }}>
                    {admissionMonthly && (
                      <Line
                        options={{
                          ...graphOption(
                            "Admission - " +
                              Object.values(admissionMonthly!)?.reduce((partialSum, a) => partialSum + a, 0)
                          ),
                          ...{
                            scales: {
                              y: {
                                suggestedMin: 0, // Start y-axis from 0
                                ticks: {
                                  stepSize: 3,
                                },
                              },
                            },
                          },
                        }}
                        data={admission}
                      />
                    )}
                  </Col>
                </Row>
                <Row justify={"space-around"}>
                  <Bar options={graphOption("Expense", 4)} data={expense} />
                </Row>
              </Space>
            </Col>

            {/* <Col span={6}>
              <Row align={"middle"}>
                <AcademicCalender />
              </Row>
            </Col> */}
          </Row>
        </Space>
      </Col>
    </Row>
  )
}
