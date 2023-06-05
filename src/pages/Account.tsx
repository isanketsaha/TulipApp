import { Row, Col, DatePicker, Tabs, Space, TabsProps, Segmented, Button } from "antd";
import { useEffect, useState } from "react";
import { Audit } from "../shared/component/reports/Audit";
import { FinanceReport } from "../shared/component/reports/FinanceReport";
import dayjs, { Dayjs } from "dayjs";
import { Stock } from "../shared/component/reports/Stock";
import { Bar, Pie } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../store";
import { useFetchAllClassroomQuery } from "../shared/redux/api/feature/classroom/api";
import { useFetchTransactionReportQuery } from "../shared/redux/api/feature/account/api";
import { DownloadOutlined} from '@ant-design/icons';

export const Accounts = () => {
    const { RangePicker } = DatePicker;
    const { selectedSession } = useAppSelector(state => state.commonData);
    const { data: classList } = useFetchAllClassroomQuery(selectedSession.value);
    const [selectedRange, setSelectedRange] = useState<Dayjs[]>([dayjs(new Date()).startOf('month').add(-3, 'month').startOf('month'),
    dayjs(new Date())]);

    const { data: financeReportData } = useFetchTransactionReportQuery({
            fromDate: selectedRange[0].format('DD-MM-YYYY'), toDate: selectedRange[1].endOf('month').format('DD-MM-YYYY'),
            groupByType: 'MONTHLY'
    });
    const transactionData = {
        labels: financeReportData?.reportList?.map(item => dayjs(item.transactionDate).format('MMM-YYYY')),
        datasets: [
            {
                label: 'Fees',
                data: financeReportData?.reportList?.map(item => item.fees),
                backgroundColor: '#82B4E1',
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
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                    'rgba(255, 206, 86, 0.3)',
                    'rgba(75, 192, 192, 0.3)',
                    'rgba(153, 102, 255, 0.3)',
                    'rgba(255, 159, 64, 0.3)',
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


    const tabList: TabsProps['items'] = [
        {
            key: '1',
            label: 'Transaction',
            children: <FinanceReport selectedRange={selectedRange} />
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
    const disabledDate = (current: Dayjs) => {
        return current && current > dayjs().endOf('day'); // Disable future dates
    };


    return (<>

        <Space direction="vertical" style={{ width: '100%' }} size={"large"}>
            <Row justify={"space-around"}>
                <Col>
                    <Pie data={chartData} />
                </Col>
                <Col>
                    <Bar width={500}
                        height={250} data={transactionData} />
                </Col>
            </Row>
            <Row >
                <Tabs style={{ width: '100%' }} size="large" defaultActiveKey="1"
                    tabBarExtraContent={
                        <Row justify={"space-evenly"}>

                            <Col>
                                <Button  icon={<DownloadOutlined />}>
                                    Export To Excel
                                </Button>
                            </Col>

                            <Col> <RangePicker picker="month"
                                disabledDate={disabledDate}
                                allowClear={false}
                                onCalendarChange={(val : null | (Dayjs | null)[] ) => val &&  setSelectedRange((val.filter(Boolean) as Dayjs[]))}
                                format={"MMM-YYYY"}
                                defaultValue={[selectedRange[0], selectedRange[1]]}
                            /> </Col>
                        </Row>}
                    items={tabList} />
            </Row>

        </Space>

    </>)
}