import { Button, Col, Divider, Form, Row, Steps } from "antd"
import Title from "antd/es/typography/Title"
import { useState } from "react";
import { AddAdditional } from "../employee/AddAdditional";
import { AddBasic } from "../employee/AddBasic";
import { AddDependent } from "../employee/AddDependent";


export const AddStudent = () => {

    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();

    const onNext = () => {
        setCurrentStep(currentStep + 1);
        let employeeDetails = form.getFieldsValue(true);
        console.log(employeeDetails)
    };

    const onPrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };


    const stepOptions = [
        {
            title: 'Basic Details',
            content: <AddBasic />
        },
        {
            title: 'Dependent Details',
            content: <AddDependent />

        },
    ];

    return (<>
        <Title level={3}>Student Admission</Title>
        <div style={{ margin: '4vh' }}>
            <Steps
                type="navigation"
                size="default"
                current={currentStep}
                items={stepOptions}
            />

            <Divider />

            <Form
                form={form}
                wrapperCol={{ span: 15 }}
                labelCol={{ span: 9 }}
                layout="horizontal"
                labelAlign="left"
                validateMessages={validateMessages}
                size={"large"}
                autoComplete={"off"}
            >
                {stepOptions[currentStep].content}

                <Row>
                    <Col span={4} offset={20}>
                        <div hidden={currentStep != stepOptions.length - 1}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>
                        <div hidden={currentStep == stepOptions.length - 1}>
                            <Button style={{ marginRight: '1vh' }} type="primary" onClick={() => { onPrev() }}>
                                Prev
                            </Button>
                            <Button type="primary" onClick={() => { onNext() }}>
                                Next
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>

    </>)
}