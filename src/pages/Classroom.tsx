import { Select, Tabs } from "antd"
import { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import { ClassroomDetails } from "../shared/component/ClassroomDetails"
import { useFetchAllClassroomQuery } from "../shared/redux/api/feature/classroom/api"
import { useAppSelector } from "../store"

export const Classroom = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 900px)" })
  const { selectedSession, sessionList } = useAppSelector((state) => state.commonData)
  const [sessionId, setSessionId] = useState<number>(selectedSession.value)
  const { data: classList } = useFetchAllClassroomQuery(sessionId, { skip: !sessionId })

  useEffect(() => {
    setSessionId(selectedSession.value)
  }, [selectedSession])

  return (
    <Tabs
      tabPosition={"top"}
      size={"large"}
      defaultActiveKey="1"
      centered
      type="card"
      tabBarExtraContent={
        isTabletOrMobile ? null : <Select onChange={(id) => setSessionId(id)} value={sessionId} options={sessionList} />
      }
      items={classList?.map((_, i) => {
        const id = String(_.id)
        return {
          label: _.std,
          key: id,
          children: <ClassroomDetails stdList={_} session={sessionId} />,
        }
      })}
    />
  )
}
