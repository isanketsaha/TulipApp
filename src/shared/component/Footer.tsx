import { Footer } from "antd/es/layout/layout";
import { useFetchBloodGroupListQuery, useFetchDependentRelationListQuery, useFetchGenderListQuery, useFetchReligionListQuery } from "../redux/api/feature/common/api";
import { useEffect } from "react";


export const AppFooter = () => {

    const { data: bloodGroupList } = useFetchBloodGroupListQuery();
    const { data: dependentRelationList } = useFetchDependentRelationListQuery();
    const { data: genderList } = useFetchGenderListQuery();
    const { data: religionList } = useFetchReligionListQuery();

    // useEffect(()=>{
    //    const val = bloodGroupList();

    // })
    return (
        <Footer style={{ textAlign: 'center' }}>Tulip School Estabilished on ©2018</Footer>
    );
}