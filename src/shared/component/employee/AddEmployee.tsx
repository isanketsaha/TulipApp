import { Button, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Steps } from "antd"
import Title from "antd/es/typography/Title"
import { useState } from "react";
import { AddBasic } from "./AddBasic";
import { AddDependent } from "./AddDependent";
import { AddAdditional } from "./AddAdditional";

export const AddEmployee = () => {

    const [currentStep, setCurrentStep] = useState(0);

    const onNext = () => {
        setCurrentStep(currentStep+1);
    };

    const onPrev = () => {
        setCurrentStep(currentStep - 1);
    };

    const stepOptions = [
        {
            title: 'Basic Details',
            content: <AddBasic />
        },
        {
            title: 'Dependent Details',
            content: <AddDependent />

        }, {
            title: 'Additional Details',
            content: <AddAdditional />
        },
    ];

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

    return (<>
        <Title level={3}>Add Employee</Title>

        <div style={{ margin: '4vh' }}>
            <Steps
                type="navigation"
                size="default"
                current={currentStep}
                items={stepOptions}
            />

            <Divider />


            <Form
                wrapperCol={{ span: 15 }}
                labelCol={{ span: 9 }}
                layout="horizontal"
                labelAlign="left"
                validateMessages={validateMessages}
                size={"large"}
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
                            <Button style={{marginRight:'1vh'}} type="primary" onClick={() => { onPrev() }}>
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