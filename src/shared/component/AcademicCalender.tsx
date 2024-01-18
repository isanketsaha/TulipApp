import { Badge, Calendar, CalendarProps, Popover, Row, Typography } from "antd"
import { Dayjs } from "dayjs"
import React from "react"
import { useState } from "react"
import { useAppSelector } from "/src/store"

export const AcademicCalender = () => {
  const { holidayList } = useAppSelector((app) => app.commonData)
  const [content, setContent] = useState<string>("")
  const onSelect = (newValue: Dayjs) => {
    setContent("Selected Date" + newValue.format("YYYY-MM-DD"))
  }

  const cellRender: CalendarProps<Dayjs>["fullCellRender"] = (date, info) => {
    if (info.type === "date") {
      return React.cloneElement(info.originNode, {
        ...info.originNode.props,
        children: holidayList.filter(({ date: event }) => event === date.format("DD/MM")) ? (
          date.get("date")
        ) : (
          <Popover content={content} trigger={"click"}>
            <div>
              {date.get("date")}
              <Badge status="warning" style={{ display: "flex" }} />
            </div>
          </Popover>
        ),
      })
    }
  }

  return (
    <>
      <Calendar
        fullscreen={false}
        headerRender={({ value }) => {
          let current = value.clone()
          const month = value.month()
          return (
            <>
              <Row justify={"center"}>
                <Typography.Title level={5} style={{ marginTop: "1vmin" }}>
                  {value.format("MMMM-YYYY")}
                </Typography.Title>
              </Row>
            </>
          )
        }}
        onSelect={onSelect}
        onChange={onSelect}
        mode={"month"}
        fullCellRender={cellRender}
      />
    </>
  )
}
