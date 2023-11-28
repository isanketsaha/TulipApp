import { Button, Card, Modal, Select, Space, message } from "antd"
import { useEffect, useState } from "react"
import { Session } from "../shared/component/data/Session"
import { useAppSelector } from "../store"
import modal from "antd/es/modal"

export const Data = () => {
  const { sessionList, selectedSession } = useAppSelector((app) => app.commonData)
  const [session, setSession] = useState<String>()
  const contentListNoTitle: Record<string, React.ReactNode> = {
    product: <></>,
    Transport: <></>,
  }
  const [tab, setTab] = useState<string>("product")
  const [addSession, setAddSession] = useState<boolean>(false)

  useEffect(() => {
    setSession(String(selectedSession.value))
  }, [selectedSession.value])

  return (
    <>
      <Card
        style={{ width: "100%", minHeight: "80%" }}
        onTabChange={setTab}
        defaultActiveTabKey="product"
        tabBarExtraContent={
          <Space>
            <Button type="link" onClick={() => setAddSession(true)}>
              Add Session
            </Button>
            <Select value={session} onChange={setSession} style={{ width: "100%" }} options={sessionList} />
          </Space>
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
      <Modal open={addSession} title="Add Session" width={1100} footer={[]} onCancel={() => setAddSession(false)}>
        <Session value={sessionList.filter((item) => item.value === session)} />
      </Modal>
    </>
  )
}
