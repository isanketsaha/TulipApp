import { IBank } from "./IBank";
import { IClassDetails } from "./IClassDetails";
import { IDependent } from "./IDependent";
import { IInterview } from "./Interview";

export interface IUserDetails {

    id: number,
    active: boolean,
    address: string,
    bloodGroup: string,
    dob: Date,
    admissionDate: Date,
    experience: string,
    gender: string,
    locked: boolean,
    name: string,
    sessionId: number,
    phoneNumber: string,
    qualification: string,
    religion: string,
    authority: string,
    previousSchool: string,
    whatsappAvailable: boolean,
    classDetails: IClassDetails[],
    dependent: IDependent[],
    bank: IBank,
    interview: IInterview,
    aadhaarCard: any,
    panCard: any,
    birthCertificate: any,
}