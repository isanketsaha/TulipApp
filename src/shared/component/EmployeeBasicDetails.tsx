import { Card } from "antd"
import { useFetchAllActiveEmployeeQuery } from "../redux/api/feature/employee/api";
import { BasicDetails } from "./BasicDetails";

export const EmployeeBasicDetails = () => {

    const { data } = useFetchAllActiveEmployeeQuery();

    return (
        <>
            {data?.map((item, index )=> {
                return (<Card title={item.name} key={item.id} extra={<a href="#">Detail</a>} style={{ width: '100%', margin: '2vh 0' }}>
                    <BasicDetails data={item} key={item.id} />
                </Card>)
            })}
        </>
    )
}