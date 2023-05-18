import { Divider, Row, Col, Typography, Form } from "antd"
import form, { FormInstance } from "antd/es/form"

interface IBreakdownPrice {
        total: number,
        dues: number,
        subTotal: number
}
interface IFeesPros {
 breakdown  : IBreakdownPrice
}

export const PriceBreakDown = ({ breakdown }: IFeesPros) => {


    return (
        <>
            <Divider >Summary</Divider>
            <Row justify={"space-between"} >
                <Col>  <Typography.Text type="secondary" > Sub-Total</Typography.Text></Col>
                <Col><Typography.Text type="success"> {breakdown.subTotal}</Typography.Text></Col>
            </Row>
            {/* <Row justify={"space-between"} >
                <Col>   <Typography.Text type="secondary" > Discount</Typography.Text></Col>
                <Col> <Typography.Text type="danger"> $10000.00</Typography.Text></Col>
            </Row> */}
            <Row justify={"space-between"} >
                <Col>    <Typography.Text type="secondary" > Dues</Typography.Text> </Col>
                <Col><Typography.Text type="danger"> {breakdown.dues}</Typography.Text></Col>
            </Row>

            <Divider orientation="right"> {breakdown.total}</Divider>
        </>
    )
}