import { Footer } from "antd/es/layout/layout";
import { useFetchAllClassQuery, useFetchAllFinacialYearQuery, useFetchAvailablePaymentOptionsQuery, useFetchBloodGroupListQuery, useFetchCurrentFinancialYearQuery, useFetchDependentRelationListQuery, useFetchExpenseCategoryOptionsQuery, useFetchGenderListQuery, useFetchReligionListQuery, useFetchUserRoleListQuery } from "../redux/api/feature/common/api";



export const AppFooter = () => {

    const { data: bloodGroupList } = useFetchBloodGroupListQuery();
    const { data: dependentRelationList } = useFetchDependentRelationListQuery();
    const { data: genderList } = useFetchGenderListQuery();
    const { data: religionList } = useFetchReligionListQuery();
    const { data: userRoleList } = useFetchUserRoleListQuery();
    const { data: allFinacialOption } = useFetchAllFinacialYearQuery();
    const { data: currentFinancialYear } = useFetchCurrentFinancialYearQuery();
    const { data: expenseCategory } = useFetchExpenseCategoryOptionsQuery();

    const { data: allClassList } = useFetchAllClassQuery();
    useFetchAvailablePaymentOptionsQuery();
    return <Footer style={{ textAlign: "center" }}>Tulip School Estabilished on ©2018</Footer>
}