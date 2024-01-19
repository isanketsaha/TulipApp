import { Button, Col, Form, Modal, Row, Steps, notification } from "antd"
import Title from "antd/es/typography/Title"
import dayjs from "dayjs"
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { IDependent } from "../../interface/IDependent"
import { IUserDetails } from "../../interface/IUserDetails"
import { useFetchClassroomIdQuery } from "../../redux/api/feature/classroom/api"
import { useOnboardUserMutation } from "../../redux/api/feature/onboarding/api"
import { useEditStudentDetailsMutation, useSearchStudentQuery } from "../../redux/api/feature/student/api"
import { UploadFiles } from "../UploadFiles"
import { ExployeeConfirm } from "../confirmationModal/EmployeeConfirmation"
import { StudentConfirm } from "../confirmationModal/StudentConfirmation"
import { AddAdditional } from "./Additional"
import { AddBasic } from "./Basic"
import { AddDependent } from "./Dependent"
import { useAppSelector } from "/src/store"

export const Onboarding = () => {
  let navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [form] = Form.useForm()
  const [confirmEnrollment, setConfirmEnrollment] = useState(false)
  const [confirmData, setConfirmData] = useState<any>()
  const [studentPaymentDetails, setStudentPaymentDetails] = useState<{ std: string; sessionId: number }>()
  const [onboardUser, { isSuccess, data: id }] = useOnboardUserMutation()
  const [editStudentDetails, { isSuccess: editSuccess }] = useEditStudentDetailsMutation()
  const { data } = useFetchClassroomIdQuery(studentPaymentDetails, { skip: !studentPaymentDetails })
  const { id: userId } = useParams()
  const { state, pathname } = useLocation()
  const { bloodGroupList } = useAppSelector((state) => state.commonData)

  const editFlow = pathname.split("/").includes("edit")

  const { data: studentData, isSuccess: loadedData } = useSearchStudentQuery(userId, {
    skip: !(editFlow && state?.type == "student"),
  })

  const [changedFields, setChangedFields] = useState<any>({ id: userId })

  const handleFormChange = (value: any, allValues: any) => {
    if (editFlow) {
      if (!value.dependent) {
        const updatedFormData = { ...changedFields, ...value }
        setChangedFields(updatedFormData)
      } else {
        const updatedFormData = {
          ...changedFields,
          dependent: changedFields.dependent
            ? changedFields.dependent.map((item: any, index: number) => {
                const maxIndex = value.dependent.length //updated element comes at its correct index. (max -1)
                if (item && item.id == allValues.dependent[maxIndex - 1].id) {
                  //if id same merge
                  return { ...item, ...value.dependent[maxIndex - 1] }
                } else {
                  //if not return the same obj.
                  return { ...item }
                }
              })
            : studentData?.dependent.map((item) =>
                item.id == allValues.dependent[value.dependent.length - 1].id
                  ? { id: item.id, ...value.dependent[value.dependent.length - 1] }
                  : { id: item.id }
              ),
          //create for each dependent and later update.
        }
        setChangedFields(updatedFormData)
      }
    }
  }

  if (editSuccess) {
    notification.success({
      message: "Updated Succesfully",
    })
    setTimeout(() => {
      navigate(`/studentDetails/${userId}`, { replace: true })
    }, 2000)
  }

  if (isSuccess) {
    if (state?.type == "employee") {
      navigate(`../employeeDetails/${id}`, { replace: true })
    } else if (state?.type == "student") {
      navigate(`../payment/${id}/${data}`, { replace: true })
    }
  }

  const formatStudentDetails = (user: IUserDetails | undefined) => {
    if (user) {
      return {
        name: user.name,
        profilePicture: user.profilePicture,
        id: user.id,
        contact: +user.phoneNumber,
        qualification: user.qualification,
        religion: user.religion,
        previousSchool: user.previousSchool,
        whatsappAvailable: user.whatsappAvailable,
        dob: dayjs(user.dob),
        address: user.address,
        bloodGroup: bloodGroupList.find((item) => item.label == user.bloodGroup)?.value,
        gender: user.gender,
        std: user.classDetails[0].std,
        session: user.classDetails[0].sessionId,
        panCard: user.panCard,
        aadhaar: user.aadhaar,
        birthCertificate: user.birthCertificate,
        aadhaarCard: user.aadhaarCard,
        dependent: user.dependent.map((item: IDependent) => {
          return {
            ...item,
            id: item.id,
            contact: +item.contact,
            aadhaar: item.aadhaarNo,
            aadhaarCard: item.aadhaarCard,
            relation: item.relationship,
          }
        }),
      }
    }
  }

  const onNext = () => {
    setCurrentStep(currentStep + 1)
    // form.validateFields().then((values) => {
    //   setCurrentStep(currentStep + 1)
    // })
  }

  const createUser = () => {
    if (state?.type == "student") {
      const { std, session } = form.getFieldsValue(true)
      setStudentPaymentDetails({ std, sessionId: session })
    }
    onboardUser(confirmData)
  }

  const editUser = () => {
    if (changedFields.dependent) {
      changedFields.dependent = changedFields.dependent.filter((obj: any) => Object.keys(obj).length > 1)
    }
    editStudentDetails(changedFields).then((res) => console.log("Edited"))
  }

  const onSubmit = () => {
    setTimeout(() => {
      form
        .validateFields()
        .then(() => {
          const formValues = form.getFieldsValue(true)
          const interview = formValues["interview"] ? formValues["interview"][0] : null
          const bank = formValues["bank"] ? formValues["bank"][0] : null
          const credential = formValues["credential"] ? formValues["credential"][0] : null
          if (interview != null) {
            var interviewDetails = {
              ...interview,
              doj: interview.doj?.format("YYYY-MM-DD"),
              interviewDate: interview.interviewDate?.format("YYYY-MM-DD"),
            }
          }
          const data = {
            ...formValues,
            dob: formValues["dob"].format("YYYY-MM-DD"),
            interview: interviewDetails,
            bank,
            credential,
          }
          setConfirmData(data)
          setConfirmEnrollment(true)
          console.log(data)
        })
        .catch(async (e) => {
          // validation failed, call some validation function
          if (e.errorFields) {
            // form has errorFields
            console.log(e)
          }
        })
    })
  }

  const onPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toUploadVM = (file: any[], documentType: string) => {
    return file?.map((item) => {
      return {
        uid: item.response,
        name: item.name,
        status: item.status,
        fileType: item.type,
        fileSize: item.size,
        documentType: documentType,
      }
    })
  }

  const stepOptions = [
    {
      title: "Basic Details",
      content: <AddBasic form={form} />,
    },
    {
      title: "Dependent Details",
      content: <AddDependent />,
    },
  ]

  if (state.type == "employee") {
    stepOptions.push({
      title: "Additional Details",
      content: <AddAdditional form={form} />,
    })
  }

  return (
    <>
      <Row style={{ margin: " 0 5vmin" }} justify={"space-between"} align={"middle"}>
        <Col>
          <Title level={3}>{state?.type == "student" ? "Student Admission" : "Onboarding Employee"}</Title>
        </Col>
        <Col>
          <Form form={form}>
            <UploadFiles listType={"picture-card"} showUploadList={false} name="profilePicture" />
          </Form>
        </Col>
      </Row>

      <div>
        <Steps type="navigation" size="default" current={currentStep} items={stepOptions} />

        {((editFlow && studentData) || !editFlow) && (
          <Form
            style={{ marginTop: "2vmin" }}
            form={form}
            wrapperCol={{ span: 15 }}
            labelCol={{ span: 9 }}
            layout="horizontal"
            labelAlign="left"
            size={"large"}
            onValuesChange={handleFormChange}
            autoComplete={"off"}
            scrollToFirstError
            initialValues={editFlow ? formatStudentDetails(studentData) : { type: state?.type }}
          >
            {stepOptions[currentStep].content}
            <Row>
              <Col span={2} offset={20}>
                {currentStep != 0 && (
                  <Button
                    hidden={currentStep > 0}
                    style={{ marginRight: "1vh" }}
                    type="primary"
                    onClick={() => {
                      onPrev()
                    }}
                  >
                    Prev
                  </Button>
                )}
              </Col>
              <Col span={currentStep != stepOptions.length - 1 ? 0 : 2}>
                <div hidden={currentStep != stepOptions.length - 1}>
                  <Button
                    type="primary"
                    disabled={editFlow && !(Object.keys(changedFields).length > 1)}
                    onClick={() => {
                      onSubmit()
                    }}
                    htmlType="submit"
                  >
                    {editFlow ? "Update" : "Enroll"}
                  </Button>
                </div>
              </Col>
              {currentStep != stepOptions.length - 1 && (
                <Col span={currentStep == stepOptions.length - 1 ? 0 : 2}>
                  <Button
                    type="primary"
                    onClick={() => {
                      onNext()
                    }}
                  >
                    Next
                  </Button>
                </Col>
              )}
            </Row>
          </Form>
        )}
      </div>
      <Modal
        title="Confirm Details"
        centered
        maskClosable={false}
        open={confirmEnrollment}
        width={1000}
        destroyOnClose
        okText={editFlow ? "UPDATE" : state?.type == "employee" ? "ONBOARD" : "ENROLL"}
        onOk={() => {
          setConfirmEnrollment(false)
          editFlow ? editUser() : createUser()
        }}
        onCancel={() => setConfirmEnrollment(false)}
      >
        {state?.type == "employee" && <ExployeeConfirm employeeData={confirmData} />}
        {state?.type == "student" && <StudentConfirm studentData={confirmData} editedData={changedFields} />}
      </Modal>
    </>
  )
}
