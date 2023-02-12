
export interface IAudit {
     id: number, 
     status:string,
     type:string,
     endpoint: string,
     dateTime: Date,
     description: string
}