import { Row, Col, Card, DatePicker, Tabs, Space, TabsProps } from "antd";
import { useState } from "react";
import { Audit } from "../shared/component/reports/Audit";
import { FinanceReport } from "../shared/component/reports/FinanceReport";
import dayjs, { Dayjs } from "dayjs";
import { Stock } from "../shared/component/reports/Stock";
import { Bar, Pie } from "react-chartjs-2";
import { useAppSelector } from "../store";
import { useFetchAllClassroomQuery } from "../shared/redux/api/feature/classroom/api";
import { useFetchTransactionReportQuery } from "../shared/redux/api/feature/account/api";


export const Accounts = () => {

    const { RangePicker } = DatePicker;
    const [fromDate, setFromDate] = useState<string>(dayjs(new Date()).add(-30, 'd').format('DD-MM-YYYY'));
    const [toDate, setToDate] = useState<string>(dayjs(new Date()).format('DD-MM-YYYY'));
    const { selectedSession } = useAppSelector(state => state.commonData);
    const { data: classList } = useFetchAllClassroomQuery(selectedSession.value);


    const { data: financeReportData } = useFetchTransactionReportQuery({
        page: 0,
        data: { fromDate: fromDate, toDate: toDate }
    });

    const transactionData = {
        labels: financeReportData?.reportList?.map(item => item.transactionDate),
        datasets: [
            {
                label: 'Fees',
                data: financeReportData?.reportList?.map(item => item.fees),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Expense',
                data: financeReportData?.reportList?.map(item => item.expense),
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
            },
            {
                label: 'Purchase',
                data: financeReportData?.reportList?.map(item => item.purchase),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    };

    const chartData = {
        labels: classList?.map(item => item.std),
        datasets: [
            {
                label: 'Student Strength',
                data: classList?.map(item => item.studentStrength),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
               
            },
        ],
    };



    const rangePresets: {
        label: string;
        value: [Dayjs, Dayjs];
    }[] = [
            { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
            { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
            { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
            { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
        ];


    const tabList: TabsProps['items'] = [
        {
            key: '1',
            label: 'Transaction',
            children: <FinanceReport from={fromDate} to={toDate} />
        }, {
            key: '2',
            label: 'Audit',
            children: <Audit />
        },
        {
            key: '3',
            label: '',
            children: <Stock />
        }
    ];

    const dateRangeChanged = (values: any, formatString: [string, string]) => {
        setFromDate(formatString[0]);
        setToDate(formatString[1]);
    }


    return (<>

        <Space direction="vertical" style={{ width: '100%' }} size={"large"}>
            <Row justify={"space-around"}>
                <Col>
                    <Pie data={chartData} options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                position: "bottom"
                            },
                            title: {
                                display: true,
                                text: ' Student Strength',
                            }
                        },
                    }} />
                </Col>
                <Col>
                    <Bar width={500}
                        height={250} options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top' as const,
                                },

                                title: {
                                    display: true,
                                    text: 'Transaction History',
                                },
                            }
                        }} data={transactionData} />
                </Col>
            </Row>
            <Row >
                <Tabs style={{ width: '100%' }} size="large" defaultActiveKey="1"
                    tabBarExtraContent={<RangePicker allowClear={false} disabled={[false, true]} format={"DD-MM-YYYY"} presets={rangePresets} onChange={dateRangeChanged}
                        defaultValue={[dayjs(new Date()).add(-30, 'd'), dayjs(new Date())]} />} items={tabList} />
            </Row>

        </Space>

    </>)
}