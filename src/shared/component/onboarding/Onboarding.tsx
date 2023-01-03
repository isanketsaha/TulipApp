import { Button, Col, Divider, Form, Row, Steps } from "antd"
import Title from "antd/es/typography/Title"
import { useState } from "react";
import { AddBasic } from "./Basic";
import { AddDependent } from "./Dependent";
import { AddAdditional } from "./Additional";
import { useLocation, useNavigate } from "react-router-dom";
import { useOnboardUserMutation } from "../../redux/api/feature/onboarding/api";

export const Onboarding = () => {
    let navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();

   const [onboardUser,{isSuccess, data}] = useOnboardUserMutation();

    const { state } = useLocation();

    if(isSuccess){
        console.log(data);
        navigate("/onboardingDetails", { replace: true , state: {data}});
    }


    const onNext = () => {
        form.validateFields().then(values => {
            setCurrentStep(currentStep + 1);
        });
    };

    const onSubmit = () => {
        form.validateFields().then(values => {
            const formValues = form.getFieldsValue(true);
            const interview = formValues['interview'] ? formValues['interview'][0] : null;
            if (interview != null) {
               var interviewDetails =  {
                    ...interview,
                    doj:interview.doj?.format('YYYY-MM-DD'),
                    interviewDate : interview.interviewDate?.format('YYYY-MM-DD')
                }
            }
            const data = {
                ...formValues,
                dob: formValues['dob'].format('YYYY-MM-DD'),
                interview: interviewDetails
            };
            onboardUser(data);
        });
    }

    const onPrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
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
            state?.type == 'student' ? <Title level={3}>Student Admission</Title> : <Title level={3}>Onboarding Employee</Title>
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
                initialValues={{ type: state?.type }}
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
                            <Button type="primary" onClick={() => { onSubmit() }} htmlType="submit">
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