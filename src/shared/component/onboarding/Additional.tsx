import { Row, Col, Form, Input, DatePicker, InputNumber, Divider, Select, FormInstance } from "antd"
import { useAppSelector } from "../../../store";
import { Dayjs } from "dayjs";
import Password from "antd/es/input/Password";
import { useState } from "react";


interface IAdditionalProps {
    form: FormInstance,
}
export const AddAdditional = ({ form }: IAdditionalProps) => {

    const selectList = useAppSelector(state => state.commonData);
    const {user} = useAppSelector(state => state.userAuth);
    const [displayCredential, setDisplayCredential] = useState<boolean>(false);

    const showCredentials = ["STAFF","PRINCIPAL"];
    const disableDate = (currentDate: Dayjs) => {
        return currentDate.isAfter(new Date());
    };


    const disableDateDoj = (currentDate: Dayjs) => {
        const fields = form.getFieldsValue(true);
        const { interview } = fields;
        const interviewDate: Dayjs = interview[0].interviewDate;
        return currentDate.isBefore(interviewDate);
    };


    return (
        <><Form.List name="interview" initialValue={[{}]}>
            {(fields) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <div key={key}><Row gutter={[40, 40]}>
                            <Col span={12}>
                                <Form.Item name={[name, "interviewDate"]} label="Interview Date" rules={[{ required: true }]}>
                                    <DatePicker style={{ width: '100%' }} disabledDate={(value) => disableDate(value)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={[name, "doj"]} label="Joining On" rules={[{ required: true }]}>
                                    <DatePicker style={{ width: '100%' }} disabledDate={(value) => disableDateDoj(value)} />
                                </Form.Item>
                            </Col>
                        </Row><Row gutter={[40, 40]}>
                                <Col span={12}>
                                    <Form.Item name={[name, "salary"]} label="Salary Offered" rules={[{ type: 'number', required: true }]}>
                                        <InputNumber maxLength={5} controls={false} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={[name, "role"]} label="Role Offered" rules={[{ required: true },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (value) {
                                                if (showCredentials.includes(value)) {
                                                    setDisplayCredential(true);
                                                } else {
                                                    setDisplayCredential(false);
                                                }
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Select Role!'));
                                        },
                                    })]}>
                                        <Select options={selectList.userRoleList.filter(item=> item.label != user?.authority)} />
                                    </Form.Item>
                                </Col>
                            </Row></div>))}
                </>
            )}
        </Form.List>

            {displayCredential && <Form.List name="credential" initialValue={[{}]}>
                {(fields) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <div key={key}><Divider plain> <h3>Login Details</h3></Divider><Row gutter={[40, 40]}>
                                <Col span={12}>
                                    <Form.Item name={[name, "userName"]} label="UserName" rules={[{ required: true }]}>
                                        <Input maxLength={12} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={[name, "password"]} label="Password" rules={[{ required: true }]}>
                                        <Password maxLength={12} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            </div>
                        )
                        )}
                    </>)}
            </Form.List>}


            <Form.List name="bank" initialValue={[{}]}>
                {(fields) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <div key={key}><Divider plain> <h3>Bank Details</h3></Divider><Row gutter={[40, 40]}>
                                <Col span={12}>
                                    <Form.Item name={[name, "accountNumber"]} label="Account Number" hasFeedback rules={[{ required: true }, {
                                        pattern: new RegExp("^[0-9]*$"),
                                        message: "Only accept numbers"
                                    }]}>
                                        <Input maxLength={12} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={[name, "confirmAccountNumber"]} label="Confirm Account Number" dependencies={['accountNumber']}
                                        hasFeedback rules={[{ required: true }, {
                                            pattern: new RegExp("^[0-9]*$"),
                                            message: "Only accept numbers"
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (value && getFieldValue("bank")[0].accountNumber === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two account number that you entered do not match!'));
                                            },
                                        })
                                        ]}>
                                        <Input maxLength={12} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row><Row gutter={[40, 40]}>

                                    <Col span={12}>
                                        <Form.Item name={[name, "ifsc"]} label="IFSC Code" rules={[{ required: true},  {
                                            pattern: new RegExp("^\\S*$"),
                                            message: "No Space Allowed"
                                        } ]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name={[name, "bankName"]} label="Bank">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row></div>))}
                    </>)}
            </Form.List> </>);

}