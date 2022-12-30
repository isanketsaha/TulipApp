import { Footer } from "antd/es/layout/layout";
import { useFetchAllFinacialYearQuery, useFetchBloodGroupListQuery, useFetchCurrentFinancialYearQuery, useFetchDependentRelationListQuery, useFetchGenderListQuery, useFetchReligionListQuery, useFetchUserRoleListQuery } from "../redux/api/feature/common/api";



export const AppFooter = () => {

    const { data: bloodGroupList } = useFetchBloodGroupListQuery();
    const { data: dependentRelationList } = useFetchDependentRelationListQuery();
    const { data: genderList } = useFetchGenderListQuery();
    const { data: religionList } = useFetchReligionListQuery();
    const { data: userRoleList } = useFetchUserRoleListQuery();
    const { data: allFinacialOption } = useFetchAllFinacialYearQuery();
    const { data: currentFinancialYear } = useFetchCurrentFinancialYearQuery();
    return (
        <Footer style={{ textAlign: 'center' }}>Tulip School Estabilished on ©2018</Footer>
    );
}