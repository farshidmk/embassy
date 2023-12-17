import { TRoles } from "./role";

export interface IPaginationUser extends IUser {
  pageNo?: number;
  totalElements?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: string;
}

export interface ISelectedUser {
  mode: "edit" | "view" | "create";
  user?: IUser;
}

export interface ILoggedInUser {
  first_name: string;
  last_name: string;
  uid: string;
  email: string;
  username: string;
}

export interface IUser {
  uid: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: TRoles;
  gender: string;
  last_login: string;
  parent: string;
}