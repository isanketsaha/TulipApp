import { Badge, Button, Col, Descriptions, Divider, Form, Modal, Row, Space, Steps, Switch } from "antd"
import Title from "antd/es/typography/Title"
import { useState } from "react";
import { AddBasic } from "./Basic";
import { AddDependent } from "./Dependent";
import { AddAdditional } from "./Additional";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useOnboardUserMutation } from "../../redux/api/feature/onboarding/api";
import { useFetchClassroomIdQuery } from "../../redux/api/feature/classroom/api";
import dayjs from "dayjs";
import { FeesCalender } from "../FeesCalender";
import { TransactionHistory } from "../TransactionHistory";
import { Role } from "../../utils/Role";
import { useAppSelector } from "/src/store";
import { StudentConfirm } from "../confirmationModal/StudentConfirmation";
import { ExployeeConfirm } from "../confirmationModal/EmployeeConfirmation";

export const Onboarding = () => {
    let navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();
    const [confirmEnrollment, setConfirmEnrollment] = useState(false);
    const [confirmData, setConfirmData] = useState<any>();
    const [studentPaymentDetails, setStudentPaymentDetails] = useState<{ std: string, sessionId: number }>();
    const [onboardUser, { isSuccess, data: id }] = useOnboardUserMutation();
    const { data } = useFetchClassroomIdQuery(studentPaymentDetails, { skip: !studentPaymentDetails });

    const { state } = useLocation();

    if (isSuccess) {
        console.log(id);
        if (state?.type == 'employee') {
            navigate(`/employeeDetails/${id}`, { replace: true });
        }
        else if (state?.type == 'student') {

            navigate(`/payment/${id}/${data}`, { replace: true });
        }
    }


    const onNext = () => {

        form.validateFields().then(values => {
            setCurrentStep(currentStep + 1);
        });
    };

    const createUser = () => {
        if (state?.type == 'student') {
            const { std, session } = form.getFieldsValue(true);
            setStudentPaymentDetails({ std, sessionId: session });
        }
        onboardUser(confirmData);
    }

    const onSubmit = () => {
        form.validateFields().then(values => {
            const formValues = form.getFieldsValue(true);
            const interview = formValues['interview'] ? formValues['interview'][0] : null;
            const bank = formValues['bank'] ? formValues['bank'][0] : null;
            const credential = formValues['credential'] ? formValues['credential'][0] : null;
            if (interview != null) {
                var interviewDetails = {
                    ...interview,
                    doj: interview.doj?.format('YYYY-MM-DD'),
                    interviewDate: interview.interviewDate?.format('YYYY-MM-DD')
                }
            }
            const data = {
                ...formValues,
                dob: formValues['dob'].format('YYYY-MM-DD'),
                interview: interviewDetails,
                bank,
                credential
            };
            setConfirmData(data);
            setConfirmEnrollment(true);

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
            content: <AddAdditional form={form} />
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

                        {currentStep != 0 && <Button hidden={currentStep > 0} style={{ marginRight: '1vh' }} type="primary" onClick={() => { onPrev() }}>
                            Prev
                        </Button>}
                    </Col>
                    <Col span={currentStep != stepOptions.length - 1 ? 0 : 2} >
                        <div hidden={currentStep != stepOptions.length - 1}>
                            <Button type="primary" onClick={() => { onSubmit() }} htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </Col>

                    {currentStep != (stepOptions.length - 1) && <Col span={currentStep == stepOptions.length - 1 ? 0 : 2}  >

                        <Button type="primary" onClick={() => { onNext() }}>
                            Next
                        </Button>

                    </Col>}

                </Row>
            </Form>
        </div>
        <Modal
            title="Confirm Details"
            centered
            open={confirmEnrollment}
            width={1000}
            destroyOnClose
            okText={state?.type == 'employee' ? 'ONBOARD' : "ENROLL"}
            onOk={createUser}
            onCancel={() => setConfirmEnrollment(false)}
        >
            {state?.type == 'employee' &&
                <ExployeeConfirm employeeData={confirmData} />}

            {state?.type == 'student' &&
                <StudentConfirm studentData={confirmData} />
            }
        </Modal>
    </>)
}