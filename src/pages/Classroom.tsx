import { Divider, Select, Tabs } from "antd";
import { useFetchAllClassroomQuery } from "../shared/redux/api/feature/classroom/api";
import { ClassroomDetails } from "../shared/component/ClassroomDetails";
import { useAppSelector } from "../store";
import { useState } from "react";


export const Classroom = () => {

    const selectList = useAppSelector(state => state.commonData);
    const [sessionId, setSessionId] = useState<number>(selectList?.selectedSession.value)
    const { data : classList } = useFetchAllClassroomQuery(sessionId);
    
    return (
        <Tabs
            size={"large"}
            defaultActiveKey="1"
            centered
            type="card"
            tabBarGutter={5}
            tabBarExtraContent={
                <Select
                onChange={(id) =>setSessionId(id)}
                value={selectList?.selectedSession.value}
                options={selectList?.sessionList}
            />
            }
            items={classList?.map((_, i) => {
                const id = String(_.id);
                return {
                    label: _.std,
                    key: id,
                    children: <ClassroomDetails stdList={_} />,
                };
            })}
        />
    )
}