import { Divider, Tabs } from "antd";
import { useFetchAllClassroomQuery, useFetchStudentListQuery } from "../shared/redux/api/feature/classroom/api";
import { ClassroomDetails } from "../shared/component/ClassroomDetails";


export const Classroom = () => {


    const { data : classList } = useFetchAllClassroomQuery();
    

    return (<>
        <Divider><h1>Classroom</h1></Divider>

        <Tabs
            size={"large"}
            defaultActiveKey="1"
            centered
            type="card"
            tabBarGutter={5}
            items={classList?.map((_, i) => {
                const id = String(_.id);
                return {
                    label: _.std,
                    key: id,
                    children: <ClassroomDetails classDetails={_} />,
                };
            })}
        />
    </>)
}