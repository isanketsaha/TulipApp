import { Descriptions } from "antd"
import { IBasicDetails } from "../interface/IBasicDetails"
import dayjs from "dayjs"
import { FC } from "react"

interface ItemProps {
    data: IBasicDetails;
  }

export const BasicDetails: FC<ItemProps> = ({data}: ItemProps) => {
    return (
        <Descriptions>
            <Descriptions.Item label="ID">{data.id}</Descriptions.Item>
            <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
            <Descriptions.Item label="Telephone">{data.phoneNumber}</Descriptions.Item>
            <Descriptions.Item label="Date Of Birth">{dayjs(data.dob).format('DD/MM/YYYY')}</Descriptions.Item>
            <Descriptions.Item label="Gender">{data.gender}</Descriptions.Item>
            <Descriptions.Item label="Blood Group">
                {data.bloodGroup}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
                {data.address}
            </Descriptions.Item>
        </Descriptions>
    )
}