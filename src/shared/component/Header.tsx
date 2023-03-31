import { Col, Row, Select } from "antd"
import { Header } from "antd/es/layout/layout"
import { DateTime } from "./DateTime"
import { useState } from "react"
import MenuItem from "antd/es/menu/MenuItem"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store"
import { updateSelectedSession } from "../redux/slices/CommonSlice"
import styles from '/src/shared/styles/CommonStyles.scss?inline'


export const AppHeader = () => {
    const dispatch = useAppDispatch();

    const {selectedSession, sessionList} = useAppSelector(state => state.commonData);

    const onSessionChange = (data: any) => {
        dispatch(updateSelectedSession(data));
    }

    return (
        <Header className="header" style={{ background: '#800000', color: 'white', top: 0, right: 0, left: 0, zIndex: 10, position: 'fixed' , overflow:"hidden"}} >
            <Row align={"top"}>
                <Col >
                    <Link to="/">

                        <h1 style={{ fontFamily: 'EB Garamond, serif',marginTop: 0, fontSize: 'xx-large', color: 'white' }}>Tulip English School </h1>

                    </Link>
                </Col>
                <Col span={3} offset={12}>
                    <Select
                        labelInValue
                        style={{ width: '100%'}}
                        onChange={onSessionChange}
                        disabled={true}
                        value={selectedSession?.value}
                        options={sessionList}
                    />
                </Col>
                <Col offset={1}>
                    <DateTime />
                </Col>
            </Row>
        </Header>
    )
} 