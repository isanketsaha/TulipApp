import { Col, Row, Select } from "antd"
import { Header } from "antd/es/layout/layout"
import { DateTime } from "./DateTime"
import { useState } from "react"
import MenuItem from "antd/es/menu/MenuItem"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store"
import { updateSelectedSession } from "../redux/slices/CommonSlice"
import { DefaultOptionType } from "antd/es/select"


export const AppHeader = () => {
    const dispatch = useAppDispatch();

    const selectList = useAppSelector(state => state.commonData);

    const onSessionChange = (data: any) => {
        dispatch(updateSelectedSession(data));
    }

    // const handleChange = (value: { value: string; label: React.ReactNode }) => {
    //     console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    // };

    return (
        <Header className="header" style={{ background: '#800000', color: 'white', top: 0, right: 0, left: 0, zIndex: 10, position: 'fixed' }} >
            <Row style={{ marginTop: '-2vh' }}>
                <Col >
                    <Link to="/">

                        <h1 style={{ fontFamily: 'EB Garamond, serif', fontSize: 'xx-large', color: 'white' }}>Tulip English School </h1>

                    </Link>
                </Col>
                <Col span={2} offset={12}>
                    <Select
                        labelInValue
                        style={{ width: '100%', marginTop: '4vh' }}
                        onChange={onSessionChange}
                        value={selectList?.selectedSession.value}
                        options={selectList?.sessionList}
                    />
                </Col>
                <Col offset={3}>
                    <DateTime />
                </Col>
            </Row>
        </Header>
    )
} 