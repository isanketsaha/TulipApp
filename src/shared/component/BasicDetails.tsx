import { Descriptions } from "antd"
import { IBasicDetails } from "../interface/IBasicDetails"
import { FC } from "react"
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

interface ItemProps {
    data: IBasicDetails;
  }

export const BasicDetails: FC<ItemProps> = ({data}: ItemProps) => {
    const { pathname } = useLocation();
    const path: string[] = pathname.split('/');

    return (
        <Descriptions>
            <Descriptions.Item label={path.includes('staffs') ? "Employee ID" : "Student ID"}>{data.id}</Descriptions.Item>
            <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
            <Descriptions.Item label={path.includes('staffs') ? "Class Teacher" : "Class"}>
                {data.std}
            </Descriptions.Item>
            <Descriptions.Item label={path.includes('staffs') ? "Date Of Birth" : "Age"}>{ path.includes('staffs') ? dayjs(data.dob).format("DD/MM/YYYY") : data.age}</Descriptions.Item>
            <Descriptions.Item label="Gender">{data.gender}</Descriptions.Item>
            
            <Descriptions.Item label="Telephone">{data.phoneNumber}</Descriptions.Item>
            <Descriptions.Item label="Address">
                {data.address}
            </Descriptions.Item>
        </Descriptions>
    )
}