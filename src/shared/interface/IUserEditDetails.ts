import { Dayjs } from "dayjs";
import { IDependent } from "./IDependent";

export interface IUserEditDetails {
    name: string,
    contact: number,
    qualification?: string,
    religion: string,
    authority ?: string,
    previousSchool: string,
    whatsappAvailable: boolean,
    dob?: Dayjs,
    address: string,
    gender: string,
    bloodGroup: string,
    dependent: {id: number,
        contact: string,
        name: string,
        occupation: string,
        qualification: string,
        relation: string,
        whatsappAvailable : boolean,
        aadhaar: string}[],
    
}