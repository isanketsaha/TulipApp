import { Role } from "../utils/Role"

export interface IBasicDetails {
  id: number
  name: string
  dob: Date
  phoneNumber: number
  gender: string
  active: boolean
  bloodGroup: string
  age: number
  address: string
  std: string
  pendingFees: number
  classId: number
  annualPaidFees: string[]
  classTeacher: string
  authority: Role
}
