import { Button, Col, Row, Select } from "antd";
import { EmployeeBasicDetails } from "../shared/component/EmployeeBasicDetails";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDebounce } from "../shared/hook/useDebounce";
import { useSeachEmployeeByNameQuery } from "../shared/redux/api/feature/employee/api";
import { useAppSelector } from "../store";
import { Role } from "../shared/utils/Role";
import { useMediaQuery } from "react-responsive";


export const EmployeePage = () => {
const {user} = useAppSelector(state => state.userAuth);
const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const [searchValue, setSearchValue] = useState<string>("");
    const debouncedSearchTerm = useDebounce(searchValue, 500);
    const { data, isFetching } = useSeachEmployeeByNameQuery(debouncedSearchTerm, { skip: debouncedSearchTerm == "" });

    return (
      <>
        <Row>
          {isMobile ? null : (
            <Col span={3}>
              {user?.authority && [Role.ADMIN, Role.PRINCIPAL].includes(user?.authority) && (
                <Link
                  to="/onboarding"
                  state={{
                    type: "employee",
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Onboard Employee
                  </Button>
                </Link>
              )}
            </Col>
          )}
          <Col span={isMobile ? 20 : 5} offset={isMobile ? 2 : 16}>
            <Select
              allowClear
              showSearch
              placeholder="Teacher Name / ID"
              size="large"
              onSearch={(value) => setSearchValue(value)}
              loading={isFetching}
              filterOption={false}
              style={{ width: "100%" }}
              notFoundContent={null}
              options={data?.map((d) => ({
                value: d.id,
                label: <Link to={`../employeeDetails/${d.id}`}> {d.name} </Link>,
              }))}
            />
          </Col>
        </Row>
        <EmployeeBasicDetails />
      </>
    )
}