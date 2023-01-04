import { Card } from "antd";
import { BasicDetails } from "./BasicDetails";
import { useFetchAllStudentQuery } from "../redux/api/feature/student/api";


export const StudentBasicDetails = () => {

    const { data } = useFetchAllStudentQuery();

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