import { Button, Col, Divider, Form, Row, Steps } from "antd"
import Title from "antd/es/typography/Title"
import { useState } from "react";
import { AddBasic } from "./AddBasic";
import { AddDependent } from "./AddDependent";
import { AddAdditional } from "./AddAdditional";

export const AddEmployee = () => {

    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();

    const onNext = () => {

        form.validateFields().then(values => {
            setCurrentStep(currentStep + 1);
            form.resetFields;
        }).catch(errorInfo => console.log("FAILED", errorInfo));
        // console.log(employeeDetails)
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
                form={form}
                wrapperCol={{ span: 15 }}
                labelCol={{ span: 9 }}
                layout="horizontal"
                labelAlign="left"
                validateMessages={validateMessages}
                size={"large"}
                autoComplete={"off"}
                scrollToFirstError
                onFinish={onNext}
            >
                {stepOptions[currentStep].content}

                <Row>

                    <Col span={2} offset={20}>
                        <Button hidden={currentStep >  0} style={{ marginRight: '1vh' }} type="primary" onClick={() => { onPrev() }}>
                            Prev
                        </Button>
                    </Col>
                    <Col span={currentStep != stepOptions.length - 1 ? 0 : 2} >
                        <div hidden={currentStep != stepOptions.length - 1}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </Col>
                    <Col span={currentStep == stepOptions.length - 1 ? 0 : 2}  >
                        <div hidden={currentStep == stepOptions.length - 1}>
                            <Button type="primary" htmlType="submit" onClick={() => { onNext() }}>
                                Next
                            </Button>
                        </div>
                    </Col>

                </Row>
            </Form>
        </div>

    </>)
}