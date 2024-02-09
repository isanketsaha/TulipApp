import { Footer } from "antd/es/layout/layout";
import { useFetchAllClassQuery, useFetchAllFinacialYearQuery, useFetchAvailablePaymentOptionsQuery, useFetchBloodGroupListQuery, useFetchCurrentFinancialYearQuery, useFetchDependentRelationListQuery, useFetchExpenseCategoryOptionsQuery, useFetchGenderListQuery, useFetchReligionListQuery, useFetchUserRoleListQuery } from "../redux/api/feature/common/api";
import { Typography } from "antd"

export const AppFooter = () => {
  const { Text, Link } = Typography
  const { data: bloodGroupList } = useFetchBloodGroupListQuery()
  const { data: dependentRelationList } = useFetchDependentRelationListQuery()
  const { data: genderList } = useFetchGenderListQuery()
  const { data: religionList } = useFetchReligionListQuery()
  const { data: userRoleList } = useFetchUserRoleListQuery()
  const { data: allFinacialOption } = useFetchAllFinacialYearQuery()
  const { data: currentFinancialYear } = useFetchCurrentFinancialYearQuery()
  const { data: expenseCategory } = useFetchExpenseCategoryOptionsQuery()

  const { data: allClassList } = useFetchAllClassQuery()
  useFetchAvailablePaymentOptionsQuery()
  return (
    <Footer style={{ textAlign: "center" }}>
      <Text> Established on ©2018 </Text>
    </Footer>
  )
}