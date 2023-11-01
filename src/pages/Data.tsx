import { Card, Row, Select } from "antd"
import Meta from "antd/es/card/Meta"
import { Session } from "../shared/component/data/Session"
import { useEffect, useState } from "react"
import { useAppSelector } from "../store"
import { ISelectDefault } from "../shared/interface/ISelectDefault"
import { Fees } from "../shared/component/data/Fees"

export const Data = () => {
  const { sessionList, selectedSession } = useAppSelector((app) => app.commonData)
  const [session, setSession] = useState<String>()
  const contentListNoTitle: Record<string, React.ReactNode> = {
    session: <Session value={sessionList.filter((item) => item.value === session)} />,
    product: <p>app content</p>,
  }
  const [tab, setTab] = useState<string>("session")

  useEffect(() => {
    setSession(String(selectedSession.value))
  }, [selectedSession.value])

  return (
    <>
      <Card
        style={{ width: "100%", minHeight: "80%" }}
        onTabChange={setTab}
        tabBarExtraContent={
          <Select value={session} onChange={setSession} style={{ width: "100%" }} options={sessionList} />
        }
        tabList={Object.keys(contentListNoTitle).map((item, index) => {
          const id = String(index + 1)
          return {
            label: item.toUpperCase(),
            key: item,
          }
        })}
        tabProps={{
          size: "middle",
          centered: true,
        }}
      >
        {contentListNoTitle[tab]}
      </Card>
    </>
  )
}
