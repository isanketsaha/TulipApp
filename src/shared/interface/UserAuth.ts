import { Role } from "../utils/Role";

export interface UserAuth {
    userName : string | null,
    userId: string | null,
    idToken: string | null,
    expiry: number,
    resetCredential: boolean
    authority: Role,
}