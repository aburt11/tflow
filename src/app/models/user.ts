import { Reference } from "@firebase/database";

export interface Roles {
    user?:boolean;
    clubs?:boolean;
    scorer?:boolean;
    admin?:boolean;

}

export interface User {
    uid: string;
    email:string;
    roles: Roles;

}

export interface ProfileData{
    uid: string;
    profileName?:string;
    profileImageURL?:string;
    emailAddress?:string;
}
