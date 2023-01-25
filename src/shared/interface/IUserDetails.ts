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
    phoneNumber: string,
    qualification: string,
    religion: string,
    authority: string,
    classDetails: IClassDetails,
    dependent: IDependent[],
    bank: IBank,
    interview: IInterview,
}