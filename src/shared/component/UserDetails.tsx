import { Descriptions, Badge } from "antd"
import { useLocation } from "react-router-dom";

export const UserDetails = () => {
    const { state } = useLocation();
    return (

        <>
            <Descriptions title="User Info" bordered>
                <Descriptions.Item label="Student ID"> {state?.data}</Descriptions.Item>
                <Descriptions.Item label="Name">Prepaid</Descriptions.Item>
                <Descriptions.Item label="Gender">YES</Descriptions.Item>
                <Descriptions.Item label="Date Of Birth">2018-04-24 18:00:00</Descriptions.Item>
                <Descriptions.Item label="Admission On" span={2}>
                    2019-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="Active" span={3}>
                    <Badge status="success" text="True" />
                </Descriptions.Item>
                <Descriptions.Item label="Classroom">I</Descriptions.Item>
                <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                <Descriptions.Item label="Config Info">
                    Data disk type: MongoDB
                    <br />
                    Database version: 3.4
                    <br />
                    Package: dds.mongo.mid
                    <br />
                    Storage space: 10 GB
                    <br />
                    Replication factor: 3
                    <br />
                    Region: East China 1
                    <br />
                </Descriptions.Item>
            </Descriptions>
        </>
    )
}