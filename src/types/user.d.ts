import Gender from "./gender";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  startCreationTime: string;
  endCreationTime: string;
  personnelCode: string;
  nationalId: string;
  gender: Gender | undefined;
  branch: number | undefined;
  status: number | undefined;
  roles: number[] | undefined;
}

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
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: string;
  gender: string;
  last_login: string;
  parent: string;
}
