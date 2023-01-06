import { Tabs } from "antd";
import { useFetchAllClassroomQuery, useFetchStudentListQuery } from "../shared/redux/api/feature/classroom/api";
import { ClassroomDetails } from "../shared/component/ClassroomDetails";


export const Classroom = () => {


    const { data : classList } = useFetchAllClassroomQuery();
    
    const onChange = (key: string) => {
        console.log(key);
      };

    return (<>
        <h1>Classroom</h1>

        <Tabs
            size={"large"}
            defaultActiveKey="1"
            centered
            type="card"
            tabBarGutter={5}
            
            onChange={onChange}
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