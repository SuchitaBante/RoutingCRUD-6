export interface Iuser {
    userId: string;
    userName: string;
    userRole: string;
    profileDescription: string;
    profileImage: string;
    skills: string[];
    experienceYears: string;
    address: IAddress;
    isActive: boolean;
    isAddSame: boolean;
}
export interface IAddress {
    current: ICurrent;
    permanent: IPermanent;
}
export interface ICurrent {
    city: string;
    state: string;
    country: string;
    zipcode: string

}
export interface IPermanent {
    city: string;
    state: string;
    country: string;
    zipcode: string
}
export type TuserRole = | 'Admin' | 'Developer' | 'Tester' | 'Manager';







