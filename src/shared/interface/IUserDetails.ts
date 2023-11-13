import { UploadFile } from "antd"
import { IBank } from "./IBank"
import { IClassDetails } from "./IClassDetails"
import { IDependent } from "./IDependent"
import { ITransportCatalog } from "./ITransportCatalog"
import { IInterview } from "./Interview"

export interface IUserDetails {
  id: number
  active: boolean
  address: string
  bloodGroup: string
  dob: Date
  admissionDate: Date
  experience: string
  gender: string
  locked: boolean
  aadhaar: string
  name: string
  sessionId: number
  phoneNumber: string
  qualification: string
  religion: string
  authority: string
  profilePictureUrl: string
  profilePicture: any
  previousSchool: string
  eveningClass: boolean
  whatsappAvailable: boolean
  classDetails: IClassDetails[]
  dependent: IDependent[]
  bank: IBank
  interview: IInterview
  aadhaarCard: UploadFile[]
  panCard: UploadFile[]
  birthCertificate: UploadFile[]
  transports: ITransportCatalog
}
