import { Role } from "/src/Role";

export interface UserAuth {
    userName : string | null,
    userId: string | null,
    idToken: string | null,
    expiry: number,
    authority: Role[],
}