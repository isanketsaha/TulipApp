import { Button, Col, Divider, Form, Row, Steps } from "antd"
import Title from "antd/es/typography/Title"
import { useState } from "react";
import { AddBasic } from "./Basic";
import { AddDependent } from "./Dependent";
import { AddAdditional } from "./Additional";
import { useLocation } from "react-router-dom";

export const Onboarding = () => {

    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();

    const { state } = useLocation();


    const onNext = () => {
        console.log(state);
        form.validateFields().then(values => {
            setCurrentStep(currentStep + 1);
        });
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

        }
    ];

    if (state.type == 'employee') {
        stepOptions.push({
            title: 'Additional Details',
            content: <AddAdditional />
        });
    }


    return (<>

        {
            state.type == 'student' ? <Title level={3}>Student Admission</Title> : <Title level={3}>Add Employee</Title>
        }

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
                size={"large"}
                autoComplete={"off"}
                scrollToFirstError
            >
                {stepOptions[currentStep].content}

                <Row>

                    <Col span={2} offset={20}>
                        <Button hidden={currentStep > 0} style={{ marginRight: '1vh' }} type="primary" onClick={() => { onPrev() }}>
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