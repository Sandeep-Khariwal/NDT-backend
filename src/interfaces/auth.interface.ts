export interface UserModel {
    _id: string;
    email: string;
    name: string;
    password: string;
    admin:boolean;
    isDeleted:boolean;
    subDepartments:string[]
    departmentParts:string[]
}