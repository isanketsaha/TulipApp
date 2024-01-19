import { Badge, Card } from "antd"
import { useFetchAllActiveEmployeeQuery } from "../redux/api/feature/employee/api"
import { BasicDetails } from "./BasicDetails"
import { Link } from "react-router-dom"

export const EmployeeBasicDetails = () => {
  const { data } = useFetchAllActiveEmployeeQuery()

  return (
    <>
      {data?.map((item, index) => {
        return (
          <Card
            title={item.name}
            key={item.id}
            extra={<Link to={`../employeeDetails/${item.id}`}> Detail</Link>}
            style={{ width: "100%", margin: "2vh 0" }}
          >
            <BasicDetails data={item} key={item.id} />
          </Card>
        )
      })}
    </>
  )
}
